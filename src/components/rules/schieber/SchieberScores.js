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
        if (scores && yourTeam != -1) {
            console.log("CoiffeurScores:render() scores:", scores);
            /*scores.team1Scores = 2885;
            scores.team2Scores = 1873;*/
            var teamNScores, teamSScores, teamNName, teamSName, teamSTotal, teamNTotal;
            switch (yourTeam) {
                case 1:
                    teamSScores = calculateElementCounts(scores.totalTeam1);
                    teamSName = scores.team1Name;
                    teamSTotal = scores.totalTeam1;
                    
                    teamNScores = calculateElementCounts(scores.totalTeam2);
                    teamNName = scores.team2Name;
                    teamNTotal = scores.totalTeam2;
                break;
                case 2:
                    teamSScores = calculateElementCounts(scores.totalTeam2);
                    teamSName = scores.team2Name;
                    teamSTotal = scores.totalTeam2;

                    teamNScores = calculateElementCounts(scores.totalTeam1);
                    teamNName = scores.team1Name;
                    teamNTotal = scores.totalTeam1;
                break;
                default:
                    teamSScores = calculateElementCounts(scores.totalTeam2);
                    teamSName = scores.team2Name;
                    teamSTotal = scores.totalTeam2;

                    teamNScores = calculateElementCounts(scores.totalTeam1);
                    teamNName = scores.team1Name;
                    teamNTotal = scores.totalTeam1;
            }

            return (
                <div class="scores">
                    <div className="scoresInner">
                        <div className="scoreTableTeam1">
                            <div className="scoreTableTeamInner">
                                <div className="scoresRow">
                                    <div className="countingBlock countingBlockLeft" style={{ width: "70%" }}>
                                        <Counting5Blocks value={teamNScores[100]} />
                                    </div>
                                    <div className="countingBlock countingBlockRight" style={{ width: "25%" }}>
                                        <Counting500Blocks value={teamNScores[500]} />
                                        <Counting1000Blocks value={teamNScores[1000]} />
                                    </div>
                                </div>
                                <div className="scoresRow">
                                    <div className="countingBlock countingBlockLeft" style={{ width: "70%" }}>
                                        <Counting2Blocks value={teamNScores[50]} />
                                    </div>
                                    <div className="countingBlock countingBlockRight" style={{ width: "25%" }}>
                                        <span style={{ fontSize: "2em", transform: "rotate: -180deg" }}>{teamNScores[1]}</span>
                                    </div>
                                </div>
                                <div className="scoresRow">
                                    <div className="countingBlock countingBlockLeft" style={{ width: "100%" }}>
                                        <Counting5Blocks value={teamNScores[20]} />
                                    </div>
                                </div>
                                <div style={{position: "absolute", bottom: "10px", right: "10px", transform: "rotate: -180deg"}}>
                                    <span className="teamScoreNumeric">{teamNTotal}</span>
                                </div>
                                <div style={{left: 0, right: 0, position: "absolute", bottom: "10px", transform: "rotate: -180deg"}}>
                                    <span>{ teamNName }</span>
                                </div>
                            </div>
                        </div>
                        <div className="scoreGoal">3500</div>
                        <div className="scoreTableTeam2">
                            <div className="scoreTableTeamInner">
                                <div className="scoresRow">
                                    <div className="countingBlock countingBlockLeft" style={{ width: "70%" }}>
                                        <Counting5Blocks value={teamSScores[100]} />
                                    </div>
                                    <div className="countingBlock countingBlockRight" style={{ width: "25%" }}>
                                        <Counting500Blocks value={teamSScores[500]} />
                                        <Counting1000Blocks value={teamSScores[1000]} />
                                    </div>
                                </div>
                                <div className="scoresRow">
                                    <div className="countingBlock countingBlockLeft" style={{ "width": "70%" }}>
                                        <Counting2Blocks value={teamSScores[50]} />
                                    </div>
                                    <div className="countingBlock countingBlockRight" style={{ "width": "25%" }}>
                                        <span style={{ fontSize: "2em" }}>{ teamSScores[1] }</span>
                                    </div>
                                </div>
                                <div className="scoresRow">
                                <div className="countingBlock countingBlockLeft" style={{ width: "100%" }}>
                                        <Counting5Blocks value={teamSScores[20]} />
                                    </div>
                                </div>
                                <div style={{position: "absolute", bottom: "10px", right: "10px"}}>
                                    <span className="teamScoreNumeric">{ teamSTotal }</span>
                                </div>
                                <div style={{left: 0, right: 0, position: "absolute", bottom: "10px"}}>
                                    <span>{ teamSName }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
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