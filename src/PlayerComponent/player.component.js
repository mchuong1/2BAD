import React, { Component } from 'react';
import PlayerItem from './player.item';

class Player extends Component {
    render() {
        let playerItems;
        if(this.props.players){
            playerItems = this.props.players.map(player => {
                return(
                    <PlayerItem 
                    key={player.name} 
                    player={player}/>
                );
            });
        }
        return(        
        <div className="Player">
            {playerItems}
        </div>
        );
    }
}

export default Player;