const fs = require('fs');

// Read fixed file
const fixedContent = fs.readFileSync('./AdminDashboard_fixed.jsx', 'utf-8');

// Write to corrupted file
fs.writeFileSync('./AdminDashboard.jsx', fixedContent, 'utf-8');

console.log('✓ File replacement completed successfully!');
console.log('Replaced AdminDashboard.jsx with AdminDashboard_fixed.jsx');

// Verify
const replaced = fs.readFileSync('./AdminDashboard.jsx', 'utf-8');
const fixed = fs.readFileSync('./AdminDashboard_fixed.jsx', 'utf-8');
console.log(`Files match: ${replaced === fixed}`);
