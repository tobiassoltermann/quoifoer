import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rectangle from 'react-rectangle';
import './GameboardArea.css';

import Card from './Card';
import Board from './Board';
import Scores from './Scores';
class GameboardArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localName: ""
        }
        
    }
    render() {
        var boardSetup = {
            s: {
                playerName: "Player 1",
                card: "H6"
            },
            e: {
                playerName: "Player 2",
                card: "S7"
            },
            n: {
                playerName: "Player 3",
                card: "K8"
            },
            w: {
                playerName: "Player 4",
                card: "C9"
            },
        }
        return (
            <div className="gameboardArea">
                    <Scores></Scores>
                    <Board props={boardSetup}/>
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