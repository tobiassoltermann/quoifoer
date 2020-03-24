import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    Input,
    List,
    FlexboxGrid,
    Drawer,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    ButtonToolbar,
    HelpBlock,
    Divider,
    Table,
    RadioGroup,
    Radio,
    Tag,
} from 'rsuite';

import {
    TiLockOpen,
    TiLockClosed,
} from 'react-icons/ti';

import './SettingsDialog.css';

import RoomSettings from './components/settings/RoomSettings';

const { Column, HeaderCell, Cell, Pagination } = Table;

class SettingsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localName: this.props.localName,
            createRoomName: "",
            createRoomProtection: 'none',
            createRoomPasswd: '',
            createRoomGamemode: '',
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
        });
    }

    render() {
        return (
            <Drawer onHide={this.props.onHide} show={this.props.visible}>
                <Drawer.Header>
                    <Drawer.Title>Settings</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <Form>
                        <FormGroup>
                            <ControlLabel>Username</ControlLabel>
                            <FormControl style={{ width: 300 }} onChange={this.handleChange} name="localName" value={this.state.localName}/>
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ButtonToolbar>
                                <Button appearance="primary" onClick={this.handleSubmit}>Submit</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                    <Divider />
                    <RoomSettings joinedRoom={this.props.joinedRoom} {...this.props} />
                    <Form layout="inline">
                        <FormGroup>
                            <ControlLabel >Create room:</ControlLabel>
                            <FormControl placeholder="room name" name="createRoomName" onChange={this.handleChange} value={this.state.createRoomName} />
                        </FormGroup>
                        <FormGroup>
                            <RadioGroup name="createRoomGamemode" value={this.state.createRoomGamemode} onChange={this.handleChange} inline appearance="picker">
                                <span className="rulesLabel">Rules: </span>
                                {
                                    (() => {
                                        Object.keys(this.props.availableGamemodes).map( (crtName) => {
                                            return (
                                                <Radio value={crtName} className={"createRoomGamemode" + (this.state.createRoomRules == "none" ? ' createRoomGamemodeSelected' : '') }>{this.props.availableGamemodes.label}</Radio>
                                            )
                                        });
                                    })()
                                }
                                
                                <Radio value="passwd" className={"protectionRadio" + (this.state.createRoomProtection == "passwd" ? ' protectionRadioSelected' : '') }></Radio>
                            </RadioGroup>
                            <FormControl style={{ width: 100, display: this.state.createRoomProtection == "passwd" ? '' : 'none' }} placeholder="password" name="createRoomPasswd" onChange={this.handleChange} value={this.state.createRoomPasswd}/>
                        </FormGroup>
                        <FormGroup>
                            <RadioGroup name="createRoomProtection" value={this.state.createRoomProtection} onChange={this.handleChange} inline appearance="picker">
                                <span className="protectionLabel">Protection: </span>
                                <Radio value="none" className={"protectionRadio" + (this.state.createRoomProtection == "none" ? ' protectionRadioSelected' : '') }><TiLockOpen /></Radio>
                                <Radio value="passwd" className={"protectionRadio" + (this.state.createRoomProtection == "passwd" ? ' protectionRadioSelected' : '') }><TiLockClosed /></Radio>
                            </RadioGroup>
                            <FormControl style={{ width: 100, display: this.state.createRoomProtection == "passwd" ? '' : 'none' }} placeholder="password" name="createRoomPasswd" onChange={this.handleChange} value={this.state.createRoomPasswd}/>
                        </FormGroup>
                        <Button appearance="primary" onClick={this.handleCreate}>Create</Button>
                    </Form>
                </Drawer.Body>
                <Drawer.Footer>

                </Drawer.Footer>
            </Drawer>
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