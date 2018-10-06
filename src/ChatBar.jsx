import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input defaultValue={this.props.currentUser.name} className="chatbar-username" placeholder="Your Name (Optional)" onKeyPress={this.props.onUsernameUpdate}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.onKeyPress}/>
      </footer>
    );
  };
};
export default ChatBar;