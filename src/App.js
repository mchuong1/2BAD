import React, { Component } from 'react';
import Player from './PlayerComponent/player.component';
import Card from './CardComponent/card.component';
import Ping from './PingComponent/ping.component';
import Bank from './BankComponent/bank.component';
import StartTimer from './TimerComponent/StartTimer';
import Chat from'./ChatComponenent/chat.component';
import { subscribeToTimer, connectionStatus } from './Service/socket';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: 'no timestamp yet',
      lobby: []
    }

    subscribeToTimer((err, timestamp) => 
    this.setState({
      timestamp
    }));

    connectionStatus((err, lobby) => this.setState({lobby}));
  }
  
 
 
  render() {
    return (
      <div 
      className="App" 
      >
      <h1 style={{
        fontSize:100,
        color: 'purple'
      }}>2BAD</h1>
      <div className="row">
      This is the timer value: {this.state.timestamp}
        <div className="col-sm">
          <Player />
          <Card name="Bob Ross"/>
        </div>
        <div className="col-sm">
          <Ping />
          <Bank />
          <StartTimer /></div>
        <div className="col-sm">
        <strong>People in Lobby:</strong>{this.state.lobby}
          <Chat /></div>
      </div>
      </div>
    );
  }

}


export default App;

