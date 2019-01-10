import React, { Component } from 'react';
import { coinCounter} from '../Service/socket';
const styles = {
    transition: 'all .5s ease-out',
    button: {
        padding: '20px',
        border: '50px'
    }
  };

class Bank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coin: 0,
            opacity: 0,
            translateY: 0,
        }
        this.GiveCoins = this.GiveCoins.bind(this);
    }

    render() {
        return(        
        <div className="Bank">
            <div style={{...styles, 
            opacity: this.state.opacity, 
            transform: 'translateY(' + this.state.translateY +'px)'}}
            className="animationDiv">
            <img 
            src={require('../assets/images/Coin.gif')} alt="spinning coin"
            /> 
            </div>
            <button
            className="CoinButton" 
            onClick={this.GiveCoins}
            style={{width: 100, 
                    height: 100, 
                    fontSize: 20,
                    backgroundColor: 'yellow',
                    color: 'black',
                    borderRadius: 50,
                    borderColor: 'orange' }}>Give me coins!</button>
            <p
            style={{
                fontSize: 25
            }}>Coins: {this.state.coin}</p>
            <div id="players">

            </div>
        </div>
        );
    }

    GiveCoins(){
        this.setState({
            coin: this.state.coin + 1,
            opacity: 1,
            translateY: -50});
          setTimeout(()=>{
            this.setState({opacity:0, translateY:0});
          }, 500);
          coinCounter(this.state.coin + 1);
    }


}

export default Bank;
