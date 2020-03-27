import React, {Component} from 'react';

import './CoiffeurBoard.css';
import Card from '../../Card';

class BoardSeat extends React.Component {
    render () {
        return (
            <div style={{zIndex: this.props.zIndex}}>
                <Card className={"boardCard card" + this.props.compass} which={this.props.card}></Card>
                <div className={"playerName" + this.props.compass}><p>{this.props.playerName}</p></div>
            </div>
        )
    }

}

class Board extends React.Component {
    render() {
        return (
            <div className="board">
                <div className="boardInner">
                    <BoardSeat zIndex={100} compass="S" card="NN" playerName="Player 1"></BoardSeat>
                    <BoardSeat zIndex={200} compass="E" card="S7" playerName="Player 2"></BoardSeat>
                    <BoardSeat zIndex={300} compass="N" card="K8" playerName="Player 3"></BoardSeat>
                    <BoardSeat zIndex={400} compass="W" card="C9" playerName="Player 4"></BoardSeat>
                    
                </div>
            </div>
        );
    }

}

export default Board;