import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './GameboardArea.css';

import {
    Button
} from 'rsuite';

import CoiffeurBoard from './components/rules/CoiffeurBoard';
import CoiffeurScores from './components/rules/CoiffeurScores';

class GameboardArea extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            localName: "",
            leaveRoomAsked: false,
        }
        
        this.handleLeaveRoom = this.handleLeaveRoom.bind(this);
        this.askLeaveroom = this.askLeaveroom.bind(this);
    }
    handleLeaveRoom() {
        this.props.handleLeave(this.props.roomName);
    }
    askLeaveroom() {
        this.setState({
            leaveRoomAsked: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    leaveRoomAsked: false
                });
            }, 3000);
        });
    }
    render() {
        const implementationProvider = () => {
            return {
                coiffeur: (
                    <div style={{textAlign: 'center', paddingTop: '20px'}}>
                        <CoiffeurScores scores={this.props.scores}></CoiffeurScores>
                        <CoiffeurBoard props={this.props.boardSetup}/>
                        <div className="leaveButton">
                            <p>Room: {this.props.roomName}</p>
                            {
                                (() => {
                                    if (this.state.leaveRoomAsked) {
                                        return <Button color="red" onClick={this.handleLeaveRoom}>Sure? Tap again</Button>
                                    } else {
                                        return <Button onClick={this.askLeaveroom}>Leave room</Button>
                                    }
                                }).bind(this)()
                            }
                        </div>
                    </div>
                ),
                schieber: (
                    <div></div>
                ),

                undefined: (
                    <div>
                        Choose room
                    </div>
                )
            };
        };

        console.log("GameboardArea:", this.props);
        return (
            implementationProvider()[this.props.gameMode]
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