import React from 'react';
import Card from './Card';

export default function CardDeck(props) {
    return (
      <div className="carddeck">
        {
          props.cards.map( (current) => {
            return <Card key={current} which={current}></Card>
          })
        }
      </div>
    )  
}