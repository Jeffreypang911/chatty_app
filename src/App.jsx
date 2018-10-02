import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Messagelist from './Messagelist.jsx';


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
  }


  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.data.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({data: {messages: messages}})
    }, 1000);
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <Messagelist messages={this.state.data.messages}/>
        <ChatBar currentUser={this.state.data.name}/>
      </div>
    );
  }
}
export default App;
