import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StartTimer extends Component {

  constructor(){
    super();
    this.state = {
      newTimer:{}
    }
    this.startTimer = React.createRef();
  }

  scheduleTimer(time) {
    console.log("The time will start in " + time/1000 + " seconds");
    setTimeout(()=>{
      this.startTime();
    }, time);
  }

  startTime(){
    //time will be date?
    /*var timeValue = 10000;
    this.setTimes(timeValue);

    // Set the date we're counting down to
    var countDownDate = new Date().getTime() + (timeValue);
    console.log("Date: " + new Date().getTime() + "\nCountDown: " + countDownDate);


    console.log("Seconds " + new Date().getSeconds() + "Countdown to: " + (new Date().getSeconds() + 10 ))
    var x = setInterval(function() {

      var now = new Date().getTime();

      var distance = countDownDate - now;
      this.setTimes(distance);
      
      if (distance < 0) {
        clearInterval(x);
        this.setState({timer: "EXPIRED"});
      }
    }.bind(this), 1000); */
    
    this.setState({timer:10});
    var y = setInterval(function() {
      this.setState({timer: this.state.timer - 1});
      if (this.state.timer < 0) {
        clearInterval(y);
        this.setState({timer: "EXPIRED"});
      }  
    }.bind(this), 1000)
    //e.preventDefault();
  }
setTimes(distance) {
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.ceil(distance % (1000 * 60) / 1000);

    this.setState({timer: days + "d " + hours + "h "
    + minutes + "m " + seconds + "s "});
  }

  render() {

    return (
      <div>
      {this.state.timer}
      </div>
    );
  }
}

StartTimer.propTypes = {
  categories: PropTypes.array,
  addProject: PropTypes.func
}

export default StartTimer;
