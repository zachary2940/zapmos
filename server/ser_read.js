var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});

var SerialPort = require('serialport')
var Readline = SerialPort.parsers.Readline

var serialPort = new SerialPort('/dev/ttyUSB0', {
  baudRate: 9600
})

var parser = new Readline()
serialPort.pipe(parser)
parser.on('data', function (data) {
  console.log('data received: ' + data)
})

serialPort.on('open', function () {
  console.log('Communication is on!')
})

