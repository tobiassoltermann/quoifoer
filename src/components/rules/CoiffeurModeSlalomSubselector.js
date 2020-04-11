

import React from 'react';
import TrumpImages from '../../TrumpImages';

import './CoiffeurModeSlalomSubselector.css';

class TrumpSubIcon extends React.Component {
  constructor(props) {
    super(props);
    this.style = Object.assign(
      {},
      {
        maxWidth: "40%",
        height: "100%",
      },
      this.props.style
    );
  }
  render() {
    return (
        <img onClick={this.props.onClick} alt={"Trump " + this.props.which} key={this.props.which} src={TrumpImages[this.props.which]} style={this.style}></img>
    )
  }
}

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