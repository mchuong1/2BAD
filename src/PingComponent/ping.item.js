import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PingItem extends Component {
  render() {
    return (
      <li className="PingItem">
      <strong>{this.props.ping.original}</strong>
      </li>
    );
  }
}

PingItem.propTypes = {
  project: PropTypes.object
}

export default PingItem;