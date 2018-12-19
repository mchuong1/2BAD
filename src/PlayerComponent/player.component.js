import React, { Component } from 'react';
import PlayerItem from './player.item';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state= {
            players: []
        }
    }

    render() {
        let playerItems;
        if(this.state.players){
            playerItems = this.state.players.map(player => {
                return(
                    <PlayerItem 
                    key={player.name} 
                    player={player}/>
                );
            });
        }
        return(        
        <div className="Player">
        <h3>Players</h3>
            {playerItems}
        </div>
        );
    }

    componentWillMount() {
        this.getPlayers();
    }

    getPlayers(){
        this.setState({players: [
            {
              name: "Tucker",
              hobby: "Free-Line Skating"
            },
            {
              name: "Matthew",
              hobby: "Gaming"
            },
            {
                name: "Rolando",
                hobby: "Dead by Daylight"
            },
            {
                name: "Amstrong",
                hobby: "Workout/Party"
            }
          ]});
    }
}

export default Player;
