const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// electron-store for data persistence
const Store = require('electron-store')
Store.initRenderer()


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.

  console.log(app.getPath('userData'))
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 450,
    frame: false,
    resizable: false,
    transparent: true,
    icon: path.join(__dirname, "images/icon.png"),

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });


  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'select-screen.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);


ipcMain.on('close-app', (evt, arg) => {
  app.quit();
});


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
