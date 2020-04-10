import React from 'react';

import Card from '../../Card';
import './CoiffeurLastView.css';

class SeatedPlayerView extends React.Component {

    renderCard() {
        if (this.props.card != null) {
            return (
                <Card isWinner={this.props.isWinner} className={"lastStichCard card" + this.props.compass} which={this.props.card} />
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div style={{ zIndex: this.props.zIndex }}>
                {this.renderCard()}
            </div>
        )
    }
}

class BoardSeatView extends React.Component {
    render() {
        if (this.props.card != null) {
            return <SeatedPlayerView {...this.props} />
        } else {
            return null;
        }
    }

}

class CoiffeurLastView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { gameRuleSpecific } = this.props;
        var { lastStich } = gameRuleSpecific;
        if (lastStich != null) {
            return (
                <div className="lastStich">
                    <p style={{margin: "5px", float: "right"}}>Last:</p>
                    <div className="lastStichInner">
                        {
                            (() => {
                                return ["S", "E", "N", "W"].map((compass, index) => {
                                    var card = lastStich[compass];
                                    var crdPlayerIsWinner = (() => {
                                        if (lastStich.winner == null || lastStich.winner == undefined) {
                                            return null;
                                        }
                                        return lastStich.winner === compass;
                                    })();
                                    //console.log("compass: ", compass, "index: " , index, "e", e);
                                    return (
                                        <BoardSeatView
                                            key={compass}
                                            zIndex={100 * index}
                                            compass={compass}
                                            card={card}
                                            isWinner={crdPlayerIsWinner}
                                        />
                                    );
                                });

                            })()
                        }


                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}
/*
<BoardSeat zIndex={100} compass="S" card="NN" playerName="Player 1"></BoardSeat>
<BoardSeat zIndex={200} compass="E" card="S7" canLeave={true} playerName="Player 2"></BoardSeat>
<BoardSeat zIndex={300} compass="N" card="K8" canLeave={false} playerName="Player 3"></BoardSeat>
<BoardSeat zIndex={400} compass="W" card="C9" canLeave={true} playerName={null}></BoardSeat>

*/

export default CoiffeurLastView;