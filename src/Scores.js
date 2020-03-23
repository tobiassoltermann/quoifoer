import React, {Component} from 'react';

import OverflowScrolling from 'react-overflow-scrolling';
import './Scores.css'

class ScoreEntry extends React.Component {
    render () {
        return (
            <tr className="scoresRow">
                <td className="scoresIcon">
                    {this.props.icon}
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

class Scores extends React.Component {
    render () {
        let scores = [
            {
                icon: 1,
                scoreTeam1: 100,
                scoreTeam2: 57,
            },
            {
                icon: 2,
                scoreTeam1: 100,
                scoreTeam2: 57,
            },
            {
                icon: 3,
                scoreTeam1: 100,
                scoreTeam2: 57,
            },
            {
                icon: 4,
                scoreTeam1: 100,
                scoreTeam2: 57,
            },
            {
                icon: 5,
                scoreTeam1: 100,
                scoreTeam2: 57,
            },
            {
                icon: 6,
                scoreTeam1: 100,
                scoreTeam2: 57,
            },
            {
                icon: 7,
                scoreTeam1: 100,
                scoreTeam2: 57,
            },
            {
                icon: 8,
                scoreTeam1: 100,
                scoreTeam2: 57,
            },
            {
                icon: 9,
                scoreTeam1: 100,
                scoreTeam2: 57,
            },
            {
                icon: 10,
                scoreTeam1: 100,
                scoreTeam2: 57,
            },
        ];

        return (
            <div className="scores">
                <div className="scoresInner">
                    <div className="scoresTable">
                        <OverflowScrolling className='overflow-scrolling'>
                            <div>
                                <table className="scoresTable" style={{ whiteSpace: 'nowrap'}}>
                                    <thead>
                                        <tr>
                                            <th className="scoresModeHeader">Coiffeur</th>
                                            <th className="scoresHeader">Team 1</th>
                                            <th className="scoresHeader">Team 2</th>
                                        </tr>  
                                    </thead>
                                    <tbody>
                                        {
                                            scores.map( (e) => {
                                                return <ScoreEntry {...e}></ScoreEntry>
                                            })
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr className="scoresRow">
                                            <td className="scoresIcon">
                                                Total:
                                            </td>
                                            <td className="scoresItem">
                                                134
                                            </td>
                                            <td className="scoresItem">
                                                13
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

export default Scores;