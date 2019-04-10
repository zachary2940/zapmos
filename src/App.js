import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";


class App extends Component {
  constructor(props) {
    super(props);
    // var test="tiime"
    // console.log(fetch('/api').then(response => {test=response //this doesnt work because it is not updating
    //   console.log(response) 
    //   return response}))
    this.state = {
      name: '',
      greeting: '',
      num_mozzies_killed:'',
      time: '',
      endpoint: "localhost:3001",
      color: 'white'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.setTime = this.setTime.bind(this);
  }
  /**Bind documentation
   * var module = {
      x: 42,
      getX: function() {
        return this.x;
      }
    }

    var unboundGetX = module.getX;
    console.log(unboundGetX()); // The function gets invoked at the global scope
    // expected output: undefined

    var boundGetX = unboundGetX.bind(module);
    console.log(boundGetX());
    // expected output: 42
   */

  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('change color', this.state.color) // change 'red' to this.state.color
  }

  // adding the function
  setColor = (color) => {
    this.setState({ color })
  }

  componentDidMount = () => {
    const socket = socketIOClient(this.state.endpoint);
    setInterval(this.send(), 1000)
    socket.on('change color', (col) => {
        document.body.style.backgroundColor = col
    })
  }


  handleChange(event) { //a function that changes state
    this.setState({ name: event.target.value, greeting: "lol" });
  }

  handleSubmit(event) {
    event.preventDefault();//its default action which is to go to another page is not taken
    fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)//encode string into URI, fetch returns a Promise that resolves to the Response to that request
      .then(response => response.json()) //we can get string by taking it from the url but too slow so we use json, parse data using json
      .then(state => this.setState(state)); //state is the function called if the Promise is fulfilled. setState({time:lol})
  }
  /*fetch(url)
  .then(response.something) // Define response type (JSON, Headers, Status codes)
  .then(data) // get the response type 
  */
  // setTime(event) {
  //   event.preventDefault();
  //   fetch(`/`)
  //     .then(response => response.json()) 
  //     .then(state => this.setState(state)); 
  // }

  render() {
    const socket = socketIOClient(this.state.endpoint);
    socket.on('change color', (col) => {
      document.body.style.backgroundColor = col
    })
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={() => this.send() }>Change Color</button>
          <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
          <button id="red" onClick={() => this.setColor('red')}>Red</button>
          <p>{this.state.time}</p>
          <form onSubmit={this.handleSubmit}> {/*if the user clicks on the text within the <label> element, it toggles the control.*/}
            <label htmlFor="name">Enter your name: </label>  {/*htmlFor, for is to indicate it belongs to id name*/}
            <input
              id="name"
              type="text"
              value= {this.state.name} //what is displayed, it will not change if it is a static value
              onChange={this.handleChange} //input means on type, if this is gone, you cannot type and change
            />
            <button type="submit">Submit</button>
          </form>
          <p>{this.state.greeting}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div style={{ textAlign: "center" }}>


        </div>
      </div>
    );
  }
}

export default App;
