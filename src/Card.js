import React, { Component } from 'react';
import CardImages from './Images';
import './Card.css'

class Card extends React.Component {
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
export default Card;