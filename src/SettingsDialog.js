import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    RadioGroup,
    Radio,
} from 'rsuite';

import {
    TiLockOpen,
    TiLockClosed,
} from 'react-icons/ti';

import './SettingsDialog.css';

import RoomSettings from './components/settings/RoomSettings';

class SettingsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localName: this.props.localName,
            createRoomName: "",
            createRoomProtection: 'none',
            createRoomPasswd: '',
            createRoomGamemode: 'coiffeur',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleChange(value, e) {
        var stateObj = {};
        switch (e.target.name) {
            case "createRoomProtection":
            case "createRoomGamemode":
                stateObj[e.target.name] = value;
                break;
            default:
                stateObj[e.target.name] = e.target.value;
        }

        this.setState(stateObj);
    }
    handleSubmit(e) {
        this.props.commitChange({
            localName: this.state.localName
        });
    }
    handleCreate() {
        this.props.handleAddRoomRequest({
            name: this.state.createRoomName,
            protection: this.state.createRoomProtection,
            passwd: this.state.createRoomPasswd,
            gameMode: this.state.createRoomGamemode,
        });
    }

    render() {
        return (
            <div style={{padding: '20px', height: '70vh', overflow: 'auto'}}>
                <div style={{ textAlign: 'center' }} className="settingsDialog">

                    <Form layout="inline">
                        <FormGroup>
                            <ControlLabel>Username</ControlLabel><FormControl placeholder="Username" style={{ width: 150 }} onChange={this.handleChange} name="localName" value={this.state.localName} /><Button appearance="primary" onClick={this.handleSubmit}>Submit</Button>
                        </FormGroup>
                    </Form>
                    <RoomSettings joinedRoom={this.props.joinedRoom} {...this.props} />
                    <Form layout="inline">
                        <FormGroup>
                            <ControlLabel >Create room:</ControlLabel>
                            <FormControl style={{ width: 100 }} placeholder="room name" name="createRoomName" onChange={this.handleChange} value={this.state.createRoomName} />
                        </FormGroup>
                        <FormGroup>
                            <RadioGroup style={{backgroundColor: '#1a1d24'}} name="createRoomGamemode" value={this.state.createRoomGamemode} onChange={this.handleChange} inline appearance="picker">
                                <span className="rulesLabel">Rules: </span>
                                {
                                    (() => {
                                        return Object.keys(this.props.availableGamemodes).map((crtName) => {
                                            return (
                                                <Radio key={crtName} value={crtName} className={"createRoomGamemode" + (this.state.createRoomGamemode === crtName ? ' createRoomGamemodeSelected' : '')}>{this.props.availableGamemodes[crtName].label}</Radio>
                                            )
                                        });
                                    })()
                                }
                            </RadioGroup>
                        </FormGroup>
                        <FormGroup>
                            <RadioGroup style={{backgroundColor: '#1a1d24'}} name="createRoomProtection" value={this.state.createRoomProtection} onChange={this.handleChange} inline appearance="picker">
                                <span className="protectionLabel">Protection: </span>
                                <Radio value="none" className={"protectionRadio" + (this.state.createRoomProtection === "none" ? ' protectionRadioSelected' : '')}><TiLockOpen /></Radio>
                                <Radio value="passwd" className={"protectionRadio" + (this.state.createRoomProtection === "passwd" ? ' protectionRadioSelected' : '')}><TiLockClosed /></Radio>
                            </RadioGroup>
                            <FormControl style={{ width: 100, display: this.state.createRoomProtection === "passwd" ? '' : 'none' }} placeholder="password" name="createRoomPasswd" onChange={this.handleChange} value={this.state.createRoomPasswd} />
                        </FormGroup>
                        <Button appearance="primary" onClick={this.handleCreate}>Create</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

SettingsDialog.propTypes = {
    visible: PropTypes.bool,
    commitChange: PropTypes.func,
    onHide: PropTypes.func,
    handleJoinRequest: PropTypes.func,
    roomsList: PropTypes.array,
};


export default SettingsDialog;