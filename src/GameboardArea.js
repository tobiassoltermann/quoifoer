import React from 'react';
import PropTypes from 'prop-types';
import './GameboardArea.css';

import {
    Button
} from 'rsuite';

import CoiffeurBoard from './components/rules/CoiffeurBoard';
import CoiffeurLastView from './components/rules/CoiffeurLastView';
import CoiffeurScores from './components/rules/CoiffeurScores';
import CoiffeurModeSlalomSubselector from './components/rules/CoiffeurModeSlalomSubselector';


class GameboardArea extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            localName: "",
            leaveRoomAsked: false,
        }
        this.possibleSubselectors = {
            CoiffeurModeSlalomSubselector: CoiffeurModeSlalomSubselector,
        };
        
        this.handleLeaveRoom = this.handleLeaveRoom.bind(this);
        this.askLeaveroom = this.askLeaveroom.bind(this);
        this.getSubselector = this.getSubselector.bind(this);
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
    getSubselector(subselectorName) {
        const { gameRuleSpecific } = this.props;

        const { visibleSubselector } = gameRuleSpecific;
        if (visibleSubselector === null || visibleSubselector === undefined) {
            return null;
        }
        //debugger;
        const VisibleSubselector = this.possibleSubselectors[visibleSubselector];
        return (
            <div className="subselector">
                <VisibleSubselector gameRuleSpecific={gameRuleSpecific} {...this.props}/>
            </div>
        );
    }

    render() {
        const { gameRuleSpecific, roomName } = this.props;
        var VisibleSubselector = this.getSubselector();
        const implementationProvider = () => {
            return {
                coiffeur: (
                    <div style={{textAlign: 'center', paddingTop: '20px'}}>
                        <CoiffeurScores gameRuleSpecific={gameRuleSpecific} {...this.props}></CoiffeurScores>
                        <CoiffeurBoard gameRuleSpecific={gameRuleSpecific} {...this.props}/>
                        <div className="leaveButton">
                            <p>Room: {roomName}</p>
                            {
                                (() => {
                                    if (this.state.leaveRoomAsked) {
                                        return <Button color="red" onClick={this.handleLeaveRoom}>Sure? Tap again</Button>
                                    } else {
                                        return <Button onClick={this.askLeaveroom}>Leave room</Button>
                                    }
                                })()
                            }
                            {<CoiffeurLastView gameRuleSpecific={gameRuleSpecific} {...this.props}/>}
                            { VisibleSubselector }
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
            implementationProvider.bind(this)()[this.props.gameMode]
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