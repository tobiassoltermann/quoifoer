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
        return (
            <div className="gameboardArea">
                    <Scores scores={this.props.scores}></Scores>
                    <Board props={this.props.boardSetup}/>
            </div>
        )
    }
}

GameboardArea.propTypes = {
    visible: PropTypes.bool,
    commitChange: PropTypes.func,
    onHide: PropTypes.func,
    scores: PropTypes.object,
};
  

export default GameboardArea;