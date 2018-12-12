import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

class StartTimer extends Component {
  constructor(){
    super();
    this.state = {
      newTimer:{}
    }
  }
  static defaultProps = {
    categories: ['10', '20', '30']
  }

  handleSubmit(e){

    var timeValue = this.refs.category.value * 1000;
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


  console.log("Category: " + this.refs.category.value + "\nDistance: " + distance +
  "\n" +this.state.timer);

  if (distance < 0) {
    this.input.removeAttribute("disabled");
    clearInterval(x);
    this.setState({timer: "EXPIRED"});
  }
}.bind(this), 1000);


    e.preventDefault();
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
    let categoryOptions = this.props.categories.map(category => {
      return <option key={category} value={category}>{category}</option>
    });
    return (
      <div>
        <h3>Start Timer</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Category</label><br />
            <select ref="category">
              {categoryOptions}
            </select>
            <br />
            {this.state.timer}
          </div>
          <br />
          <input type="submit" value="Submit" ref={input => {this.input = input}}/>
        </form>
      </div>
    );
  }
}

StartTimer.propTypes = {
  categories: PropTypes.array,
  addProject: PropTypes.func
}

export default StartTimer;
