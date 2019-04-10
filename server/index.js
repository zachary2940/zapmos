const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3001

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!`, time : time}));
});

// This creates our socket using the instance of the server
send = () => {
  const socket = socketIOClient("localhost:3001");
  socket.emit('mosquito zapped', this.state.color) // change 'red' to this.state.color
}


// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected')
  //socket is a callback function that is defined here with a method on() that executes
  //on(event, callback), first parameter is a keyword
    // just like on the client side, we have a socket.on method that takes a callback function
    socket.on('change color', (color) => {
      // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
      // we make use of the socket.emit method again with the argument given to use from the callback function above
      console.log('Color Changed to: ', color)
      io.sockets.emit('change color', color)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})


server.listen(port, () => console.log(`Listening on port ${port}`))
//res is response

//Routing refers to how an application’s endpoints (URIs) respond to client requests. For an introduction to routing, see Basic routing.
/*
req.params contains route parameters (in the path portion of the URL), and req.query contains the URL query parameters (after the ? in the URL).*/ 

//sending data is not really functional yet
// app.post('/', (req,res)=>{

//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({time: 'hi'}));
// })

