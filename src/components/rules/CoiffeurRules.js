

class CoiffeurRules {

    constructor(globalSetState, client, initDone) {
        this.globalSetState = globalSetState;
        this.setState = this.setState.bind(this);
        this.client = client;

        this.localState = {
            boardSetup: {
                S: {
                    playerName: "Player 1",
                    card: "H6"
                },
                E: {
                    playerName: "Player 2",
                    card: "S7"
                },
                N: {
                    playerName: "Player 3",
                    card: "K8"
                },
                W: {
                    playerName: "Player 4",
                    card: "C9"
                },
                self: 'N',
            },
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
        console.log("player pushs")
        this.client.emit('coiffeur-selectpush', (response) => {
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