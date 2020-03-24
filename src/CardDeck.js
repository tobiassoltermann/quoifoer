import React from 'react';
import Card from './Card';

import './CardDeck.css';

export default function CardDeck(props) {
    return (
      <div className="carddeck">
        {
          props.cards.map( (current) => {
            return <Card isBlocked={!current.playable} key={current.card} which={current.card}></Card>
          })
        }
      </div>
    )  
}