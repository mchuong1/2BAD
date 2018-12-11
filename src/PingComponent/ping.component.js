import React, { Component } from 'react';
import PingItem from './ping.item';
import PropTypes from 'prop-types';

class Ping extends Component {
    render() {
        let PingItems;
        if(this.props.ping){
            PingItems = this.props.ping.map(ping => {      
                return(
                    <PingItem key={ping.original} ping={ping} />
                );
            });
        }
        return(
            <div className="Ping">
            {PingItems}
            </div>
        );
    }
}
Ping.propTypes = {
    projects: PropTypes.array
  }

export default Ping;