import React, { Component } from 'react';
import Fullscreen from "react-full-screen";
import {
  Alert,
  List
} from 'rsuite';

import OverflowScrolling from 'react-overflow-scrolling';

import io from 'socket.io-client';

import './App.css';
import 'rsuite/dist/styles/rsuite-default.css';

import CardDeck from './CardDeck';
import SettingsDialog from './SettingsDialog';
import Toolbar from './Toolbar';
import GameboardArea from './GameboardArea';

/*
  yarn start
*/

/**
 * WHY get availableGamemodes multiple times????
 */

class App extends Component {
  constructor() {
    super();
    this.state = {
      localName: localStorage.getItem('localName'),
      showSettings: false,
      isFullscreen: false,
      isConnected: false,
      debugInfo: { a: 'b'},
      roomList: [],
      joinedRoom: null,
      availableGamemodes: [],
    };

    this.goFull = this.goFull.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.handleJoinRequest = this.handleJoinRequest.bind(this);
    this.handleLeaveRequest = this.handleLeaveRequest.bind(this);
    this.handleAddRoomRequest = this.handleAddRoomRequest.bind(this);
  }

  goFull(isFull) {
    this.setState({ isFullscreen: isFull });

  }

  showSettings(showSettings) {
    this.setState({ showSettings });
  }

  handleAddRoomRequest(roomDetails) {
    console.log(roomDetails);
    this.socket.emit('createRoom', roomDetails);
  }

  handleJoinRequest(roomName) {
    this.socket.emit('joinRoom', roomName, (confirmation) => {
      if (confirmation) {
        this.setState({
          joinedRoom: roomName
        });
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
      }
      console.log(confirmation);
    });
    console.log('after send leave');
  }

  componentDidMount() {
    console.log("App mount");
    this.socket = io(':4000');
    this.socket.on('connect', () => {
      this.setState({ isConnected: true });
      console.log('connect');

      Alert.success('Connected to host', 3000);
    })
    this.socket.on('disconnect', () => {
      this.setState({ isConnected: false });
      Alert.error('Disconnected', 2000);
    })
    this.socket.on('debugInfo', (message)=>{
      this.setState({
        debugInfo: message
      })
    })
    this.socket.on('hello', () => {
      console.log("Hello to room");
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
    console.log("availableGamemodes", this.state.availableGamemodes)
    return (
      <Fullscreen
        enabled={this.state.isFullscreen}
        onChange={isFullscreen => this.setState({ isFullscreen })}
      >
        <div className="App">
          <div style={{ position: 'absolute', borderRadius: '10px', top: 10, left: 10, padding: '10px', fontSize: '8px', backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 1000000, color: 'white'}}>
            <p style={{ fontWeight: 'bold'}}>Debug:</p>
            <pre>{ JSON.stringify(this.state.debugInfo, undefined, 2) }</pre>
          </div>
          <SettingsDialog
            localName={this.state.localName}
            handleAddRoomRequest={this.handleAddRoomRequest}
            handleJoinRequest={this.handleJoinRequest}
            handleLeaveRequest={this.handleLeaveRequest}
            roomList={this.state.roomList}
            onHide={() => { this.showSettings(false) }}
            visible={this.state.showSettings}
            joinedRoom={this.state.joinedRoom}
            availableGamemodes={this.state.availableGamemodes}
            commitChange={(settingsForm) => {
              localStorage.setItem('localName', settingsForm.localName);
              this.setState({
                localName: settingsForm.localName,
                showSettings: false,
              });
            }}
          />
          <div className=""></div>
          <GameboardArea scores={scores} boardSetup={boardSetup}></GameboardArea>
          <footer className="footer">
            <Toolbar isConnected={this.state.isConnected} isFullscreen={this.state.isFullscreen} goFull={this.goFull} showSettings={this.showSettings} />
            <div className=""></div>
            <div className="blackEl">
              <OverflowScrolling className='overflow-scrolling'>
                <CardDeck cards={cardsHand}></CardDeck>
              </OverflowScrolling>
            </div>
          </footer>

        </div>
      </Fullscreen>
    );
  }

}
export default App;
