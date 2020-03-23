import React, {Component} from 'react';
import Fullscreen from "react-full-screen";
import { Alert } from 'rsuite';
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
  }

  goFull(isFull) {
    this.setState({ isFullscreen: isFull });

  }

  showSettings(showSettings) {
    this.setState({ showSettings });
  }

  componentDidMount() {
    console.log("App mount");
    const socket = io(':4000');
    socket.on('connect', () => {
      this.setState({isConnected: true});
      console.log('connect');
      
      Alert.success('Connected to host', 3000);
    })
    socket.on('disconnect', () => {
      this.setState({isConnected: false});
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
    return (
      <Fullscreen
        enabled={this.state.isFullscreen}
        onChange={isFullscreen => this.setState({isFullscreen})}
      >
        <div className="App">
          <SettingsDialog onHide={ ()=>{this.showSettings(false) } } visible={this.state.showSettings} commitChange={(settingsForm)=>{
            localStorage.setItem('localName', settingsForm.localName);
            this.setState({
              localName: settingsForm.localName,
              showSettings: false,
            });
          }}/>
          <div className=""></div>
          <GameboardArea></GameboardArea>
          <footer className="footer">
            <Toolbar isConnected={this.state.isConnected} isFullscreen={this.state.isFullscreen} goFull={this.goFull} showSettings={this.showSettings} />
            <div className="blackEl">
              <OverflowScrolling className='overflow-scrolling'>
                <CardDeck cards={["H6", "K8", "CX", "CK", "CQ", "H7", "C9", "C6", "HK", "C8", "S9", "SX"]}></CardDeck>
              </OverflowScrolling>
            </div>
          </footer>

        </div>
      </Fullscreen>
    );
  }

}
export default App;
