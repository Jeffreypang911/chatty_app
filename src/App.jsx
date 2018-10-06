import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Messagelist from './Messagelist.jsx';

var colorArray = [ {color: '#FE9393'}, {color: '#FFDDA3'}, {color: '#C0F5C6'}, {color: '#C0F2F5'}, {color: '#CDC0F5'}];
var randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: {
        currentUser: {name: "Anonymous"},
        messages: []
        },
      userCount: 0,
    }
    this.Socket = new WebSocket("ws://localhost:3001");
    this.inputMessage = this.inputMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }; 

  handleMessage = function (event) {
    let messageObj = JSON.parse(event.data);
    if(messageObj.type === "usercount") {
      this.setState((prevState) => {
        Object.assign(prevState, {userCount: messageObj.users})
      });
    };
    let type = messageObj.type
    let incomingMessage = {id: messageObj.id, username: messageObj.username, content: messageObj.content, type: type, color: messageObj.color};
    let messageConcat = this.state.data.messages.concat(incomingMessage);
    this.setState({data: { currentUser: this.state.data.currentUser, messages: messageConcat}})
  };

  componentDidMount() {
    this.Socket.onmessage = this.handleMessage
  };

  inputMessage(e) {
    if (e.key === "Enter") {
      const messageObject = {
        type: "postMessage",
        content: e.target.value,
        username: this.state.data.currentUser.name,
        color: randomColor
      };
      this.Socket.send(JSON.stringify(messageObject)); 
      console.log(`SENT "${e.target.value}" TO SERVER!`)
      e.target.value = ""
    };
  };

  changeUser(e){
    let newUser = e.target.value
    let notification = (`${this.state.data.currentUser.name} changed their name to ${newUser}`)
    if (e.key === "Enter") {
      const notificationObject = {
        type: "postNotification",
        content: notification,
      };
    this.Socket.send(JSON.stringify(notificationObject)); 
      this.setState((prevState) => {
        prevState.data.type = "postNotification"
        Object.assign(prevState.data.currentUser, {name: newUser})
      });
    };
  };

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <a className="usercounter">Users Online =  {this.state.userCount}</a>
        </nav>
        <Messagelist messages={this.state.data.messages} currentUser={this.state.data.currentUser}/>
        <ChatBar currentUser={this.state.data.currentUser} onKeyPress={this.inputMessage} onUsernameUpdate={this.changeUser}/>
      </div>
    );
  }
}
export default App;
