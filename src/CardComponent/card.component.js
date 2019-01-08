import React, { Component } from 'react';

class Card extends Component {
    render() {
        return(        
        <div className="Card">
            <h1>{this.props.name} paints Card Component</h1>
        </div>
        );
    }
}

export default Card;