import React, {Component} from 'react';
import Message from './Message.jsx';

class Messagelist extends Component {
    render() {
        const message = this.props.messages.map((message) => {
           return <Message singleMessage={message.content} key={message.id} username={message.username}/>
        })
      return (
        <main className="messages">
          {message}
        </main>
      )
    }
  }
export default Messagelist;