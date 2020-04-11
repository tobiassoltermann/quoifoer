

import React from 'react';
import TrumpSubIcon from '../../TrumpSubIcon';

import './CoiffeurModeSlalomSubselector.css';

class CoiffeurModeSlalomSubselector extends React.Component {

    constructor(props) {
        super(props);

        this.onSelect = this.onSelect.bind(this);
        this.requestSelectTrick = this.requestSelectTrick.bind(this);
    }
    requestSelectTrick(multiplier, subselection) {
        this.props.requestSelectTrick(multiplier, subselection);
    }

    onSelect(UorD) {
        const { gameRuleSpecific } = this.props;
        debugger;
        this.requestSelectTrick(gameRuleSpecific.preselectedMultiplier, {
            direction: UorD,
        });
    }

    render() {
        return (
            <div className="subselectorSlalom">
                <p style={{margin: "10px", textAlign: "center"}}>Start with:</p>
                <div className="subselectorSlalomInner">
                    <div>
                        <TrumpSubIcon onClick={ ()=> { this.onSelect("U") } } which="trumpU"/>
                        <TrumpSubIcon onClick={ ()=> { this.onSelect("D") } } which="trumpD"/>
                    </div>
                </div>
            </div>
        )
    }


}


export default CoiffeurModeSlalomSubselector;