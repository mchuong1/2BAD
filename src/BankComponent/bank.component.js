import React, { Component } from 'react';

const styles = {
    transition: 'all .5s ease-out'
  };

class Bank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coin: 0,
            opacity: 0,
            translateY: 0
        }
        this.GiveCoins = this.GiveCoins.bind(this);
    }
    GiveCoins(){
        this.setState({
            coin: this.state.coin + 1,
            opacity: 1,
            translateY: -50});
          setTimeout(()=>{
            this.setState({opacity:0, translateY:0});
          }, 500);
    }

    render() {
        return(        
        <div className="Bank">
            <h3>Bank</h3>
            <div style={{...styles, 
            opacity: this.state.opacity, 
            transform: 'translateY(' + this.state.translateY +'px)'}}
            className="animationDiv">
            <img src={require('../assets/images/Coin.gif')} alt="spinning coin"/> 
            </div>
            <button onClick={this.GiveCoins}>Give me coins Biiiiich!</button>
            <p>Coins: {this.state.coin}</p>
        </div>
        );
    }
}

export default Bank;
