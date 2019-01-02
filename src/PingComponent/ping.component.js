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
            id: ""
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
              <button type="submit" onClick={this.sendPing.bind(this)} ref={btn => {this.btn = btn;}}
              style={{width: 100, 
                height: 100, 
                fontSize: 20,
                backgroundColor: 'green',
                color: 'white',
                borderRadius: 5,
                borderColor: 'black',
              marginBottom: 20 }}>Ready Up</button>

            </div>
        );
    }


    sendPing(){
        var i;
        var total = 0;
        var difference;
        var oneWay;
        var id;
        this.btn.setAttribute("disabled", "disabled");
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
            //var id;

            this.setState({ping: data}, function(){
            console.log(this.state);
            //var sending = this.props.players.timeReceived - this.props.timeSent;

            });
            $(data).each(function(i, item){
              timeSent = item.original;
              timeReceived = item.received;
              timeTransmitted = item.transmitted;
              //this.setState({id : item.id});
              id = item.id;
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
        this.setState({id: id}, function(){
          console.log(id);
          console.log("The ID: " + this.state.id);

          var avg = (total / 4);
          console.log(avg);
          this.sendPingResults(avg, difference, oneWay);
        //var sending = this.props.players.timeReceived - this.props.timeSent;

        });


      }

      sendPingResults(avg, difference, oneWay) {

        //POST METHOD
        var Url='http://localhost:4200/submitping/';
        const data= {diff : avg ,
                     id : this.state.id };

        console.log("HEERE")
        $.ajax({
            //original code
        url: Url,
        dataType: 'json',
        data: data,
        type: 'POST',
        cache: false,
        success: function(response){
          console.log("gameReady = " + response.gameReady + "\ndate = " + data.date);
          if (response.gameReady === false) {
            var checkin_time = response.checkin;
            this.queued(oneWay, difference, checkin_time);
          } else {
            this.startTimer.current.scheduleTimer(response.date);   // instead of simply responding with a date to start, the server should respond with
                                              //    a new page that hold all game components
            console.log('oneWay: ' + oneWay + '\ndiff: ' + difference);
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

      queued(oneWay, difference, checkin_time) {

        console.log('queued');
        var pause = true;
        var time;
        var gameReady = false;
        var now = new Date().getTime();
        var checkIn = (checkin_time - difference) - now - oneWay;
        console.log('(checkin_time: ' + checkin_time +
         ' - difference: ' + difference + '\nnow: ' + now + '\noneWay: ' + oneWay + ' = ' + checkIn);

        setTimeout(()=>{

            // CALL TO SEE IF OTHER PLAYERS ARE gameReady
            //POST METHOD
            var Url='http://localhost:4200/lobby/';      // HTTP REQUEST NEEDS TO BE MODIFIED
            Url += "?id=" + this.state.id;

            $.ajax({
                //original code
            url: Url,
            dataType: 'json',
            type: 'GET',
            cache: false,
            success: function(data){
              gameReady = data.gameReady;
              checkIn = data.checkin;
              console.log(gameReady);
              time = data.date;
              pause = false;

              if (gameReady === true) {
                this.startTimer.current.scheduleTimer(time);
                console.log('oneWay' + oneWay + '\ndiff' + difference);
                var serverTime = new Date() - oneWay + difference;
                var serverDate = new Date(serverTime);
                console.log(serverDate);
              } else {
                this.queued(oneWay, difference, checkIn);
              }
            }.bind(this),
            error: function(xhr, status, err){
              console.log(err);
            }//end error
            });//end $
        }, checkIn)
      }//end queue


    }




Ping.propTypes = {
    projects: PropTypes.array
  }

export default Ping;
