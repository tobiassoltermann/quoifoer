

class CoiffeurRules {

    constructor(setState, client, initDone) {
        this.setState = setState;
        this.client = client;

        this.setState({
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
            }
        }, initDone);
    }

    getSpecificProps() {
        return {
            requestSeat: this.requestSeat.bind(this),
            requestUnseat: this.requestUnseat.bind(this),
        }
    }

    requestSeat(seat) {
        console.log("requestSeat", seat);
        this.client.emit('coiffeur-seat', seat, (response) => {
            console.log("requestSeat response:", response);
        });
    }
    requestUnseat() {
        console.log("requestUnseat");
    }

    onStart() {
        this.client.on('coiffeur-gamestate', (gameState) => {
            console.log("coiffeur-gamestate", gameState);
            this.setState(gameState);
        });
        this.client.emit('coiffeur-requestgamestate');
    }
}

export default CoiffeurRules;