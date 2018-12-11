import React, { Component } from 'react';
import Player from './PlayerComponent/player.component';
import Card from './CardComponent/card.component';
import Ping from './PingComponent/ping.component';
import Bank from './BankComponent/bank.component';
import StartTimer from './TimerComponent/StartTimer';
import { subscribeToTimer } from './Service/timer';
import $ from 'jquery';
import './App.css';

const styles = {
  transition: 'all .5s ease-out'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      timestamp: 'no timestamp yet',
      ping: [],
      coin: 0,
      opacity: 0,
      translateY: 0,
      timer:""
    }

    subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));

    this.incrementCoin = this.incrementCoin.bind(this);
  }

  render() {
    return (
      <div className="App">
        This is the timer value: {this.state.timestamp}
        <Player players={this.state.players}/>
        <Card />
        <Ping ping={this.state.ping}/>
        <div style={{...styles, 
          opacity: this.state.opacity, 
          transform: 'translateY(' + this.state.translateY +'px)'}}className="animationDiv">
        <img src={require('./assets/images/Coin.gif')} alt="spinning coin"/> 
        </div>
        <Bank coin={this.state.coin} GiveCoins={this.incrementCoin}/>
        <StartTimer />
      </div>
    );
  }

  //lifecycle methods
  componentWillMount() {
    this.getPlayers();
  }
  componentDidMount() {
    this.sendPing();
  }

  //regular methods

  incrementCoin(){
    this.setState({
      coin: this.state.coin + 1,
      opacity: 1,
      translateY: -50});
    setTimeout(()=>{
      this.setState({opacity:0, translateY:0});
    }, 500);
  }

  getPlayers(){
      //var jsonArray = [];
      //jsonArray["title"]
      this.setState({players: [
          {
            name: "Tucker",
            hobby: "free-line skating"
          },
          {
            name: "Matthew",
            hobby: "gaming"
          }
        ]});
  }

  sendPing(){
    var i;
    var total = 0;
    for (i=0; i<4; i++) {

    var Url='http://localhost:4200/count/';
    var timeSent = new Date().getTime();
    Url += "?time=" + timeSent;

    $.ajax({
          //original code
      url: Url,
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: function(data){
        var timeSent;
        var timeReceived;
        var timeTransmitted;
        var timeReturned = new Date().getTime();

        this.setState({ping: data}, function(){
        console.log(this.state);
        //var sending = this.props.players.timeReceived - this.props.timeSent;

        });
        $(data).each(function(i, item){
          timeSent = item.original;
          timeReceived = item.received;
          timeTransmitted = item.transmitted;

          var sending = timeReceived - timeSent;
          var receiving = timeReturned - timeTransmitted;
          var roundTrip = sending + receiving;
          var oneWay = roundTrip/2;
          var difference = Math.abs(sending - oneWay);
          total += difference;

          console.log("Time Received: " + timeReceived + "\nTime Transmitted: " + timeTransmitted + "\nTotal: " + total + "\n\n");

          console.log("Sending: " + sending + "\nReceiving: " +
          receiving + "\nRoundtrip: " + roundTrip);

        })
     }.bind(this),
     async: false,
      error: function(xhr, status, err){
        console.log(err);
      }
    });

  }
  var avg = (total / 4);
  console.log(avg);
  }
}

export default App;
