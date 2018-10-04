import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Messagelist from './Messagelist.jsx';
const uuidv4 = require('uuid/v4');



//Joels Gangster Tail Recursion function
const generateRandomId = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter("", 10);
})("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");




class App extends Component {
  constructor(props) {
    super(props)
    this.state = { data: {
        currentUser: {name: "Bob"},
        messages: []
      }
    }
    this.Socket = new WebSocket("ws://localhost:3001");
    console.log(this.Socket.protocol);
    this.inputMessage = this.inputMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
    } 
  

  handleMessage = function (event) {
    let messageObj = JSON.parse(event.data);
    console.log("RECEIVING MESSAGE FROM CLIENT: ", messageObj.content, "USERNAME: ", messageObj.username );
    let incomingMessage = {id: messageObj.id, username: messageObj.username, content: messageObj.content};
    let messageConcat = this.state.data.messages.concat(incomingMessage);
    this.setState({data: { currentUser: this.state.data.currentUser, messages: messageConcat}})
  }

  componentDidMount() {
    this.Socket.onopen = (event) => {
      console.log("OPEN SOCKET");
    };
    this.Socket.onmessage = this.handleMessage
  }



  inputMessage(e) {
    if (e.key === "Enter") {
      const socketObject = {
        id: uuidv4(),
        type: "sendMessage",
        content: e.target.value,
        username: this.state.data.currentUser.name
      }
      this.Socket.send(JSON.stringify(socketObject)); 
      console.log(`SENT "${e.target.value}" TO SERVER!`)
      e.target.value = ""
    }
  }


  changeUser(e){
    let newUser = e.target.value
    if (e.key === "Enter") {
        this.setState((prevState) => {
          console.log(prevState)
          Object.assign(prevState.data.currentUser, {name: newUser}
      )});
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <Messagelist messages={this.state.data.messages}/>
        <ChatBar currentUser={this.state.data.currentUser} onKeyPress={this.inputMessage} onUsernameUpdate={this.changeUser}/>
      </div>
    );
  }
}
export default App;
