import React, {Component} from 'react';
import {
    Button,
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
                            return (
                                rowData.protection ? <TiLockClosed /> : <TiLockOpen />
                            );
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

export default RoomList;