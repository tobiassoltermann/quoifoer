import React, { Component } from 'react';
import CardImages from './CardImages';
import './Card.css'
import PropTypes from 'prop-types';

class Card extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.style = Object.assign(
      {},
      {
        maxWidth: "100%",
        height: "100%",
      },
      (() => {
        return this.props.isBlocked ?
          {
            opacity: 0.4
          }:
          {
            opacity: 1,
            marginBottom: '50%'
          }
      }).bind(this)(),
      this.props.style
    );
  }
  render() {
    switch (this.props.rotate) {
      case null:
      case undefined:
      case 0:
      case 180:
        return (
          <div className={"card " + this.props.className} style={{transform: 'rotate(' + this.props.rotate + 'deg)'}}>
            <img alt={"Card " + this.props.which} key={this.props.which} src={CardImages[this.props.which]} style={this.style}></img>
          </div>
        )
      break;
      case 90:
      case 270:
        return (
          <div className="cardRot" >
            <img alt={"Card " + this.props.which} key={this.props.which} src={CardImages[this.props.which]} style={this.style}></img>
          </div>
        )
      break;
    }
  }
}

Card.propTypes = {
  which: PropTypes.string,
  rotate: PropTypes.number,
  isPlayable: PropTypes.bool,  
}
export default Card;