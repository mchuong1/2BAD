import React, {Component} from 'react';
import {messageToServer} from '../Service/socket';


class Chat extends Component {
    render(){
        return(
        <div id="chat">
            <div id="chatWindow">
                <blockquote id="output"></blockquote>
                <div id="feedback"></div>
            </div>
            <input id="name" type="text" placeholder="Name..."/>
            <input id="message" type="text" placeholder="Message..."/>
            <button id="send" onClick={this.SendMessage}>Send</button>
        </div>
        );
    }
    SendMessage(){
        var message = document.getElementById('message');
        var name = document.getElementById('name');
        messageToServer(name.value, message.value);
    }
    
}
export default Chat;