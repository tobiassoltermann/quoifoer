import React from 'react';
import CardImages from './CardImages';
import './Card.css'
import PropTypes from 'prop-types';

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
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.props.onClick != undefined && this.props.isBlocked === false) {
      this.props.onClick(this.props.which);
    }
  }


  render() {
    const { which, rotate, className, isBlocked, isWinner} = this.props;
    var winnerClassname = "";
    if (isWinner != null ) {
      if (isWinner === true) {
        winnerClassname = " winningCard";
      }
      if (isWinner === false) {
        winnerClassname = " losingCard";
      }
    }
    /*eslint no-unreachable: "off"*/
  
    switch (rotate) {
      case 90:
      case 270:
        return (
          <div className={"cardRot" + winnerClassname} >
            <img alt={"Card " + which} key={which} src={CardImages[which]} style={this.style}></img>
          </div>
        )
        break;
      case null:
      case undefined:
      case 0:
      case 180:
      default:
        return (
          <div className={"card " + className + winnerClassname} style={{ transform: 'rotate(' + rotate + 'deg)' }}>
            <img onClick={this.onClick} className={ isBlocked ? "blockedCard" : "playableCard"} alt={"Card " + which} key={which} src={CardImages[which]} style={this.style}></img>
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