import React, { Component } from 'react';

class PlayerItem extends Component {

    render() {
        return(
            <li className="PlayerItem">
                {this.props.player.name} - {this.props.player.hobby}
            </li>
        );
    }
}

export default PlayerItem;