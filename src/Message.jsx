import React, {Component} from 'react';

class Message extends Component {
    render() {
      return (
        <div>
            {/* {
               <div>{this.props.singleMessage}</div>
            } */}
            <div className="message">
                <span className="message-username">{this.props.username}</span>
                <span className="message-content">{this.props.singleMessage}</span>
            </div>
        </div>
      )
    }
  }
export default Message;