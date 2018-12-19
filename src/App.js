import React, { Component } from 'react';
import Player from './PlayerComponent/player.component';
import Card from './CardComponent/card.component';
import Ping from './PingComponent/ping.component';
import Bank from './BankComponent/bank.component';
import StartTimer from './TimerComponent/StartTimer';
import { subscribeToTimer } from './Service/timer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: 'no timestamp yet',
      timer:""
    }

    subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));
  }

  render() {
    return (
      <div 
      className="App" 
      style={{
      textAlign:'center',
      backgroundColor: 'aliceblue'}}>
      <h1 style={{
        fontSize:100,
        color: 'purple'
      }}>2BAD</h1>
        This is the timer value: {this.state.timestamp}
        <Player />
        <Card />
        <Ping />
        <Bank />
        <StartTimer />
      </div>
    );
  }

}


export default App;

