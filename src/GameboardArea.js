import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rectangle from 'react-rectangle';
import './GameboardArea.css';

import Card from './Card';
import Board from './Board';

class GameboardArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localName: ""
        }
        
    }

    /*handleChange(value, i) {
        this.setState({
            localName: value
        });
    }
    handleSubmit(e) {
        this.props.commitChange({
            localName: this.state.localName
        });
    }*/
    render() {
        var boardSetup = {
            player: [
                "Player South",
                "Player "
            ]
        }
        return (
            <div className="gameboardArea">
                    <div className="scores">
                        <div style={{display: 'inline-block', backgroundColor: 'red', width: "100px", height: '100px'}}></div>
                        <table className="scoresTable">
                            <tr>
                                <th>abc</th>
                                <th>abc</th>
                                <th>abc</th>
                            </tr>
                        </table>
                    </div>
                    <Board props={{}}/>
                    <div className="board">
                        <div className="boardInner">
                            <div style={{zIndex: 100}}>
                                <Card className="boardCard cardS" which="H6"></Card>
                                <div className="playerNameS"><p>Player 1</p></div>
                            </div>
                            <div style={{zIndex: 200}}>
                                <Card className="boardCard cardE" which="S7"></Card>
                                <div className="playerNameE">Player 2</div>
                            </div>
                            <div style={{zIndex: 300}}>
                                <Card className="boardCard cardN" which="K8"></Card>
                                <div className="playerNameN">Player 3</div>
                            </div>
                            <div style={{zIndex: 400}}>
                                <Card className="boardCard cardW" which="C9"></Card>
                                <div className="playerNameW">Player 4</div>
                                
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

GameboardArea.propTypes = {
    visible: PropTypes.bool,
    commitChange: PropTypes.func,
    onHide: PropTypes.func,
};
  

export default GameboardArea;