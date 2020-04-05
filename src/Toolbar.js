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

class MessageBar extends React.Component {

    renderIcon(icon) {
        if (icon) {
            return <TrumpIcon which={ icon } style={{ width: '75%' }}/>;
        } else {
            return null;
        }
    }
    render() {
        const { visible, icon, label, highlight } = this.props;
        if (visible) {
            const actualClassname = highlight == true ? "toolbarTextContainerHighlight" : "toolbarTextContainer";
            return   (
                <div className={actualClassname}>
                    <div className="toolbarText" style={{padding: '0px'}}>
                        {
                            this.renderIcon(icon)
                        }
                    </div><div className="toolbarText"><span>{ label }</span></div>
                </div>
            )
        } else {
            return null;
        }
    }
}

class Toolbar extends React.Component {

    render() {
        var { isConnected, isFullscreen, goFull, showSettings, statusText} = this.props;
        return (
            <div className="toolbarContainer">
                <div className="toolbarLeft">
                    <IconContext.Provider value={{ color: "white", size: "3em" }}>
                        <ConnectedElement isConnected={isConnected}/>
                    </IconContext.Provider>
                </div>
                <div className="toolbarCenter">
                    <MessageBar {...statusText}></MessageBar>
                </div>                
                <div className="toolbarRight" >
                    <IconContext.Provider value={{ color: "white", size: "3em" }}>
                        {
                            (() => {
                                if (isFullscreen) {
                                    return (<Button style={{verticalAlign: 'middle'}} onClick={() => { goFull(false) }} size="lg" appearance="subtle" ><FiMinimize /></Button>)
                                } else {
                                    return (<Button style={{verticalAlign: 'middle'}} onClick={() => { goFull(true) }} size="lg" appearance="subtle" ><FiMaximize /></Button>)
                                }
                            })()
                        }
                        <Button size="lg" style={{verticalAlign: 'middle'}} appearance="subtle" onClick={() => { showSettings(true) }}><IoMdSettings /></Button>
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