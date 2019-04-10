const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3001);
console.log('listening on port ', 3001);
// WARNING: app.listen(80) will NOT work here!

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!`, time : time}));
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
//res is response

//Routing refers to how an application’s endpoints (URIs) respond to client requests. For an introduction to routing, see Basic routing.
/*
req.params contains route parameters (in the path portion of the URL), and req.query contains the URL query parameters (after the ? in the URL).*/ 

//sending data is not really functional yet
// app.post('/', (req,res)=>{

//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({time: 'hi'}));
// })

