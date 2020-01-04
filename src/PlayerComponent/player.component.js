import React, { Component } from 'react';
import PlayerItem from './player.item';
import { connectionStatus } from '../Service/socket';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state= {
            players: []
        }

        connectionStatus((err, players) => this.setState({players}));
    }

    render() {
        
        return(        
        <div className="Player">
        <h3>Players</h3>
            {this.state.players}
        </div>
        );
    }

}

export default Player;
