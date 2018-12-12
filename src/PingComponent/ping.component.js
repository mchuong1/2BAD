import React, { Component } from 'react';
import PingItem from './ping.item';
import PropTypes from 'prop-types';
import $ from 'jquery';

class Ping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ping: []
        }
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
            </div>
        );
    }
    
    componentDidMount() {
        this.sendPing();
    }

    sendPing(){
        var i;
        var total = 0;
        for (i=0; i<4; i++) {
    
        var Url='http://10.1.10.114:4200/count/';
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

Ping.propTypes = {
    projects: PropTypes.array
  }

export default Ping;
