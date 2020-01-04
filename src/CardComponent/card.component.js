import React, { Component } from 'react';

class Card extends Component {
    render() {
        return(        
        <div className="Card">
            <p>{this.props.name} paints Card Component</p>
        </div>
        );
    }
}

export default Card;