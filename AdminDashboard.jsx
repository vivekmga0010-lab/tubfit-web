import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    fetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch orders:', err);
        setLoading(false);
      });
  };

  const handleComplete = (orderId) => {
    fetch(`/api/admin/orders/${orderId}/complete`, { method: 'PATCH' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: 'completed' } : o));
        }
      })
      .catch(err => console.error('Error completing order:', err));
  };

  const parseDeliveryDate = (rawDate) => {
    if (!rawDate) return null;
    const text = String(rawDate).trim();
    const today = new Date();
    today.setHours(0,0,0,0);
    const lower = text.toLowerCase();
    if (lower.startsWith('today')) return today;
    if (lower.startsWith('tomorrow')) {
      const t = new Date(today);
      t.setDate(t.getDate() + 1);
      return t;
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
      parsed.setHours(0,0,0,0);
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
  };

  const formatDateKey = (d) => {
    if (!d) return '';
    return new Date(d).toISOString().split('T')[0];
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'completed' && order.status === 'completed') ||
      (statusFilter === 'pending' && order.status !== 'completed');

    const deliveryDateObj = parseDeliveryDate(order.deliveryDate || order.delivery_date || order.deliveryDateLabel);
    const deliveryKey = formatDateKey(deliveryDateObj);
    const matchesDate = !dateFilter || deliveryKey === dateFilter;

    const matchesSearch = 
      !searchQuery ||
      order.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone?.includes(searchQuery);

    return matchesStatus && matchesDate && matchesSearch;
  });

  if (loading) return <div className="p-10 text-center">Loading Orders...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
            <div className="mt-1 text-sm text-gray-500">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-gray-200">
            {/* Search Bar */}
            <div className="relative flex-1 min-w-[200px]">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              <input 
                type="text" 
                placeholder="Search name or phone..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 border-none rounded-xl text-xs font-bold pl-9 p-2 focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {['all', 'pending', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                    statusFilter === status 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Date Filter */}
            <input 
              type="date" 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-gray-100 border-none rounded-xl text-xs font-bold p-2 focus:ring-2 focus:ring-green-500"
            />
            <button onClick={fetchOrders} disabled={loading} className="bg-gray-100 hover:bg-gray-200 text-gray-700 w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors">
              <i className={`fas fa-sync-alt ${loading ? 'animate-spin' : ''}`}></i>
            </button>
            {dateFilter && (
              <button onClick={() => setDateFilter('')} className="text-gray-400 hover:text-red-500">
                <i className="fas fa-times-circle"></i>
              </button>
            )}
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Date/ID</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Customer</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Delivery Slot</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Items</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Status / Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order, idx) => (
                  <tr key={idx} className={`hover:bg-gray-50 transition-colors ${order.status === 'completed' ? 'bg-gray-50/50 opacity-75' : ''}`}>
                    <td className="p-4">
                      <div className="text-sm font-bold text-gray-900">{order.orderId}</div>
                      <div className="text-[10px] text-gray-400">{new Date(order.serverTimestamp).toLocaleString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-semibold text-gray-800">{order.name}</div>
                      <div className="text-xs text-gray-500">{order.phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs font-bold text-gray-700">{order.deliveryDate || 'N/A'}</div>
                      <div className="text-[10px] text-gray-500 mt-1">{order.timeSlot || 'N/A'}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs text-gray-600 whitespace-pre-wrap max-w-md line-clamp-3">
                        {order.items}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm font-black text-green-700">₹{order.totalPrice}</div>
                        {order.gymPromoCode && (
                          <div className="text-[10px] text-orange-500 font-bold">Code: {order.gymPromoCode}</div>
                        )}
                        {order.status === 'completed' ? (
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">Completed</span>
                        ) : (
                          <button 
                            onClick={() => handleComplete(order.orderId)}
                            className="bg-gray-900 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase hover:bg-black transition-colors"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;