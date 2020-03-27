import React, {Component} from 'react';

import {
    Form,
    FormGroup,
    Divider,
    ControlLabel,
    Button,
    Tag,
} from 'rsuite';

import RoomList from './RoomList';

class RoomSettings extends React.Component {
    constructor(props) {
        super(props);
        console.log("RoomSettings", this.props);
        this.handleLeave = this.handleLeave.bind(this);
    }

    handleLeave() {
        console.log("handleLeave");
        console.log(this.props);
        this.props.handleLeaveRequest(this.props.joinedRoom);
    }

    render() {
        if (this.props.joinedRoom == null) {
            return (
                <Form>
                    <FormGroup>
                        <ControlLabel>Rooms</ControlLabel>
                        {
                            (() => {
                                if (this.props.roomList.length > 0) {
                                    return <RoomList handleJoinRequest={this.props.handleJoinRequest} rooms={this.props.roomList} style={{ width: '80%', textAlign: 'center' }}></RoomList>
                                } else {
                                    return <div style={{width: '100%', padding: '10px', backgroundColor: '#1a1d24', borderRadius: '6px'}}>No rooms created yet</div>;
                                }
                            }).bind(this)()
                        }
                    </FormGroup>
                    <Divider />
                </Form>
            );
        } else {
            return (
                <Form>
                    <FormGroup>
                        <ControlLabel>Rooms</ControlLabel>
                        <ControlLabel>You're connected to room <Tag>{this.props.joinedRoom}</Tag></ControlLabel>
                        <Button appearance="primary" onClick={this.handleLeave}>Leave</Button>
                    </FormGroup>
                    <Divider />
                </Form>
            )
        };
    }
}

export default RoomSettings;