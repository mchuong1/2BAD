import React, { Component } from 'react';

class Bank extends Component {
    
    GiveCoins(){
        this.props.GiveCoins();
    }

    render() {
        return(        
        <div className="Bank">
            <h3>Bank</h3>
            <button onClick={this.GiveCoins.bind(this)}>Give me coins Biiiiich!</button>
            <p>Coins: {this.props.coin}</p>
        </div>
        );
    }
}

export default Bank;