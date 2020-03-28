import React from 'react';
import { IconContext } from "react-icons";
import { IoMdSettings, IoIosCheckmarkCircle, IoIosWarning } from "react-icons/io";
import { FiMaximize, FiMinimize } from "react-icons/fi";
import { Button } from 'rsuite';

import PropTypes from 'prop-types';
import TrumpIcon from './TrumpIcon';
import './Toolbar.css';

class ConnectedElement extends React.Component {
    render() {
        if (this.props.isConnected) {
            return (
                <div>
                    <Button size="lg" appearance="subtle" disabled style={{verticalAlign: 'middle', color: '#00ffa2'}}><IoIosCheckmarkCircle color='#00ffa2'/></Button>
                    <span style={{verticalAlign: 'middle', fontSize: '1.5em', color: '#00ffa2'}}>Connected</span>
                </div>
            )
        } else {
            return (
                <div>
                    <Button size="lg" appearance="subtle" disabled style={{verticalAlign: 'middle', color: '#9f0000'}}><IoIosWarning color='#ffbe00'/></Button>
                    <span style={{verticalAlign: 'middle', fontSize: '1.5em', color: '#ffbe00'}}>Disconnected</span>
                </div>
            )
        }
    }
}

class Toolbar extends React.Component {

    render() {
        return (
            <div className="toolbarContainer">
                <div className="toolbarLeft">
                    <IconContext.Provider value={{ color: "white", size: "3em" }}>
                        <ConnectedElement isConnected={this.props.isConnected}/>
                    </IconContext.Provider>
                </div>
                <div className="toolbarCenter">
                    <div className="toolbarTextContainer">
                        <div className="toolbarText" style={{padding: '0px'}}>
                            <TrumpIcon which="trumpK" style={{ width: '75%' }}/>
                        </div><div className="toolbarText"><span>Player 1 ist am Zug</span></div>
                    </div>
                </div>                
                <div className="toolbarRight" >
                    <IconContext.Provider value={{ color: "white", size: "3em" }}>
                        {
                            (() => {
                                if (this.props.isFullscreen) {
                                    return (<Button style={{verticalAlign: 'middle'}} onClick={() => { this.props.goFull(false) }} size="lg" appearance="subtle" ><FiMinimize /></Button>)
                                } else {
                                    return (<Button style={{verticalAlign: 'middle'}} onClick={() => { this.props.goFull(true) }} size="lg" appearance="subtle" ><FiMaximize /></Button>)
                                }
                            })()
                        }
                        <Button size="lg" style={{verticalAlign: 'middle'}} appearance="subtle" onClick={() => { this.props.showSettings(true) }}><IoMdSettings /></Button>
                    </IconContext.Provider>
                </div>
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