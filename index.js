const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

const SerialPort = require("serialport");
var sp = new SerialPort("COM5", {
    baudRate: 19200
});

sp.on("data", data =>{
    console.log(data.toString());
});

let win;

function createWindow () {
	win = new BrowserWindow({width: 1280, height: 720, fullscreen: true });
	win.setMenu(null);
	win.loadURL(url.format({
		pathname: path.join(__dirname, '/static/views/index.html'),
		protocol: 'file:',
		slashes: true
	}));

	// win.webContents.openDevTools();

	win.on('closed', ()=> {
		win = null
	});
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', ()=> {

});

app.on('activate', ()=> {
	if (win === null) {
		createWindow();
	}
});