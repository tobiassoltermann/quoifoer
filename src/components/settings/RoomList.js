import React from 'react';
import {
    Button,
    Table,
    Popover, Whisper,
    Form, FormGroup, FormControl,

} from 'rsuite';

import {
    TiLockOpen,
    TiLockClosed,
} from 'react-icons/ti';

const { Column, HeaderCell, Cell } = Table;

class JoinButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(value, e) {
        var stateObj = {};
        stateObj[e.target.name] = e.target.value;
        this.setState(stateObj);
    }
    render() {
        switch (this.props.protection) {
            case 'passwd':
                return (
                    <Whisper key={"passwd"+this.props.name}
                        trigger="click"
                        placement={'right'}
                        speaker={
                            <Popover>
                                <Form layout="inline">
                                    <FormGroup>
                                        <FormControl placeholder="password" style={{ width: 100 }} onChange={this.handleChange} name="password" value={this.state.password} /><Button appearance="primary" onClick={() => { this.props.handleJoin(this.props.name, this.state.password) }}>Join</Button>
                                    </FormGroup>
                                </Form>
                            </Popover>
                        }
                    >
                        <Button size="xs">Join</Button>
                    </Whisper>
                )
            case 'none':
            default:
                return (
                    <span>
                        <Button size="xs" appearance="ghost" onClick={() => { this.props.handleJoin(this.props.name) }}>Join</Button>
                    </span>
                );
        }
    }
}


class RoomList extends React.Component {

    constructor(props) {
        super(props);
        this.handleJoin = this.handleJoin.bind(this);
    }
    handleJoin(room, password) {
        this.props.handleJoinRequest(room, password);
    }

    render() {

        return (
            <Table autoHeight={true} data={this.props.rooms}>
                <Column width={100} align="left" fixed>
                    <HeaderCell>name</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column width={70} align="center" fixed>
                    <HeaderCell>Players</HeaderCell>
                    <Cell>
                        {rowData => {
                            return (
                                rowData.playerCount + " / " + rowData.playerMax
                            );
                        }}
                    </Cell>
                </Column>
                <Column width={50} align="center" fixed>
                    <HeaderCell><TiLockClosed />/<TiLockOpen /></HeaderCell>
                    <Cell>
                        {rowData => {
                            /*eslint no-unreachable: "off"*/

                            switch (rowData.protection) {
                                case 'passwd':
                                    return (<TiLockClosed />);
                                    break;
                                case 'none':
                                default:
                                    return (<TiLockOpen />);
                                    break;
                            }
                        }}
                    </Cell>
                </Column>
                <Column width={100} align="center" fixed>
                    <HeaderCell>Rules</HeaderCell>
                    <Cell>
                        {rowData => {
                            return (
                                rowData.gameMode
                            );
                        }}
                    </Cell>
                </Column>
                <Column width={100} align="center" fixed>
                    <HeaderCell>Action</HeaderCell>
                    <Cell>
                        {
                            rowData => {
                                return <JoinButton handleJoin={this.handleJoin} name={rowData.name} protection={rowData.protection}/>
                            }
                        }
                    </Cell>
                </Column>
            </Table>
        );
    }

}

export default RoomList;