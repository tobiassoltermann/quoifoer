import React, { Component } from 'react';
import Fullscreen from "react-full-screen";
import {
  Alert,
} from 'rsuite';

import OverflowScrolling from 'react-overflow-scrolling';

import io from 'socket.io-client';

import './App.css';
import 'rsuite/dist/styles/rsuite-dark.css';


import CardDeck from './CardDeck';
import SettingsDialog from './SettingsDialog';
import Toolbar from './Toolbar';
import GameboardArea from './GameboardArea';

import CoiffeurRules from './components/rules/CoiffeurRules';

/*
  yarn start
*/

function GameRuleResolver(gameMode) {
  switch (gameMode) {
    case 'coiffeur':
      return CoiffeurRules;
    default:
      return null;
  }
}

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
      
      seatingState: {},
    };

    this.goFull = this.goFull.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.handleJoinRequest = this.handleJoinRequest.bind(this);
    this.handleLeaveRequest = this.handleLeaveRequest.bind(this);
    this.handleAddRoomRequest = this.handleAddRoomRequest.bind(this);
    this.onChangeName = this.onChangeName.bind(this);

    this.gameRuleImplementation = null;
    this.specificProps = null;
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

  handleJoinRequest(roomName, password) {
    this.socket.emit('joinRoom', { name: roomName, password: password}, (confirmation, roomDetails) => {
      if (confirmation.status) {
        this.setState({
          joinedRoom: roomName,
          gameMode: roomDetails.gameMode,
        }, () => {
          var _GameruleImplementationClass_ = GameRuleResolver(this.state.gameMode);
          this.gameRuleImplementation = new _GameruleImplementationClass_(this.setState.bind(this), this.socket, () => {
            this.specificProps = this.gameRuleImplementation.getSpecificProps();
            this.gameRuleImplementation.onStart();
          });
          
        });
        Alert.success('Joined room', 2000);

      } else {
        Alert.error('Could not join room: ' + confirmation.message, 5000);
      }
    });
  }
  handleLeaveRequest(roomName) {
    this.socket.emit('leaveRoom', roomName, (confirmation) => {

      if (confirmation) {
        this.setState({
          joinedRoom: null
        });
        this.socket.off('gameupdate');
      }
    });
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
      this.setState({
        roomList,
      });
    });

    this.socket.on('offered-gamemodes', (availableGamemodes) => {
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

    var {joinedRoom, debugInfo, isFullscreen, localName, roomList, showSettings, availableGamemodes, gameMode, isConnected, boardSetup} = this.state;
    return (

      <Fullscreen
        enabled={isFullscreen}
        onChange={isFullscreen => this.setState({ isFullscreen })}
      >
        <div className="App">
          <div style={{ position: 'absolute', borderRadius: '10px', top: 10, left: 10, padding: '10px', fontSize: '8px', backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 1000000, color: 'white' }}>
            <p style={{ fontWeight: 'bold' }}>Debug:</p>
            <pre>{JSON.stringify(debugInfo, undefined, 2)}</pre>
          </div>
          
          <div style={{position: 'absolute', left: '0', right: '0', width: '100%'}}>
          {
            (function() {
              if (joinedRoom == null) {
                return <SettingsDialog
                localName={localName}
                handleAddRoomRequest={this.handleAddRoomRequest}
                handleJoinRequest={this.handleJoinRequest}
                roomList={roomList}
                onHide={() => { this.showSettings(false) }}
                visible={showSettings}
                joinedRoom={joinedRoom}
                availableGamemodes={availableGamemodes}
                commitChange={(settingsForm) => {
                  this.onChangeName(settingsForm.localName)
                }}
              />
              } else {
                return <GameboardArea roomName={joinedRoom} handleLeave={this.handleLeaveRequest} scores={scores} gameMode={gameMode} boardSetup={boardSetup} {...this.specificProps}></GameboardArea>
              }
            }).bind(this)()
          }
          </div>

          <footer className="footer">
            <Toolbar isConnected={isConnected} isFullscreen={isFullscreen} goFull={this.goFull} showSettings={this.showSettings} />
            <div className=""></div>
            {
              (() => {
                if (gameMode != null) {
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
              })()
            }
          </footer>

        </div>
      </Fullscreen>
    );
  }
}
export default App;
