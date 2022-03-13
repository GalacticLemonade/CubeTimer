const {app, BrowserWindow, ipcMain} = require("electron");
const Store = require('./dataStorage.js');
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const store = new Store({
    configName: 'user-data',
    defaults: {
        besttime: '30:00:00'
    }
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

