import React, { Component } from 'react';
import uuid from 'uuid';
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
    // at time given - call startTime()
    console.log('Scheduled at this time: ' + time);
  }

  startTime(){

    var timeValue = 10000;
    this.input.setAttribute("disabled", "disabled");
    this.setTimes(timeValue);

    // Set the date we're counting down to
    var countDownDate = new Date().getTime() + (timeValue);
    console.log("Date: " + new Date().getTime() + "\nCountDown: " + countDownDate);


    // Update the count down every 1 second
    var x = setInterval(function() {

      var now = new Date().getTime();

      var distance = countDownDate - now;
      this.setTimes(distance);


  console.log("\nDistance: " + distance +
  "\n" +this.state.timer);

  if (distance < 0) {
    this.input.removeAttribute("disabled");
    clearInterval(x);
    this.setState({timer: "EXPIRED"});
  }
}.bind(this), 1000);


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
