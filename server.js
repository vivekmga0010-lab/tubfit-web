const path = require('path');

// Ensure frontend assets are built and copied into backend/dist before starting.
require(path.join(__dirname, 'scripts', 'prestart.js'));

// Start the actual backend server.
require(path.join(__dirname, 'backend', 'server.js'));
