import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class Messagelist extends Component {
    render() {
      const message = this.props.messages.map((message) => {
          if (message.type === "incomingMessage"){
            return <Message singleMessage={message.content} key={message.id} username={message.username} type={message.type} color={message.color}/>
          }
          else if (message.type === "incomingNotification"){
            return <Notification singleNotification={message.content} key={message.id} />
          }
      });
      return (
          <main className="messages">
            {message}
          </main>
      )
   }
}

export default Messagelist;