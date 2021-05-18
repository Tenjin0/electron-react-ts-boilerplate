const path = require('path')
const url = require('url')
const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const log = require("electron-log")
const pm2 = require('pm2');

let mainWindow = null

let pm2Connected = false

if (process.env.NODE_ENV === 'production') {
	const sourceMapSupport = require('source-map-support')
	sourceMapSupport.install()
}

const createWindow = async () => {

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
		pathname: path.join(__dirname, '..', 'renderer', 'assets', 'index.html'),
		protocol: 'file',
		slashes: true
	})

	mainWindow.loadURL(mainFile)


	ipcMain.on('ready', (event, who) => {
		// Do things

		mainWindow.webContents.openDevTools();
		console.log(mainWindow.webContents.devToolsWebContents)
	})

	mainWindow.webContents.on('ready-to-show', async () => {
		if (!mainWindow) {
			throw new Error('"mainWindow" is not defined')
		}
		mainWindow.show()
		console.log("ready to show")
	})

}
app.on('window-all-closed', () => {
	// Respect the OSX convention of having the application in memory even
	// after all windows have been closed
	if (process.env.NODE_ENV === "development" && pm2Connected) {
		pm2.delete('all')
	}
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
.then(() => {
	globalShortcut.register('Control+Shift+I', () => {
		// When the user presses Ctrl + Shift + I, this function will get called
		// You can modify this function to do other things, but if you just want
		// to disable the shortcut, you can just return false
		if (mainWindow && mainWindow.isVisible()) {
			mainWindow.webContents.openDevTools();
			console.log(mainWindow.webContents)
		}

		return true;
	});
})
.then(createWindow).catch(log.error)

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) createWindow()
})
