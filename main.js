var app = require('app');  // Module to control application life.

// Report crashes to our server.
require('crash-reporter').start();

// Everything for our main window
var rocket = require('./rocket-window');

app.on('ready', function() {
  rocket.init(app);
});
