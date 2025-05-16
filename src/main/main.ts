/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import * as fs from 'fs';
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  Notification,
  dialog,
  globalShortcut,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    frame: false,
    show: false,
    width: 1300,
    height: 700,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.webContents.setZoomFactor(1.0);
  }); // Reset zoom level after page load

  mainWindow.loadURL(resolveHtmlPath('index.html'));
  // Window Minimize, Maximize and Close ipcReqs

  ipcMain.on('minimize', () => {
    mainWindow?.minimize();
  });
  ipcMain.on('maximize', () => {
    if (mainWindow?.isMaximized()) {
      mainWindow?.restore();
    } else {
      mainWindow?.maximize();
    }
  });
  ipcMain.on('close', () => {
    mainWindow?.close();
  });

  globalShortcut.register('Ctrl+-', () => {
    let currentZoom = mainWindow.webContents.getZoomLevel();
    mainWindow.webContents.setZoomLevel(currentZoom - 0.2); // Zoom out
  });

  globalShortcut.register('Ctrl+=', () => {
    let currentZoom = mainWindow.webContents.getZoomLevel();
    mainWindow.webContents.setZoomLevel(currentZoom + 0.2); // Zoom in
  });

  globalShortcut.register('Ctrl+0', () => {
    mainWindow.webContents.setZoomLevel(0); // Reset zoom
  });

  ipcMain.on('screenshot', (x, ...args) => {
    const randomNum = Math.round(Math.random() * 1000);
    const win = BrowserWindow.getFocusedWindow();
    win.webContents
      .capturePage({
        x: 189,
        y: 24,
        width: args[0][0].innerWidth,
        height: args[0][0].innerHeight,
      })
      .then((img) => {
        dialog
          .showSaveDialog({
            title: 'weexSchools - Screenshot',
            defaultPath: path.join(
              __dirname,
              `../assets/weexschools_${randomNum}.png`
            ),
            buttonLabel: 'Save',
            filters: [
              {
                name: 'Image Files',
                extensions: ['png', 'jpeg', 'jpg'],
              },
            ],
            properties: [],
          })
          .then((file) => {
            if (!file.canceled) {
              console.log(file.filePath.toString());
              fs.writeFile(
                file.filePath.toString(),
                img.toPNG(),
                'base64',
                function (err) {
                  if (err) throw err;
                  console.log('Saved!');
                }
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};
/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

ipcMain.on('deleteInstitution', () => {
  const NOTIFICATION_TITLE = 'Institution Deleted';
  const NOTIFICATION_BODY =
    "Unfortunately, all of your data were lost! If you've saved an cloudstorage, then you're safe :D";

  (function showNotification() {
    new Notification({
      title: NOTIFICATION_TITLE,
      body: NOTIFICATION_BODY,
    }).show();
  })();
});
