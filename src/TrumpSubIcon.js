import React from 'react';

import TrumpImages from './TrumpImages';

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

export default TrumpSubIcon;