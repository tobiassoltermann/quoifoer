import React from 'react';
import PropTypes from 'prop-types';
import OverflowScrolling from 'react-overflow-scrolling';
import './CoiffeurScores.css'
import TrumpIcon from '../../TrumpIcon';

import {
    Button
} from 'rsuite';

class ScoreEntry extends React.Component {
    constructor(props) {
        super(props);
        this.requestSelectTrick = this.requestSelectTrick.bind(this);
    }
    requestSelectTrick(multiplier) {
        this.props.requestSelectTrick(multiplier);
    }
    render() {
        var { yourTeam, scoreTeam1, scoreTeam2, multiplier, icon, selectable, myTurn } = this.props;

        const lineSelectable = selectable && myTurn;
        
        return (
            <tr className="scoresRow">
                <td className="scoresIcon">
                    {
                        (()=>{
                            return (lineSelectable) 
                            ?   <span className="scoresIconLine"><Button onClick={ () => {this.requestSelectTrick(multiplier) }} style={{left: 0, position: 'absolute'}} size='xs'>=></Button><span className="scoresMultiplier">{multiplier}x</span> <TrumpIcon which={icon} style={{ width: '35%', paddingLeft: '-10px', marginLeft: '-20px' }}></TrumpIcon></span>
                            :   <span className="scoresIconLine"><span className="scoresMultiplier">{multiplier}x</span> <TrumpIcon which={this.props.icon} style={{ width: '35%', paddingLeft: '-10px', marginLeft: '-20px' }}></TrumpIcon></span>
                        })()
                    }
                </td>
                <td className={"scoresItem " + (() => { return yourTeam == 1 ? 'scoresItem_highlight' : ''})() }>
                    {scoreTeam1}
                </td>
                <td className={"scoresItem "  + (() => { return yourTeam == 2 ? 'scoresItem_highlight' : ''})() }>
                    {scoreTeam2}
                </td>
            </tr>
        );
    }
}
ScoreEntry.propTypes = {
    icon: PropTypes.string,
    multiplier: PropTypes.number,
    scoreTeam1: PropTypes.number,
    scoreTeam2: PropTypes.number,
}

class CoiffeurScores extends React.Component {
    render() {
        var { gameRuleSpecific, requestSelectTrick } = this.props
        var { status, scores, yourTeam, myTurn } = gameRuleSpecific;
        if (scores) {
            return (
                <div className="scores">
                    <div className="scoresInner">
                        <div className="scoresTable">
                            <OverflowScrolling className='overflow-scrolling'>
                                <div>
                                    <table className="scoresTable" style={{ whiteSpace: 'nowrap' }}>
                                        <thead className="scoresTableHeader">
                                            <tr>
                                                <th className="scoresModeHeader">{scores.mode}</th>
                                                <th className={"scoresHeader " + (() => { return yourTeam == 1 ? 'scoresItem_highlight' : ''})() }>{scores.team1Name}</th>
                                                <th className={"scoresHeader " + (() => { return yourTeam == 2 ? 'scoresItem_highlight' : ''})() }>{scores.team2Name}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                scores.scoreLines.map((e, i) => {
                                                    var thisSelectable = (status == "CHOOSE_TRICK") ? e.selectable : false;
                                                    var multiplier = i + 1;
                                                    return <ScoreEntry key={i} yourTeam={yourTeam} multiplier={multiplier} requestSelectTrick={requestSelectTrick} myTurn={myTurn} selectable={thisSelectable} {...e}></ScoreEntry>
                                                })
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr className="scoresRow">
                                                <td className="scoresIcon">
                                                    Total:
                                                </td>
                                                <td className="scoresItem">
                                                    {scores.totalTeam1}
                                                </td>
                                                <td className="scoresItem">
                                                    {scores.totalTeam2}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </OverflowScrolling>
                        </div>

                    </div>
                </div>
            )
        } else {
            return (
                <div className="scores"/>
            );
        }
    }
}

CoiffeurScores.propTypes = {
    scoreLines: PropTypes.array,
    totalTeam1: PropTypes.number,
    totalTeam2: PropTypes.number,
    team1Name: PropTypes.string,
    team2Name: PropTypes.string,
    mode: PropTypes.string,
}

export default CoiffeurScores;