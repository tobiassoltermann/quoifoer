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

const CLIENT_VERSION = 1.3;
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
      localNameSalt: localStorage.getItem('localNameSalt'),
      showSettings: false,
      isFullscreen: false,
      isConnected: false,
      debugInfo: { a: 'b' },
      roomList: [],
      joinedRoom: null,
      availableGamemodes: [],

      gameRuleSpecific: {},
      statusText: {
        label: "Hello World",
        icon: "trumpH",
        visible: true
      },
      unlockAllCards: false,
    };

    this.goFull = this.goFull.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.handleJoinRequest = this.handleJoinRequest.bind(this);
    this.handleLeaveRequest = this.handleLeaveRequest.bind(this);
    this.handleAddRoomRequest = this.handleAddRoomRequest.bind(this);
    this.handleUnlockAllCards = this.handleUnlockAllCards.bind(this);
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

  getNameSalt(name) {
    function hashCode(str) {
      var hash = 0;
      if (str.length == 0) {
        return hash;
      }
      for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    }

    return hashCode( name + new Date().toISOString() );
  }

  onChangeName(newName) {
    const localNameSalt = this.getNameSalt(newName);

    this.setState({
      localName: newName,
      localNameSalt: localNameSalt,
    }, () => {
      localStorage.setItem('localName', newName);
      localStorage.setItem('localNameSalt', localNameSalt);
      this.notifyName();
    });
  }
  
  notifyName() {
    this.socket.emit('providename', this.state.localName, this.state.localNameSalt);
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
    this.socket.emit('joinRoom', { name: roomName, password: password }, (confirmation, roomDetails) => {
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

  handleUnlockAllCards() {
    this.setState({
      unlockAllCards: true
    });

    setTimeout( (() => {
      this.setState({
        unlockAllCards: false
      });
    }).bind(this), 3000);
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

    this.socket.on('serverinfo', (serverinfo) => {
      this.setState({
        SERVER_VERSION: serverinfo.SERVER_VERSION
      });
    })
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

    var { joinedRoom, debugInfo, isFullscreen, localName, roomList, showSettings, availableGamemodes, gameMode, isConnected, gameRuleSpecific, statusText, unlockAllCards } = this.state;
    var { cardDeck } = gameRuleSpecific;
    return (

      <Fullscreen
        enabled={isFullscreen}
        onChange={isFullscreen => this.setState({ isFullscreen })}
      >
        <div className="App">
          {/*
            <div style={{ position: 'absolute', borderRadius: '10px', top: 10, left: 10, padding: '10px', fontSize: '8px', backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 1000000, color: 'white' }}>
              <p style={{ fontWeight: 'bold' }}>Debug:</p>
              <pre>{JSON.stringify(debugInfo, undefined, 2)}</pre>
            </div>
          */}
          <div style={{ position: 'absolute', top: 10, left: 10, padding: '10px', fontSize: '10px', zIndex: 1000000, color: 'white' }}>
            <p style={{ fontWeight: 'bold' }}>Version:<br/>
            Client: { CLIENT_VERSION }<br/>
            Server: { this.state.SERVER_VERSION }</p>
          </div>

          <div style={{ position: 'absolute', left: '0', right: '0', width: '100%' }}>
            {
              (function () {
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
                  return <GameboardArea roomName={joinedRoom} handleLeave={this.handleLeaveRequest} gameMode={gameMode} gameRuleSpecific={gameRuleSpecific} {...this.specificProps}></GameboardArea>
                }
              }).bind(this)()
            }
          </div>

          <footer className="footer">
            <Toolbar isConnected={isConnected} isFullscreen={isFullscreen} goFull={this.goFull} showSettings={this.showSettings} statusText={statusText} />
            <div className=""></div>
            {
              (() => {
                if (gameMode != null) {
                  return (
                    <div className="blackEl">
                      <OverflowScrolling className='overflow-scrolling'>
                        <CardDeck cards={cardDeck} handleUnlockAll={this.handleUnlockAllCards} unlockAllCards={unlockAllCards} {...this.specificProps}></CardDeck>
                      </OverflowScrolling>
                    </div>
                  );
                } else {
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
