import React from 'react';

import {
    Form,
    FormGroup,
    Divider,
    ControlLabel,
} from 'rsuite';

import RoomList from './RoomList';

class RoomSettings extends React.Component {
    constructor(props) {
        super(props);
        this.handleLeave = this.handleLeave.bind(this);
    }

    handleLeave() {
        this.props.handleLeaveRequest(this.props.joinedRoom);
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <ControlLabel>Rooms</ControlLabel>
                    {
                        (() => {
                            if (this.props.roomList.length > 0) {
                                return <RoomList handleJoinRequest={this.props.handleJoinRequest} rooms={this.props.roomList} style={{ width: '80%', textAlign: 'center' }}></RoomList>
                            } else {
                                return <div style={{ width: '100%', padding: '10px', backgroundColor: '#1a1d24', borderRadius: '6px' }}>No rooms created yet</div>;
                            }
                        })()
                    }
                </FormGroup>
                <Divider />
            </Form>
        );
    }
}

export default RoomSettings;