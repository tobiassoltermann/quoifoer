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

} from 'rsuite';

import {
    TiLockOpen,
    TiLockClosed,
} from 'react-icons/ti';

const { Column, HeaderCell, Cell, Pagination } = Table;

class RoomList extends React.Component {

    constructor(props) {
        super(props);
        this.handleJoin = this.handleJoin.bind(this);
    }
    handleJoin(room) {
        this.props.handleJoinRequest(room);
    }
    render() {
        return (
            <Table
                autoHeight={true}
                data={this.props.rooms}
                onRowClick={data => {
                    console.log(data);
                }}
            >
                <Column width={200} align="left" fixed>
                    <HeaderCell>name</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column width={50} align="center" fixed>
                    <HeaderCell>Players</HeaderCell>
                    <Cell>
                        {rowData => {
                            return (
                                rowData.playerCount + " / 4"
                            );
                        }}
                    </Cell>
                </Column>
                <Column width={50} align="center" fixed>
                    <HeaderCell>Protected</HeaderCell>
                    <Cell>
                        {rowData => {
                            return (
                                rowData.passwd ? <TiLockClosed /> : <TiLockOpen />
                            );
                        }}
                    </Cell>
                </Column>
                <Column width={100} align="center" fixed>
                    <HeaderCell>Action</HeaderCell>
                    <Cell>
                        {rowData => {
                            return (
                                <span>
                                    <Button size="xs" appearance="ghost" onClick={() => { this.handleJoin(rowData.name) }}>Join</Button>
                                </span>
                            );
                        }}
                    </Cell>
                </Column>
            </Table>
        );
    }

}
const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px'
};


class SettingsDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(value, i) {
        this.setState({
            localName: value
        });
    }
    handleSubmit(e) {
        this.props.commitChange({
            localName: this.state.localName
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
                            <FormControl style={{ width: 300 }} onChange={this.handleChange} name="name" />
                            <HelpBlock>Required</HelpBlock>
                        </FormGroup>
                        <FormGroup>
                            <ButtonToolbar>
                                <Button appearance="primary" onClick={this.handleSubmit}>Submit</Button>
                                <Button appearance="default" onClick={this.props.onHide}>Cancel</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                    <Divider />
                    <Form>
                        <FormGroup>
                            <ControlLabel>Choose room</ControlLabel>
                            <RoomList handleJoinRequest={this.props.handleJoinRequest} rooms={this.props.roomList} style={{ width: '80%', textAlign: 'center' }}></RoomList>
                        </FormGroup>
                        <Divider />
                    </Form>
                    <Form layout="inline">
                        <FormGroup>
                            <ControlLabel >Create room:</ControlLabel>
                            <FormControl placeholder="room name" name="roomName" />
                        </FormGroup>
                        <Button>Create</Button>
                    </Form>‚
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