import React, { Component } from 'react';
import TrumpImages from './TrumpImages';
import './TrumpIcon.css'
class TrumpIcon extends React.Component {
  constructor(props) {
    super(props);
    this.style = Object.assign(
      {},
      {
        maxWidth: "100%",
        height: "100%",
      },
      this.props.style
    );
  }
  render() {
    return (
          <div className={"trumpIcon " + this.props.className} >
            <img alt={"Trump " + this.props.which} key={this.props.which} src={TrumpImages[this.props.which]} style={this.style}></img>
          </div>
        )
  }
}
export default TrumpIcon;