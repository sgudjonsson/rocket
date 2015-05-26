/* global __dirname */

var BrowserWindow = require('browser-window'),
    Menu = require('menu'),
    Tray = require('tray');

var application = null,
    mainWindow = null,
    appIcon = null,
    isTerminating = false;

// Click event handler for "Exit"
function onContextMenuQuit() {
  isTerminating = true;
  application.quit();
}

// Click event handler for "Show/Hide window"
function onContextMenuToggleWindow() {
  if(mainWindow.isMinimized()) {
    mainWindow.restore();
  } else if(mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    mainWindow.show();
  }
}

// Handle the 'close' event for the main window
function onWindowClose(event) {
  if(isTerminating) {
    mainWindow = null;
  } else {
    event.preventDefault();
    mainWindow.hide();
  }
}

// Handle the 'minimize' event for the main window
function onWindowMinimize(event) {
  mainWindow.setSkipTaskbar(true);
}

// Creates and shows the main browser window
function createWindow() {
  
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, resizable: false, 'skip-taskbar': true});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Emitted before the window is closed.
  mainWindow.on('close', onWindowClose);
  mainWindow.on('minimize', onWindowMinimize);
}

// Creates and initializes the tray icon and it's context menu
function createTray() {
  
  appIcon = new Tray(__dirname + '\\rocket-icon.png');
  
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Show/Hide window', click: onContextMenuToggleWindow },
    { label: 'Quit', click: onContextMenuQuit }
  ]);
  
  appIcon.setToolTip('Local SiteManager');
  appIcon.setContextMenu(contextMenu);
  
  appIcon.on('clicked', onContextMenuToggleWindow);
}

// Initialize our main window
exports.init = function init(app) {
  application = app;
  
  createWindow();
  createTray();
};