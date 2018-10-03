import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Messagelist from './Messagelist.jsx';


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
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            username: "Bob",
            content: "Has anyone seen my marbles?",
            id: "123"
          },
          {
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
            id: "234"
          }
        ]
      }
    }
    this.Socket = new WebSocket("ws://localhost:3001");
    console.log(this.Socket.protocol);
    this.inputMessage = this.inputMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  // addMessage(content){
  //   const newMessage = {id: generateRandomId, username: this.state.data.currentUser, content: "Hello there!"};
  //   const messages = this.state.data.messages.concat(newMessage)
  // }

  componentDidMount() {
    this.Socket.onopen = (event) => {
      console.log("OPEN SOCKET")
    this.Socket.send("New Socket is connected!"); 
    };
  }

  inputMessage(e) {
    if (e.key === "Enter") {

      const newMessage = {id: generateRandomId(), username: this.state.data.currentUser.name, content: e.target.value};
      const messages = this.state.data.messages.concat(newMessage)
      this.setState({data: { currentUser: this.state.data.currentUser, messages: messages}})
      const socketObject = {type: "sendMessage",
                      content: e.target.value,
                      username: this.state.data.currentUser.name
    }
      this.Socket.send(JSON.stringify(socketObject)); 
      console.log(`SENT "${e.target.value}" TO SERVER!`)
    }
  }

  changeUser(e) {
    
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <Messagelist messages={this.state.data.messages}/>
        <ChatBar currentUser={this.state.data.currentUser} onKeyPress={this.inputMessage}/>
      </div>
    );
  }
}
export default App;
