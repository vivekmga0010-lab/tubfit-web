const express = require('express');
const path = require('path');
const fs = require('fs');

// Polyfill fetch for Node versions that don't provide global `fetch`.
// This avoids adding dependencies and works for simple GET/POST usage in this app.
if (typeof fetch === 'undefined') {
  const http = require('http');
  const https = require('https');
  global.fetch = (url, opts = {}) => new Promise((resolve, reject) => {
    try {
      const u = new URL(url);
      const lib = u.protocol === 'https:' ? https : http;
      const method = (opts.method || 'GET').toUpperCase();
      const headers = opts.headers || {};
      const body = opts.body;

      const req = lib.request(u, { method, headers }, (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const text = Buffer.concat(chunks).toString('utf8');
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            text: async () => text,
            json: async () => JSON.parse(text)
          });
        });
      });

      req.on('error', reject);
      if (body) {
        if (typeof body === 'string' || Buffer.isBuffer(body)) {
          req.write(body);
        } else {
          req.write(JSON.stringify(body));
        }
      }
      req.end();
    } catch (err) {
      reject(err);
    }
  });
}

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

function formatOrderDatePart(date = new Date()) {
  return `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getFullYear()).slice(-2)}`;
}

function parseDeliveryDate(rawDate) {
  if (!rawDate) return null;
  const text = String(rawDate).trim();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lower = text.toLowerCase();

  if (lower.startsWith('today')) return today;
  if (lower.startsWith('tomorrow')) {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  const bracketMatch = text.match(/\(([^)]+)\)/);
  const candidate = bracketMatch ? bracketMatch[1] : text;
  const normalized = candidate.replace(/,/g, ' ').replace(/\s+/g, ' ').trim();

  const parseExplicitDayMonthYear = (value) => {
    const match = value.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/);
    if (!match) return null;
    const parsed = new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  };

  const parseMonthName = (value) => {
    const match = value.match(/^(?:[A-Za-z]{3,9}\s+)?(\d{1,2})\s+([A-Za-z]{3,9})(?:\s+(\d{4}))?$/);
    if (!match) return null;
    const day = Number(match[1]);
    const monthText = match[2];
    const year = match[3] ? Number(match[3]) : today.getFullYear();
    const month = new Date(`${monthText} 1, ${year}`).getMonth();
    if (Number.isNaN(month)) return null;
    const parsed = new Date(year, month, day);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  };

  const parseLooseDate = (value) => {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    parsed.setHours(0, 0, 0, 0);
    return parsed;
  };

  let parsed = parseExplicitDayMonthYear(normalized);
  if (parsed) return parsed;

  parsed = parseMonthName(normalized);
  if (parsed) return parsed;

  parsed = parseLooseDate(normalized);
  if (parsed && /\d{4}/.test(normalized)) return parsed;

  parsed = parseMonthName(`${normalized} ${today.getFullYear()}`);
  if (parsed) return parsed;

  return null;
}

function formatDeliveryValue(rawDate) {
  const date = parseDeliveryDate(rawDate);
  if (!date) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function normalizeDeliveryDate(rawDate, fallbackDateLabel) {
  const preferredDate = rawDate || fallbackDateLabel;
  if (!preferredDate) return '';

  const normalized = formatDeliveryValue(preferredDate);
  if (!normalized) return String(preferredDate);

  const parsed = parseDeliveryDate(preferredDate);
  if (parsed) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentYear = today.getFullYear();
    if (parsed.getFullYear() < currentYear - 2 || parsed.getFullYear() > currentYear + 2) {
      if (fallbackDateLabel && fallbackDateLabel !== rawDate) {
        const fallback = formatDeliveryValue(fallbackDateLabel);
        if (fallback) return fallback;
      }
    }
  }

  return normalized;
}

function formatSlotPart(slot) {
  const slotText = String(slot || '').toUpperCase();
  const match = slotText.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM|A|P)?/);
  if (!match) return 'ASAP';
  let hour = parseInt(match[1], 10);
  const minutes = match[2] || '00';
  const meridiem = match[3] || (hour >= 12 ? 'P' : 'A');
  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;
  return `${hour}${minutes}${meridiem.charAt(0)}`;
}

function getNextDailySequence(existingIds = []) {
  const todayPart = formatOrderDatePart();
  let maxSequence = 9700;
  const regex = new RegExp(`^TUB-${todayPart}-[^-]+-(\\d+)$`);

  existingIds.forEach((id) => {
    const match = String(id).match(regex);
    if (match) {
      const seq = Number(match[1]);
      if (!Number.isNaN(seq) && seq > maxSequence) {
        maxSequence = seq;
      }
    }
  });

  return String(maxSequence + 1).padStart(4, '0');
}

function generateOrderId(slot, existingIds = []) {
  const prefix = `TUB-${formatOrderDatePart()}-${formatSlotPart(slot)}-`;
  const nextSequence = getNextDailySequence(existingIds);
  return `${prefix}${nextSequence}`;
}

// Ensure uploads directory exists in public
const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(express.json());

// Basic Logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.warn('⚠️ Warning: "dist" directory not found. Please run "npm run build" to generate frontend assets.');
}

app.use(express.static(distPath));

// Serve public folder as fallback for assets like logo.png or favicon.ico
app.use(express.static(path.join(__dirname, 'public'), { index: false, maxAge: '1d' }));
app.use('/uploads', express.static(uploadDir, { maxAge: '7d' }));

// API Routes
app.get('/api/hello', (req, res) => {
  console.log('API called: /api/hello');
  res.json({ message: 'Hello from TUB Delhi!' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

app.post('/api/orders', async (req, res) => {
  try {
    // Save order locally to orders.json
    const ordersPath = path.join(__dirname, 'orders.json');
    let orders = [];
    try {
      if (fs.existsSync(ordersPath)) {
        const fileContent = fs.readFileSync(ordersPath, 'utf8');
        orders = fileContent ? JSON.parse(fileContent) : [];
      }
    } catch (parseError) {
      console.error('Error parsing orders.json, starting fresh:', parseError);
      orders = [];
    }

    const existingIds = orders.map(order => order.orderId).filter(Boolean);
    const orderId = generateOrderId(req.body.timeSlot, existingIds);

    const formattedDeliveryDate = normalizeDeliveryDate(req.body.deliveryDate, req.body.deliveryDateLabel);
    const orderData = {
      ...req.body,
      deliveryDate: formattedDeliveryDate || String(req.body.deliveryDate || req.body.deliveryDateLabel || ''),
      deliveryDateLabel: req.body.deliveryDateLabel || req.body.deliveryDate,
      orderId,
      serverTimestamp: new Date().toISOString()
    };

    orders.push(orderData);
    fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));

    res.status(200).json({ success: true, orderId });
  } catch (error) {
    console.error('Order logging failed:', error);
    res.status(500).json({ error: 'Failed to log order' });
  }
});

// Fetch all stored orders for the Admin Dashboard
app.get('/api/admin/orders', (req, res) => {
  const ordersPath = path.join(__dirname, 'orders.json');
  try {
    if (fs.existsSync(ordersPath)) {
      const fileContent = fs.readFileSync(ordersPath, 'utf8');
      const orders = fileContent ? JSON.parse(fileContent) : [];
      return res.json(orders);
    }
    res.json([]);
  } catch (err) {
    console.error('Failed to read orders:', err);
    res.status(500).json({ error: 'Internal server error reading database' });
  }
});

function escapeCsvValue(value) {
  if (value === undefined || value === null) return '';
  const text = String(value).replace(/"/g, '""');
  return text.includes(',') || text.includes('"') || text.includes('\n') ? `"${text}"` : text;
}

app.get('/api/admin/orders/export', (req, res) => {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'startDate and endDate are required' });
  }

  // Parse start/end as local dates (avoid timezone mis-compare of UTC ISO parsing)
  const [sY, sM, sD] = String(startDate).split('-').map(n => Number(n));
  const [eY, eM, eD] = String(endDate).split('-').map(n => Number(n));
  const start = new Date(sY, (sM || 1) - 1, sD || 1);
  const end = new Date(eY, (eM || 1) - 1, eD || 1);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
  }
  end.setHours(23, 59, 59, 999);

  const ordersPath = path.join(__dirname, 'orders.json');
  try {
    const fileContent = fs.existsSync(ordersPath) ? fs.readFileSync(ordersPath, 'utf8') : '[]';
    const orders = fileContent ? JSON.parse(fileContent) : [];
    const filtered = orders.filter(order => {
      const labelDate = order.deliveryDateLabel || order.orderDateLabel || '';
      let orderDate = parseDeliveryDate(order.deliveryDate);
      if (orderDate) {
        const startYear = start.getFullYear();
        if (orderDate.getFullYear() < startYear - 2 && labelDate) {
          const fallback = parseDeliveryDate(labelDate);
          if (fallback) orderDate = fallback;
        }
      }
      if (!orderDate) {
        const text = String(order.deliveryDate || '');
        const m = text.match(/(\d{1,2})\D{0,3}([A-Za-z]{3,})/);
        if (m) {
          const day = Number(m[1]);
          const month = new Date(`${m[2]} 1, ${start.getFullYear()}`).getMonth();
          if (!Number.isNaN(month)) {
            orderDate = new Date(start.getFullYear(), month, day);
            orderDate.setHours(0,0,0,0);
          }
        }
      }
      return orderDate && orderDate >= start && orderDate <= end;
    });

    const rows = [
      [
        'Order ID', 'Name', 'Phone', 'Delivery Type', 'Address', 'Items',
        'Total Price', 'Delivery Date', 'Time Slot', 'Gym Promo Code', 'Status', 'Server Timestamp'
      ],
      ...filtered.map(order => {
        // sanitize items: remove common currency tokens and any leftover empty parentheses
        const rawItems = order.items || '';
        const cleanedItems = String(rawItems)
          .replace(/[₹â‚¹]\s?\d+(?:\.\d+)?/g, '')
          .replace(/\(\s*\)/g, '')
          .replace(/\s+-\s+$/,'')
          .trim();
        const formattedDeliveryDate = formatDeliveryValue(order.deliveryDate || order.deliveryDateLabel || order.deliveryDate);
        return [
          order.orderId,
          order.name || order.customerName,
          order.phone,
          order.deliveryType,
          order.address,
          cleanedItems,
          order.totalPrice,
          formattedDeliveryDate || order.deliveryDate,
          order.timeSlot,
          order.gymPromoCode,
          order.status || '',
          order.serverTimestamp
        ];
      })
    ];

    const csv = rows.map(row => row.map(escapeCsvValue).join(',')).join('\r\n');
    res.setHeader('Content-Type', 'application/vnd.ms-excel');
    res.setHeader('Content-Disposition', `attachment; filename="orders-${startDate}-to-${endDate}.csv"`);
    res.send(csv);
  } catch (err) {
    console.error('Failed to export orders:', err);
    res.status(500).json({ error: 'Failed to export orders' });
  }
});

// Update order status (Mark as Completed)
app.patch('/api/admin/orders/:orderId/complete', (req, res) => {
  const { orderId } = req.params;
  const ordersPath = path.join(__dirname, 'orders.json');

  try {
    if (fs.existsSync(ordersPath)) {
      let orders = JSON.parse(fs.readFileSync(ordersPath, 'utf8') || '[]');
      const orderIndex = orders.findIndex(o => o.orderId === orderId);
      if (orderIndex !== -1) {
        orders[orderIndex].status = 'completed';
        fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));
        return res.json({ success: true });
      }
    }
  } catch (err) {
    console.error('Error updating order:', err);
    return res.status(500).json({ error: 'Failed to update order' });
  }
  res.status(404).json({ error: 'Order not found' });
});

// Admin dashboard is the restored standalone admin page.
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Catch-all to serve index.html for SPA routing
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  } else {
    res.status(404).send('Frontend assets not found. Run "npm run build" then restart the server.');
  }
});

// Error handling middleware (must be after all routes)
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
  console.log('📁 App served from: ./dist');
  console.log('📁 Uploads served from: ./public/uploads');
  console.log('Press Ctrl+C to stop the server');
});
