import React from 'react';

import {
    Button
} from 'rsuite';

import { FiArrowUp } from "react-icons/fi";

import Card from '../../../Card';
import './SchieberBoard.css';

class SeatedPlayer extends React.Component {

    playerText() {
        // TODO: Fix ugly pointer-events hack
        if (this.props.canLeave) {
            return (
                <div style={{pointerEvents:'none'}} className={"playerName" + this.props.compass}><p>{this.props.playerName}&nbsp;<Button style={{pointerEvents:'auto'}} onClick={()=>{ console.log("unseat"); this.props.requestUnseat(); }} color="red" size="xs">X</Button></p></div>
            );
        } else {
            return (
                <div style={{pointerEvents:'none'}} className={"playerName" + this.props.compass}><p>{this.props.playerName}</p></div>
            );
        }
    }
    renderCard() {
        if (this.props.card != null) {
            return (
                <Card isWinner={this.props.isWinner} className={"boardCard card" + this.props.compass} which={this.props.card} />
            )
        } else {
            return null;
        }
    }

    render() {
        console.log( this.props );
        return (
            <div style={{zIndex: this.props.zIndex}}>
                { this.renderCard() }
                { this.playerText() }
            </div>
        )
    }
}

class EmptySeat extends React.Component {
    render() {
        return (
            <div style={{zIndex: this.props.zIndex}}>
                <div style={{pointerEvents: 'none'}} className={"playerName" + this.props.compass}>
                    <Button style={{pointerEvents: 'auto'}}
                        onClick={()=>{
                            this.props.requestSeat(this.props.compass);
                        }}
                        color="yellow" size="xs" appearance="ghost">Sit down</Button>
                </div>
            </div>
        )
    }
}

class BoardSeat extends React.Component {
    render () {
        if (this.props.playerName == null) {
            return <EmptySeat {...this.props}/>
        } else {
            return <SeatedPlayer {...this.props}/>
        }

    }

}

class PushButton extends React.Component {

    render() {
        const { canPush } = this.props;
        return canPush
        ? <Button onClick={this.props.onClick}><FiArrowUp/>Push</Button>
        : null
    }
}

class SchieberBoard extends React.Component {
    constructor(props) {
        super(props);
        this.requestPush = this.requestPush.bind(this);
    }

    requestPush() {
        this.props.requestPushNext();
    }

    render() {
        var { requestSeat, requestUnseat, gameRuleSpecific } = this.props;
        var { localPlayerNames, localTableCards, mySeat, gameStatus, canPush } = gameRuleSpecific;
        return (
            <div className="board">
                <div className="boardInner">
                    <div className="pushButton">
                        <PushButton onClick={this.requestPush} canPush={canPush} />
                    </div>
                    {
                        (() => {
                            if (localPlayerNames != null && localTableCards != null) {
                                console.log("SchieberBoard:render", localPlayerNames);
                                return ["S", "E", "N", "W"].map( (compass, index) => {
                                    var playerName = localPlayerNames[compass];
                                    var card = localTableCards[compass];
                                    var crdPlayerIsWinner = (() => {
                                        if (localTableCards.winner == null || localTableCards.winner == undefined) {
                                            return null;
                                        }
                                        return localTableCards.winner === compass;
                                    })();
                                    //console.log("compass: ", compass, "index: " , index, "e", e);
                                    return (
                                        <BoardSeat
                                            key={compass}
                                            zIndex={100*index}
                                            compass={compass}
                                            playerName={playerName}
                                            card={card}
                                            isWinner={crdPlayerIsWinner}
                                            canLeave={ gameStatus === "PLAYER_SEATING" && (mySeat === index) }
                                            requestSeat={ requestSeat }
                                            requestUnseat={ requestUnseat }
                                        />
                                    );
                                });
                            } else {
                                return <p>Board not set up yet</p>
                            }

                        })()
                    }
                    
                    
                </div>
            </div>
        );
    }
}
/*
<BoardSeat zIndex={100} compass="S" card="NN" playerName="Player 1"></BoardSeat>
<BoardSeat zIndex={200} compass="E" card="S7" canLeave={true} playerName="Player 2"></BoardSeat>
<BoardSeat zIndex={300} compass="N" card="K8" canLeave={false} playerName="Player 3"></BoardSeat>
<BoardSeat zIndex={400} compass="W" card="C9" canLeave={true} playerName={null}></BoardSeat>

*/

export default SchieberBoard;