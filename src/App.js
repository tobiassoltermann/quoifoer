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

class App extends Component {
  constructor() {
    super();
    this.state = {
      localName: localStorage.getItem('localName'),
      showSettings: false,
      isFullscreen: false,
      isConnected: false,
    };

    this.goFull = this.goFull.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.handleJoinRequest = this.handleJoinRequest.bind(this);
  }

  goFull(isFull) {
    this.setState({ isFullscreen: isFull });

  }

  showSettings(showSettings) {
    this.setState({ showSettings });
  }

  handleJoinRequest(room) {
    alert('Join: ' + room);
  }

  componentDidMount() {
    console.log("App mount");
    const socket = io(':4000');
    socket.on('connect', () => {
      this.setState({ isConnected: true });
      console.log('connect');

      Alert.success('Connected to host', 3000);
    })
    socket.on('disconnect', () => {
      this.setState({ isConnected: false });
      Alert.error('Disconnected', 2000);
    })
    socket.on('needname', (message) => {
      console.log('needname');
      if (this.state.localName == null) {
        this.setState({
          showSettings: true
        });
      } else {
        socket.emit("providename", this.state.localName);
      }
    });
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

    let roomList = [
        {
            name: 'Super Sach',
            playerCount: 3,
            passwd: false,
        },
        {
            name: 'secret game',
            playerCount: 1,
            passwd: true,
        }
    ];


    return (
      <Fullscreen
        enabled={this.state.isFullscreen}
        onChange={isFullscreen => this.setState({ isFullscreen })}
      >
        <div className="App">
          <SettingsDialog handleJoinRequest={this.handleJoinRequest} roomList={roomList} onHide={() => { this.showSettings(false) }} visible={this.state.showSettings} commitChange={(settingsForm) => {
            localStorage.setItem('localName', settingsForm.localName);
            this.setState({
              localName: settingsForm.localName,
              showSettings: false,
            });
          }} />
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
