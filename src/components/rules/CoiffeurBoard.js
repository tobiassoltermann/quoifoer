import React from 'react';

import {
    Button
} from 'rsuite';

import { FiArrowUpRight } from "react-icons/fi";

import Card from '../../Card';
import './CoiffeurBoard.css';

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
    render() {
        return (
            <div style={{zIndex: this.props.zIndex}}>
                <Card className={"boardCard card" + this.props.compass} which={this.props.card}></Card>
                {this.playerText() }
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
        ? <Button onClick={this.props.onClick}><FiArrowUpRight/>Push</Button>
        : null
    }
}

class CoiffeurBoard extends React.Component {
    constructor(props) {
        super(props);
        this.requestPush = this.requestPush.bind(this);
    }

    requestPush() {
        this.props.requestPushNext();
    }

    render() {
        var { requestSeat, requestUnseat, gameRuleSpecific } = this.props;
        var { boardSetup, gameStatus, canPush } = gameRuleSpecific;
        return (
            <div className="board">
                <div className="boardInner">
                    <div className="pushButton">
                        <PushButton onClick={this.requestPush} canPush={canPush} />
                    </div>
                    {
                        (() => {
                            if (boardSetup != null) {
                                return ["S", "E", "N", "W"].map( (compass, index) => {
                                    var e = boardSetup[compass];
                                    //console.log("compass: ", compass, "index: " , index, "e", e);
                                    return (
                                        <BoardSeat
                                            key={compass}
                                            zIndex={100*index}
                                            compass={compass}
                                            playerName={e.playerName}
                                            card={e.card}
                                            canLeave={ gameStatus === "PLAYER_SEATING" && (boardSetup.self === compass) }
                                            requestSeat={ requestSeat }
                                            requestUnseat={ requestUnseat }
                                        />
                                    );
                                })
                            } else {
                                return <p style={{color: "red"}}>Boardsetup null</p>;
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

export default CoiffeurBoard;