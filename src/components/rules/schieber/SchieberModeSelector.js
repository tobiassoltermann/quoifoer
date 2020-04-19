import React from 'react';

import TrumpSubIcon from '../../../TrumpSubIcon';

import './SchieberModeSelector.css';


class SchieberModeSelector extends React.Component {

    constructor(props) {
        super(props);

        this.onSelect = this.onSelect.bind(this);
        this.requestSelectTrick = this.requestSelectTrick.bind(this);
    }
    requestSelectTrick(implementationName) {
        this.props.requestSelectTrick(implementationName);
    }

    onSelect(implementationName) {
        this.requestSelectTrick(implementationName);
    }

    listAllModes() {
        return [
            {
                icon: "trumpC",
                name: "CLUBS",
            },
            {
                icon: "trumpH",
                name: "HEARTS",
            },
            { 
                icon: "trumpS",
                name: "SPADES",
            },
            {
                icon: "trumpK",
                name: "DIAMONDS",
            },
            {
                icon: "trumpD",
                name: "DOWN",
            },
            {
                icon: "trumpU",
                name: "UP",
            },
        ];
    }

    render() {
        const { gameRuleSpecific } = this.props;
        const { gameStatus, myTurn } = gameRuleSpecific;
        if (gameStatus == "CHOOSE_TRICK" && myTurn === true) {
            return (
                <div className="subselector">
                    <p style={{ margin: "10px", textAlign: "center" }}>Select trick:</p>
                    <div className="subselectorInner">
                        <div>
                            {
                                this.listAllModes().map((el) => {
                                    return <TrumpSubIcon onClick={() => { this.onSelect(el.name) }} which={el.icon} />

                                })
                            }
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }


}


export default SchieberModeSelector;