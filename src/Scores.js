import React, {Component} from 'react';
import PropTypes from 'prop-types';
import OverflowScrolling from 'react-overflow-scrolling';
import './Scores.css'
import TrumpIcon from './TrumpIcon';

class ScoreEntry extends React.Component {
    render () {
        return (
            <tr className="scoresRow">
                <td className="scoresIcon">
                    <span className="scoresIconLine"><span className="scoresMultiplier">{this.props.multiplier}x</span> <TrumpIcon which={this.props.icon} style={{ width: '35%', paddingLeft: '-10px', marginLeft: '-20px' }}></TrumpIcon></span>
                </td>
                <td className="scoresItem">
                    {this.props.scoreTeam1}
                </td>
                <td className="scoresItem">
                    {this.props.scoreTeam2}
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

class Scores extends React.Component {
    render () {
        var scores = this.props.scores;
       
        return (
            <div className="scores">
                <div className="scoresInner">
                    <div className="scoresTable">
                        <OverflowScrolling className='overflow-scrolling'>
                            <div>
                                <table className="scoresTable" style={{ whiteSpace: 'nowrap'}}>
                                    <thead className="scoresTableHeader">
                                        <tr>
                                            <th className="scoresModeHeader">{scores.mode}</th>
                                            <th className="scoresHeader">{scores.team1Name}</th>
                                            <th className="scoresHeader">{scores.team2Name}</th>
                                        </tr>  
                                    </thead>
                                    <tbody>
                                        {
                                            scores.scoreLines.map( (e, i) => {
                                                return <ScoreEntry key={i} multiplier={i+1} {...e}></ScoreEntry>
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
    }
}

Scores.propTypes = {
    scoreLines: PropTypes.array,
    totalTeam1: PropTypes.number,
    totalTeam2: PropTypes.number,
    team1Name: PropTypes.string,
    team2Name: PropTypes.string,
    mode: PropTypes.string,
}

export default Scores;