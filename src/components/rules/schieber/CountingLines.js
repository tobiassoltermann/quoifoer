import React, { Component } from 'react';

import tally_five1 from '../../../img/tally_five1.png';
import tally_five2 from '../../../img/tally_five2.png';
import tally_five3 from '../../../img/tally_five3.png';
import tally_five4 from '../../../img/tally_five4.png';
import tally_five5 from '../../../img/tally_five5.png';
import tally_two1  from '../../../img/tally_two1.png';
import tally_two2  from '../../../img/tally_two2.png';
import tally_V     from '../../../img/tally_V.png';

import Nbsp from '../../../Nbsp';

const allPrefixes = {
    tally_five1,
    tally_five2,
    tally_five3,
    tally_five4,
    tally_five5,
    tally_two1,
    tally_two2,
    tally_V1 : tally_V,
    tally_X1 : tally_two2
}

class CountingLineElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { value, imagePrefix } = this.props;
        console.log("CountingLineElement:", imagePrefix, value)
        if (value == 0) {
            return <Nbsp/>;
        }
        return (
            <img alt={imagePrefix + value} src={allPrefixes[imagePrefix + value]} style={{ height: "100%" }} />
        )
    }
}


class CountingLine extends Component {
    constructor(props, maxPerBlock, imagePrefix) {
        super(props);
        this.maxPerBlock = maxPerBlock;
        this.imagePrefix = imagePrefix;

    }

    createElements(numberElements, elementType) {
        var elements = [];
        for (var i = 0; i < numberElements; i++) {
            elements.push(
                <CountingLineElement value={elementType} imagePrefix={this.imagePrefix} />
            );
        }
        if (elements.length == 0) {
            elements.push(<Nbsp/>);
        }

        return <span alt={this.maxPerBlock}>{elements}</span>;
    }

    render() {
        const { value } = this.props;
        return [
            this.createElements(parseInt(value / this.maxPerBlock), this.maxPerBlock),
            this.createElements(1, value % this.maxPerBlock),
        ].flat();

    }
}

class Counting5Blocks extends CountingLine {
    constructor(props) {
        super(props, 5, "tally_five");
    }
}


class Counting2Blocks extends CountingLine {
    constructor(props) {
        super(props, 2, "tally_two");
    }
}

class Counting500Blocks extends CountingLine {
    constructor(props) {
        super(props, 1, "tally_V");
    }
    render() {
        const { value } = this.props;
        return this.createElements(value, 1);
    }
}
class Counting1000Blocks extends CountingLine {
    constructor(props) {
        super(props, 1, "tally_X");
    }
    render() {
        const { value } = this.props;
        return this.createElements(value, 1);
    }
}

export {
    Counting5Blocks,
    Counting2Blocks,
    Counting500Blocks,
    Counting1000Blocks,
}