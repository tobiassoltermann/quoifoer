import React, { Component } from 'react';
import Fullscreen from "react-full-screen";
import {
  Alert,
  List
} from 'rsuite';

import OverflowScrolling from 'react-overflow-scrolling';

import io from 'socket.io-client';

import './App.css';
import 'rsuite/dist/styles/rsuite-dark.css';


import CardDeck from './CardDeck';
import SettingsDialog from './SettingsDialog';
import Toolbar from './Toolbar';
import GameboardArea from './GameboardArea';

/*
  yarn start
*/


class App extends Component {
  constructor() {
    super();
    this.state = {
      localName: localStorage.getItem('localName'),
      showSettings: false,
      isFullscreen: false,
      isConnected: false,
      debugInfo: { a: 'b' },
      roomList: [],
      joinedRoom: null,
      availableGamemodes: [],



    };

    this.goFull = this.goFull.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.handleJoinRequest = this.handleJoinRequest.bind(this);
    this.handleLeaveRequest = this.handleLeaveRequest.bind(this);
    this.handleAddRoomRequest = this.handleAddRoomRequest.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
  }

  goFull(isFull) {
    this.setState({ isFullscreen: isFull });

  }

  showSettings(showSettings) {
    this.setState({ showSettings });
  }

  onChangeName(newName) {
    this.setState({
      localName: newName,
    }, () => {
      localStorage.setItem('localName', newName);
      this.notifyName();
    });
  }
  notifyName() {
    this.socket.emit('providename', this.state.localName);
  }

  handleAddRoomRequest(roomDetails) {
    this.socket.emit('createRoom', roomDetails, (result) => {
      if (result.status) {
        Alert.success('Room created', 2000);
      } else {
        Alert.error('Could not create room: ' + result.message, 2000);
      }
    });
  }

  handleJoinRequest(roomName) {
    this.socket.emit('joinRoom', roomName, (confirmation, roomDetails) => {
      if (confirmation.status) {
        this.setState({
          joinedRoom: roomName,
          gameMode: roomDetails.gameMode,
        });
        Alert.success('Joined room', 2000);

      } else {
        Alert.error('Could not join room: ' + confirmation.message, 5000);
      }
      console.log(confirmation);
    });
  }
  handleLeaveRequest(roomName) {
    console.log("handleLeaveRequest");
    this.socket.emit('leaveRoom', roomName, (confirmation) => {

      if (confirmation) {
        this.setState({
          joinedRoom: null
        });
        this.socket.off('gameupdate');
      }
      console.log(confirmation);
    });
    console.log('after send leave');
  }

  handleGameUpdate(roomData) {
    /*this.setState({
      gameMode: 
    })*/
  }

  componentDidMount() {
    this.socket = io(':4000');
    this.socket.on('connect', () => {
      this.setState({ isConnected: true });
      Alert.success('Connected to host', 3000);

      if (this.state.localName != null) {
        this.notifyName();
      }
    })
    this.socket.on('disconnect', () => {
      this.setState({ isConnected: false });
      Alert.error('Disconnected', 2000);
    })

    this.socket.on('debugInfo', (message) => {
      this.setState({
        debugInfo: message
      })
    })

    this.socket.on('gameupdate', () => {
      //this.handleJoinInit(roomData);
    });

    this.socket.on('rooms', (roomList) => {
      console.log('rooms', roomList);
      this.setState({
        roomList,
      });
    });

    this.socket.on('offered-gamemodes', (availableGamemodes) => {
      console.log(availableGamemodes);
      this.setState({
        availableGamemodes
      })
    })
  }
  render() {

    let scoreLines = [
      {
        icon: 'trumpC',
        scoreTeam1: 100,
        scoreTeam2: 57,
      },
      {
        icon: 'trumpH',
        scoreTeam1: 100,
        scoreTeam2: 57,
      },
      {
        icon: 'trumpS',
        scoreTeam1: 100,
        scoreTeam2: 57,
      },
      {
        icon: 'trumpK',
        scoreTeam1: 100,
        scoreTeam2: 57,
      },
      {
        icon: 'trumpD',
        scoreTeam1: 100,
        scoreTeam2: 57,
      },
      {
        icon: 'trumpU',
        scoreTeam1: 100,
        scoreTeam2: 57,
      },
      {
        icon: 'trumpA',
        scoreTeam1: 100,
        scoreTeam2: 57,
      },
      {
        icon: 'trumpT',
        scoreTeam1: 100,
        scoreTeam2: 57,
      },
      {
        icon: 'trump3',
        scoreTeam1: 100,
        scoreTeam2: 57,
      },
      {
        icon: 'trumpJ',
        scoreTeam1: 100,
        scoreTeam2: 57,
      },
    ];
    let scores = {
      scoreLines,
      totalTeam1: 2000,
      totalTeam2: 1500,
      team1Name: 'Team 1',
      team2Name: 'Team 2',
      mode: "Coiffeur",
    }
    var boardSetup = {
      s: {
        playerName: "Player 1",
        card: "H6"
      },
      e: {
        playerName: "Player 2",
        card: "S7"
      },
      n: {
        playerName: "Player 3",
        card: "K8"
      },
      w: {
        playerName: "Player 4",
        card: "C9"
      },
    }

    var cardsHand = [
      {
        "card": "H6",
        "playable": false
      },
      {
        "card": "K8",
        "playable": false
      },
      {
        "card": "CX",
        "playable": false
      },
      {
        "card": "CK",
        "playable": false
      },
      {
        "card": "CQ",
        "playable": false
      },
      {
        "card": "S9",
        "playable": true
      },
      {
        "card": "SX",
        "playable": true
      },
      {
        "card": "H7",
        "playable": false
      },
      {
        "card": "C9",
        "playable": false
      },
      {
        "card": "C6",
        "playable": false
      },
      {
        "card": "HK",
        "playable": false
      },
      {
        "card": "C8",
        "playable": false
      },

    ];

    return (
      <Fullscreen
        enabled={this.state.isFullscreen}
        onChange={isFullscreen => this.setState({ isFullscreen })}
      >
        <div className="App">
          <div style={{ position: 'absolute', borderRadius: '10px', top: 10, left: 10, padding: '10px', fontSize: '8px', backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 1000000, color: 'white' }}>
            <p style={{ fontWeight: 'bold' }}>Debug:</p>
            <pre>{JSON.stringify(this.state.debugInfo, undefined, 2)}</pre>
          </div>
          
          <div style={{position: 'absolute', left: '0', right: '0', width: '100%'}}>
          {
            (function() {
              //this.state.gameMode='coiffeur';
              //if (this.state.gameMode == null) {
              if (this.state.joinedRoom == null) {
                return <SettingsDialog
                localName={this.state.localName}
                handleAddRoomRequest={this.handleAddRoomRequest}
                handleJoinRequest={this.handleJoinRequest}
                roomList={this.state.roomList}
                onHide={() => { this.showSettings(false) }}
                visible={this.state.showSettings}
                joinedRoom={this.state.joinedRoom}
                availableGamemodes={this.state.availableGamemodes}
                commitChange={(settingsForm) => {
                  this.onChangeName(settingsForm.localName)
                }}
              />
              } else {
                return <GameboardArea roomName={this.state.joinedRoom} handleLeave={this.handleLeaveRequest} scores={scores} gameMode={this.state.gameMode} roomMode={this.state.roomMode} boardSetup={boardSetup}></GameboardArea>
              }
            }).bind(this)()
          }
          </div>

          <footer className="footer">
            <Toolbar isConnected={this.state.isConnected} isFullscreen={this.state.isFullscreen} goFull={this.goFull} showSettings={this.showSettings} />
            <div className=""></div>
            {
              (() => {
                if (this.state.gameMode != null) {
                  return (
                    <div className="blackEl">
                      <OverflowScrolling className='overflow-scrolling'>
                        <CardDeck cards={cardsHand}></CardDeck>
                      </OverflowScrolling>
                    </div>
                  );
                } else{
                  return null;
                }
              }).bind(this)()
            }
          </footer>

        </div>
      </Fullscreen>
    );
  }
/*
  settingsInForms() {
    return (
      <div>
        <Form>
          <FormGroup>
            <ControlLabel>Username</ControlLabel>
            <FormControl style={{ width: 300 }} onChange={this.handleChange} name="localName" value={this.state.localName} />
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
            <FormControl style={{ width: 100 }} placeholder="room name" name="createRoomName" onChange={this.handleChange} value={this.state.createRoomName} />
          </FormGroup>
          <FormGroup>
            <RadioGroup name="createRoomGamemode" value={this.state.createRoomGamemode} onChange={this.handleChange} inline appearance="picker">
              <span className="rulesLabel">Rules: </span>
              {
                (() => {
                  return Object.keys(this.props.availableGamemodes).map((crtName) => {
                    return (
                      <Radio value={crtName} className={"createRoomGamemode" + (this.state.createRoomGamemode == crtName ? ' createRoomGamemodeSelected' : '')}>{this.props.availableGamemodes[crtName].label}</Radio>
                    )
                  });
                })()
              }
            </RadioGroup>
          </FormGroup>
          <FormGroup>
            <RadioGroup name="createRoomProtection" value={this.state.createRoomProtection} onChange={this.handleChange} inline appearance="picker">
              <span className="protectionLabel">Protection: </span>
              <Radio value="none" className={"protectionRadio" + (this.state.createRoomProtection == "none" ? ' protectionRadioSelected' : '')}><TiLockOpen /></Radio>
              <Radio value="passwd" className={"protectionRadio" + (this.state.createRoomProtection == "passwd" ? ' protectionRadioSelected' : '')}><TiLockClosed /></Radio>
            </RadioGroup>
            <FormControl style={{ width: 100, display: this.state.createRoomProtection == "passwd" ? '' : 'none' }} placeholder="password" name="createRoomPasswd" onChange={this.handleChange} value={this.state.createRoomPasswd} />
          </FormGroup>
          <Button appearance="primary" onClick={this.handleCreate}>Create</Button>
        </Form>
      </div>
    );
  }
*/
}
export default App;
