const path = require('path')
const url = require('url')
const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const log = require("electron-log")
const pm2 = require('pm2');

let mainWindow = null

let pm2Connected = false

if (process.env.NODE_ENV === 'production') {
	const sourceMapSupport = require('source-map-support')
	sourceMapSupport.install()
}

const createWindow = async () => {

	console.log(app.isPackaged, process.resourcesPath)
	//  const RESOURCES_PATH = app.isPackaged
	//    ? path.join(process.resourcesPath, 'assets')
	//    : path.join(__dirname, '../assets')

	//  const getAssetPath = (paths) => {
	//    return path.join(RESOURCES_PATH, ...paths)
	//  }

	mainWindow = new BrowserWindow({
		show: false,
		width: 1024,
		height: 728,
		//  icon: getAssetPath('icon.png'),
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			preload: path.join(__dirname, '..', 'renderer', 'helpers', 'preload.js'),
		},
	})

	const mainFile = url.format({
		pathname: path.join(__dirname, '..', 'renderer', 'index.html'),
		protocol: 'file',
		slashes: true
	})

	mainWindow.loadURL(mainFile)
	mainWindow.webContents.openDevTools();
	ipcMain.on('ready', (event, who) => {
		console.log('ready', who)
		mainWindow.webContents.send("get_conf", conf)
		mainWindow.show()

	})

	mainWindow.webContents.on('ready-to-show', async () => {
		if (!mainWindow) {
			throw new Error('"mainWindow" is not defined')
		}

		if (mainWindow) {
			mainWindow.show()
		}

	})
	process.on('SIGINT', function() {


		mainWindow = null
 	});


	mainWindow.on('closed', () => {

		if (process.env.NODE_ENV === "development" && pm2Connected) {
			pm2.delete('all')
		}
	})
}

app.on('window-all-closed', () => {
	// Respect the OSX convention of having the application in memory even
	// after all windows have been closed
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.whenReady()
.then(() => {
	return new Promise((resolve, reject) => {
		if (process.env.NODE_ENV === "development") {
			pm2.connect(true, (err) => {
				if (err) {
					return reject(err)
				}
				pm2Connected = true
				resolve()
			})
		}
		else {
			resolve()
		}
	})

})
.then(createWindow).catch(log.error)

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) createWindow()
})
