var express = require('express');

var app = express();


var path = require('path');
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render('/home/pi/Desktop/zapmos/public/index');
});

var server = app.listen(4000, () => { //Start the server, listening on port 4000.
    console.log("Listening to requests on port 4000...");
})

var io = require('socket.io')(server); //Bind socket.io to our express server.

const SerialPort = require('serialport'); 
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/ttyUSB0'); //Connect serial port to port COM3. Because my Arduino Board is connected on port COM3. See yours on Arduino IDE -> Tools -> Port
const parser = port.pipe(new Readline({delimiter: '\r\n'})); //Read the line only when new line comes.
parser.on('data', (zap) => { //Read data
    console.log(zap);
    var today = new Date();
    io.sockets.emit('zap', {date: today.getDate()+"-"+4+"-"+today.getFullYear(), time: (today.getHours())+":"+(today.getMinutes()), zap:zap}); //emit the datd i.e. {date, time, zap} to all the connected clients.
});

io.on('connection', (socket) => {
    console.log("Someone connected."); //show a log as a new client connects.
})