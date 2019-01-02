import React, {Component} from 'react';
import {messageToServer} from '../Service/timer';


class Chat extends Component {
    render(){
        return(
        <div id="chat">
            <div id="chatWindow">
                <div id="output"></div>
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