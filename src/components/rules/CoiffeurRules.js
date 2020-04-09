import {
    Alert,
  } from 'rsuite';
  

class CoiffeurRules {

    constructor(globalSetState, client, initDone) {
        this.globalSetState = globalSetState;
        this.setState = this.setState.bind(this);
        this.client = client;

        this.localState = {
/*            playerNames: {
                S: "Player 1",
                E: "Player 2",
                N: "Player 3",
                W: "Player 4",
            },
            tableCards: {
                S: "H6",
                E: "S7",
                N: "K8",
                W: "C9",
            },*/
            playerNames: {
                S: null,
                E: null,
                N: null,
                W: null,
            },
            tableCards: {
                S: null,
                E: null,
                N: null,
                W: null,
            },
            mySeat: 1,
        };

        this.globalSetState(this.localState, initDone);

    }

    setState(additionalState, callback) {
        this.localState = Object.assign(this.localState, additionalState);
        this.globalSetState({
            gameRuleSpecific: this.localState,
        }, callback);
    }
    getSpecificProps() {
        return {
            requestSeat: this.requestSeat.bind(this),
            requestUnseat: this.requestUnseat.bind(this),
            requestSelectTrick: this.requestSelectTrick.bind(this),
            requestPushNext: this.requestPushNext.bind(this),
            requestPlayCard: this.requestPlayCard.bind(this),
        }
    }

    requestSeat(seat) {
        console.log("requestSeat", seat);
        this.client.emit('coiffeur-seat', seat, (response) => {
            console.log("requestSeat response:", response);
        });
    }
    requestUnseat() {
        this.client.emit('coiffeur-unseat', (response) => {
            console.log("requestUnseat response:", response);
        });
    }

    requestSelectTrick(multiplier) {
        console.log("selectTrick: ", multiplier);
        this.client.emit('coiffeur-selecttrick', multiplier, (response) => {
            
        })
    }

    requestPushNext() {
        console.log("player pushs");
        this.client.emit('coiffeur-selectpush', (response) => {
        })
    }
    
    requestPlayCard(cardName) {
        console.log("player play card", cardName);
        this.client.emit('coiffeur-playcard', cardName, (result) => {
            if (result.status === false) {
                Alert.error('Could not play card: ' + result.message, 2000);
            }
        })
    }

    onStart() {
        this.client.on('coiffeur-gamestate', (gameState, mainState) => {
            console.log("coiffeur-gamestate", gameState);
            this.setState(gameState);
            if (mainState) {
                this.globalSetState(mainState);
            }
        });
        this.client.emit('coiffeur-requestgamestate');
    }
}

export default CoiffeurRules;