import React, { Component } from 'react';
import PingItem from './ping.item';
import PropTypes from 'prop-types';
import StartTimer from '../TimerComponent/StartTimer';
import $ from 'jquery';

class Ping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ping: [],
            id: null
        }
        this.startTimer = React.createRef();
      }
    render() {
        let PingItems;
        if(this.state.ping){
            PingItems = this.state.ping.map(ping => {
                return(
                    <PingItem key={ping.original} ping={ping} />

                );
            });
        }
        return(
            <div className="Ping">
            <h3>Ping</h3>
            {PingItems}
            <h3>Play "Timer" Game</h3>
              <div>
                <br />
                <StartTimer ref={this.startTimer}/>
              </div>
              <br />
              <button type="submit" onClick={this.sendPing.bind(this)}>Ready Up</button>

            </div>
        );
    }

    componentDidMount() {
        this.sendPing();
    }

    sendPing(){
        var i;
        var total = 0;
        var difference;
        var oneWay;
        for (i=0; i<4; i++) {

        var timeSent = new Date().getTime();
        var Url='http://localhost:4200/count/';

        Url += "?time=" + timeSent;

        $.ajax({
          //original code
          url: Url,
          dataType: 'json',
          type: 'GET',
          cache: false,
          success: function(data){
            var timeReturned = new Date().getTime();
            var timeSent;
            var timeReceived;
            var timeTransmitted;

            this.setState({ping: data}, function(){
            console.log(this.state);
            //var sending = this.props.players.timeReceived - this.props.timeSent;

            });
            $(data).each(function(i, item){
              timeSent = item.original;
              timeReceived = item.received;
              timeTransmitted = item.transmitted;
              this.setState({id : item.id});
              var sending = timeReceived - timeSent;
              var receiving = timeReturned - timeTransmitted;
              var roundTrip = sending + receiving;
              oneWay = Math.abs(roundTrip/2);
              difference = sending - oneWay;
              total += oneWay;

              console.log("Time Received: " + timeReceived + "\nTime Transmitted: " + timeTransmitted + "\nTotal: " + total + "\nID:" + this.state.id + "\n\n");

              console.log("Sending: " + sending + "\nReceiving: " +
              receiving + "\nRoundtrip: " + roundTrip);

            }.bind(this))
         }.bind(this),
         async: false,
          error: function(xhr, status, err){
            console.log(err);
          }
        });

      }
      var avg = (total / 4);
      console.log(avg);
      this.sendPingResults(avg, this.state.id, difference, oneWay);
      }

      sendPingResults(avg, id, difference, oneWay) {

        //POST METHOD
        var Url='http://localhost:4200/submitping/';
        const data= {diff : avg ,
                     id : id };

        console.log("HEERE")
        $.ajax({
            //original code
        url: Url,
        dataType: 'json',
        data: data,
        type: 'POST',
        cache: false,
        success: function(data){
          console.log("gameReady = " + data.gameReady + "\ndate = " + data.date);
          if (data.gameReady === false) {
            this.queued(oneWay, difference);
          } else {
            this.startTimer.current.scheduleTimer(data.date);   // instead of simply responding with a date to start, the server should respond with
                                              //    a new page that hold all game components
            var serverTime = new Date() - oneWay + difference;
            var serverDate = new Date(serverTime);
            console.log(serverDate);
          }

        }.bind(this),
        error: function(xhr, status, err){
          console.log(err);
        }//end error
        });//end $
      }

      queued(oneWay, difference) {

        console.log('queued');

        var gameReady = false;
        while (gameReady === false) {

          // CALL TO SEE IF OTHER PLAYERS ARE gameReady
          //POST METHOD


          var Url='http://localhost:4200/lobby/';      // HTTP REQUEST NEEDS TO BE MODIFIED
          Url += "?time=" + this.state.id;
          var result;
          console.log("HEERE")
          $.ajax({
              //original code
          url: Url,
          dataType: 'json',
          type: 'GET',
          cache: false,
          success: function(data){
            gameReady = data.gameReady;
            result = data;
          }.bind(this),
          error: function(xhr, status, err){
            console.log(err);
          }//end error
          });//end $

        }

        this.startTimer.current.scheduleTimer(result.date);
        var serverTime = new Date() - oneWay + difference;
        var serverDate = new Date(serverTime);
        console.log(serverDate);

      }
    }


Ping.propTypes = {
    projects: PropTypes.array
  }

export default Ping;
