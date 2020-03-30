import React from 'react';
import Card from './Card';

import './CardDeck.css';

class CardDeck extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { cards } = this.props;
    if (cards != null) {
      return (
        <div className="carddeck">
          {
            cards.map( (current, i) => {
              return <Card isBlocked={!current.playable} key={i} which={current.card}></Card>
            })
          }
        </div>
      );
    } else {
      return (
        <div className="carddeck">
          
        </div>
      )
    }  
  }
}

export default CardDeck;