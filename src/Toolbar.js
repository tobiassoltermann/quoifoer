import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { IoMdSettings, IoIosCheckmarkCircle, IoIosWarning } from "react-icons/io";
import { FiMaximize, FiMinimize } from "react-icons/fi";
import { Button } from 'rsuite';

import PropTypes from 'prop-types';

class ConnectedElement extends React.Component {
    render() {
        if (this.props.isConnected) {
            return (
                <Button size="lg" appearance="subtle" disabled style={{verticalAlign: 'middle', color: '#00ffa2'}}><IoIosCheckmarkCircle color='#00ffa2'/></Button>
            )
        } else {
            return (
                <Button size="lg" appearance="subtle" disabled style={{verticalAlign: 'middle', color: '#9f0000'}}><IoIosWarning color='#ffbe00'/></Button>
            )
        }
    }
}

class Toolbar extends React.Component {

    render() {
        return (
            <div style={{ textAlign: "left", verticalAlign: 'middle' }}>
                <IconContext.Provider value={{ color: "white", size: "3em" }}>
                    <Button size="lg" style={{verticalAlign: 'middle'}} appearance="subtle" onClick={() => { this.props.showSettings(true) }}><IoMdSettings /></Button>
                    {
                        (() => {
                            if (this.props.isFullscreen) {
                                return (<Button style={{verticalAlign: 'middle'}} onClick={() => { this.props.goFull(false) }} size="lg" appearance="subtle" ><FiMinimize /></Button>)
                            } else {
                                return (<Button style={{verticalAlign: 'middle'}} onClick={() => { this.props.goFull(true) }} size="lg" appearance="subtle" ><FiMaximize /></Button>)
                            }
                        }).bind(this)()
                    }
                    <ConnectedElement isConnected={this.props.isConnected}/>
                    
                </IconContext.Provider>
            </div>
        );
    }
}

Toolbar.propTypes = {
    showSettings: PropTypes.func,
    goFull: PropTypes.func,
    isConnected: PropTypes.bool,
    isFullscreen: PropTypes.bool,
}
export default Toolbar;