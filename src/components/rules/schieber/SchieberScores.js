import React from 'react';
import PropTypes from 'prop-types';

import {
    Counting5Blocks,
    Counting2Blocks,
    Counting500Blocks,
    Counting1000Blocks,
} from './CountingLines';

import './SchieberScores.css'

import TrumpIcon from '../../../TrumpIcon';

import {
    Button
} from 'rsuite';

function calculateElementCounts(value) {
    var ret = {
        1: 0,
        20: 0,
        50: 0,
        100: 0,
        1000: 0,
    }
    var remainder = value;
    Object.keys(ret).sort((a, b) => { return a - b; }).reverse().forEach((divisor) => {
        var fullTimes = remainder / divisor;
        ret[divisor] = parseInt(fullTimes);
        remainder = remainder % divisor;
    });
    console.log(ret);
    return ret;
}

class SchieberScores extends React.Component {
    render() {
        var { gameRuleSpecific, requestSelectTrick } = this.props
        var { status, scores, yourTeam, myTurn } = gameRuleSpecific;
        if (scores) {
            console.log("CoiffeurScores:render() scores:", scores);
            scores.team1Scores = 2885;
            scores.team2Scores = 1873;
            var elcountTeam1 = calculateElementCounts(scores.team1Scores);
            var elcountTeam2 = calculateElementCounts(scores.team2Scores);

            return (
                <div class="scores">
                    <div className="scoresInner">
                        <div className="scoreTableTeam1" style={{ position: "absolute", top: "0px", left: "0px", right: "0px", padding: "0px", height: "50%", transform: "rotate(180deg)", paddingTop: "10px" }}>
                            <div style={{ borderTop: "1px solid rgb(255, 255, 255, 0.6)", verticalAlign: "bottom", width: "100%", height: "100%", padding: "10px", marginTop: "10px"}} >
                                <div className="scoresRow scores100Row">
                                    <div className="countingBlock countingBlockLeft" style={{ width: "70%" }}>
                                        <Counting5Blocks value={elcountTeam1[100]} />
                                    </div>
                                    <div className="countingBlock countingBlockRight" style={{ width: "25%" }}>
                                        <Counting500Blocks value={elcountTeam1[500]} />
                                        <Counting1000Blocks value={elcountTeam1[1000]} />
                                    </div>
                                </div>
                                <div className="scoresRow scores50Row">
                                    <div className="countingBlock countingBlockLeft" style={{ width: "70%" }}>
                                        <Counting2Blocks value={elcountTeam1[50]} />
                                    </div>
                                    <div className="countingBlock countingBlockRight" style={{ width: "25%" }}>
                                        <span style={{ fontSize: "2em" }}>{elcountTeam1[1]}</span>
                                    </div>
                                </div>
                                <div className="scoresRow scores20Row">
                                    <div className="countingBlock countingBlockLeft" style={{ width: "100%" }}>
                                        <Counting5Blocks value={elcountTeam1[20]} />
                                    </div>
                                </div>
                                <div style={{position: "absolute", bottom: "10px", right: "10px"}}>
                                    <span style={{ textAlign: "right", fontSize: "3em", opacity: "0.4"}}>{scores.team1Scores}</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ zIndex: 1000, fontSize: "1.5em", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -75%)"}}>3500</div>
                        <div className="scoreTableTeam1" style={{ verticalAlign: "bottom", position: "absolute", bottom: "0px", left: "0px", right: "0px", padding: "0px", height: "50%" }}>
                            <div style={{ borderTop: "1px solid rgb(255, 255, 255, 0.6)", verticalAlign: "bottom", width: "100%", height: "100%", padding: "10px", marginTop: "10px" }}>
                                <div className="scoresRow scores100Row">
                                    <div className="countingBlock countingBlockLeft" style={{ width: "70%" }}>
                                        <Counting5Blocks value={elcountTeam2[100]} />
                                    </div>
                                    <div className="countingBlock countingBlockRight" style={{ width: "25%" }}>
                                        <Counting500Blocks value={elcountTeam2[500]} />
                                        <Counting1000Blocks value={elcountTeam2[1000]} />
                                    </div>
                                </div>
                                <div className="scoresRow scores50Row">
                                    <div className="countingBlock countingBlockLeft" style={{ "width": "70%" }}>
                                        <Counting2Blocks value={elcountTeam2[50]} />
                                    </div>
                                    <div className="countingBlock countingBlockRight" style={{ "width": "25%" }}>
                                        <span style={{ fontSize: "2em" }}>{elcountTeam2[1]}</span>
                                    </div>
                                </div>
                                <div className="scoresRow scores20Row">
                                <div className="countingBlock countingBlockLeft" style={{ width: "100%" }}>
                                        <Counting5Blocks value={elcountTeam2[20]} />
                                    </div>
                                </div>
                                <div style={{position: "absolute", bottom: "10px", right: "10px"}}>
                                    <span style={{ textAlign: "right", fontSize: "3em", opacity: "0.4"}}>{scores.team2Scores}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )

            /*
            return (
                <div className="scores">
                    <div className="scoresInner">
                        <div className="scoreTableTeam1" style={{ position: "absolute", top: "10px", left: "10px", right: "10px", padding: "10px", backgroundColor: "rgb(0, 0, 80)", height: "50%", width: "100%" }}>
                            <div style={{ position: "absolute", top: "10px", bottom: "10px", left: "10px", right: "10px", height: "30%", transform: "rotate(-180deg)"}}>
                                <div className="scores100Row">
                                    <div style={{ position: "absolute", left: "10px", top: 0, display: "inline-block", width: "50%", height: "100%", textAlign: "left" }}>
                                        <Counting5Blocks value={elcountTeam1[100]} />
                                    </div>
                                    <div style={{ position: "absolute", right: "10px", top: 0, display: "inline-block", width: "50%", height: "100%", textAlign: "right" }}>
                                        <Counting500Blocks value={elcountTeam1[500]} />
                                        <Counting1000Blocks value={elcountTeam1[1000]} />
                                    </div>
                                </div>
                                <div className="scores50Row">
                                    <div style={{ position: "absolute", left: "10px", display: "inline-block", width: "50%", height: "100%", textAlign: "left" }}>
                                        <Counting2Blocks value={elcountTeam1[50]} />
                                    </div>
                                    <div style={{ position: "absolute", left: "10px", display: "inline-block", width: "50%", height: "100%", textAlign: "right" }}>
                                        <span style={{ fontSize: "2em" }}>{elcountTeam1[1]}</span>
                                    </div>
                                </div>
                                <div className="scores20Row">
                                    <div style={{ position: "absolute", left: "10px", bottom: 0, display: "inline-block", width: "50%", height: "100%", textAlign: "left" }}>
                                        <Counting5Blocks value={elcountTeam1[20]} />
                                    </div>
                                </div>
                            </div>
                            Team1
                        </div>

                        <div className="scoreTableTeam1" style={{ position: "absolute", top: "10px", left: "10px", right: "10px", padding: "10px", backgroundColor: "rgb(0, 0, 80)", height: "50%", width: "100%" }}>
                            <div style={{ position: "absolute", top: "10px", bottom: "10px", left: "10px", right: "10px", height: "30%", transform: "rotate(0deg)"}}>
                                <div className="scores100Row">
                                    <div style={{ position: "absolute", left: "10px", top: 0, display: "inline-block", width: "50%", height: "100%", textAlign: "left" }}>
                                        <Counting5Blocks value={elcountTeam2[100]} />
                                    </div>
                                    <div style={{ position: "absolute", right: "10px", top: 0, display: "inline-block", width: "50%", height: "100%", textAlign: "right" }}>
                                        <Counting500Blocks value={elcountTeam2[500]} />
                                        <Counting1000Blocks value={elcountTeam2[1000]} />
                                    </div>
                                </div>
                                <div className="scores50Row">
                                    <div style={{ position: "absolute", left: "10px", display: "inline-block", width: "50%", height: "100%", textAlign: "left" }}>
                                        <Counting2Blocks value={elcountTeam2[50]} />
                                    </div>
                                    <div style={{ position: "absolute", left: "10px", display: "inline-block", width: "50%", height: "100%", textAlign: "right" }}>
                                        <span style={{ fontSize: "2em" }}>{elcountTeam2[1]}</span>
                                    </div>
                                </div>
                                <div className="scores20Row">
                                    <div style={{ position: "absolute", left: "10px", bottom: 0, display: "inline-block", width: "50%", height: "100%", textAlign: "left" }}>
                                        <Counting5Blocks value={elcountTeam2[20]} />
                                    </div>
                                </div>
                            </div>
                            Team2
                        </div>

                        <div style={{ position: "absolute", alignItems: "center" }}>3500</div>
                    </div>

                </div>
            )
            */
        } else {
            return (
                <div className="scores" />
            );
        }
    }
}

SchieberScores.propTypes = {
    scoreLines: PropTypes.array,
    totalTeam1: PropTypes.number,
    totalTeam2: PropTypes.number,
    team1Name: PropTypes.string,
    team2Name: PropTypes.string,
    mode: PropTypes.string,
}

export default SchieberScores;