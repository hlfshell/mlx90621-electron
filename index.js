const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

const SerialPort = require("serialport");
var sp = new SerialPort("COM5", {
	parser: SerialPort.parsers.readline('\n'),
    baudRate: 19200
});

sp.on("data", data =>{
    try{
		data = JSON.parse(data.toString());
	} catch(err){
		//do nothing
		return;
	}

	//OK, submit the data out to be displayed
	win.webContents.send("reading", data);

});

sp.on("open", data =>{
	console.log("SP IS OPEN");
});

let win;

function createWindow () {
	win = new BrowserWindow({width: 1280, height: 720 });
	win.setMenu(null);
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'draw.html'),
		protocol: 'file:',
		slashes: true
	}));

	win.webContents.openDevTools();

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