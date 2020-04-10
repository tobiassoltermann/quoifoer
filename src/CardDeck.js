import React from 'react';
import Card from './Card';
import {
  Button
} from 'rsuite';
import './CardDeck.css';

class CardDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      askUnlockAll: false,
    }
    this.handleUnlockAll = this.handleUnlockAll.bind(this);
    this.askUnlockAll = this.askUnlockAll.bind(this);
    this.requestPlayCard = this.requestPlayCard.bind(this);
  }
  handleUnlockAll() {
      this.props.handleUnlockAll();
  }
  askUnlockAll() {
      this.setState({
          unlockAllAsked: true
      }, () => {
          setTimeout(() => {
              this.setState({
                unlockAllAsked: false
              });
          }, 3000);
      });
  }

  requestPlayCard(cardName) {
    this.props.requestPlayCard(cardName, this.props.unlockAllCards);
  }

  render() {
    var { cards, unlockAllCards } = this.props;
    if (cards != null) {
      return (
        <div className="carddeck">
          {
            cards.map( (current, i) => {
              console.log("CardDeck:map", current.card, current.playable);
              return unlockAllCards == true
                ? <Card onClick={this.requestPlayCard} isBlocked={false} key={i} which={current.card}></Card>
                : <Card onClick={this.requestPlayCard} isBlocked={!current.playable} key={i} which={current.card}></Card>

            })
          }
          {
              (() => {
                if (unlockAllCards == true) {
                  return null;
                } else {
                  if (this.state.unlockAllAsked) {
                      return <span style={{marginLeft: "60px"}}><Button color="red" onClick={this.handleUnlockAll}>Sure? Tap again</Button></span>
                  } else {
                      return <span style={{marginLeft: "60px"}}><Button onClick={this.askUnlockAll}>Unlock all</Button></span>
                  }
                }
              })()
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