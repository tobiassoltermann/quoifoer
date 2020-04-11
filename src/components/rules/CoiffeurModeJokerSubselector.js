import React from 'react';

import TrumpSubIcon from '../../TrumpSubIcon';

import './CoiffeurModeSlalomSubselector.css';


class CoiffeurModeJokerSubselector extends React.Component {

    constructor(props) {
        super(props);

        this.onSelect = this.onSelect.bind(this);
        this.requestSelectTrick = this.requestSelectTrick.bind(this);
    }
    requestSelectTrick(multiplier, subselection) {
        this.props.requestSelectTrick(multiplier, subselection);
    }

    onSelect(implementationName) {
        const { gameRuleSpecific } = this.props;
        debugger;
        this.requestSelectTrick(gameRuleSpecific.preselectedMultiplier, {
            subMode: implementationName,
        });
    }

    render() {
        return (
            <div className="subselectorSlalom">
                <p style={{margin: "10px", textAlign: "center"}}>Use as joker:</p>
                <div className="subselectorSlalomInner">
                    <div>
                        {
                            (()=> {
                                return [
                                    "trumpC",
                                    "trumpH",
                                    "trumpS",
                                    "trumpK",
                                    "trumpD",
                                    "trumpU",
                                    "trumpT",
                                ].map( (el) => {
                                    return <TrumpSubIcon onClick={ ()=> { this.onSelect(el) } } which={el} />

                                })
                            })()
                        }
                    </div>
                </div>
            </div>
        )
    }


}


export default CoiffeurModeJokerSubselector;