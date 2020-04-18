import {
    Alert,
} from 'rsuite';

class SchieberRules {

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
        this.client.emit('schieber-seat', seat, (response) => {
            console.log("requestSeat response:", response);
        });
    }
    requestUnseat() {
        this.client.emit('schieber-unseat', (response) => {
            console.log("requestUnseat response:", response);
        });
    }

    requestSelectTrick(multiplier, subselection) {
        console.log("selectTrick: ", multiplier);

        var crtScoreLine = this.localState.scores.scoreLines.find((element, index) => {
            var crtMultiplier = index + 1;
            return (multiplier == crtMultiplier);
        });
        if (crtScoreLine.subselectorName != null) {
            console.log("Subselector: ", crtScoreLine.subselectorName);
            if (subselection != null) {
                console.log("Subselection done: ", subselection);
                this.setState({
                    visibleSubselector: null,
                    preselectedMultiplier: undefined,
                }, () => {
                    this.client.emit('schieber-selecttrick', multiplier, subselection, (response) => {
    
                    });
                });
            } else {
                this.setState({
                    visibleSubselector: crtScoreLine.subselectorName,
                    preselectedMultiplier: multiplier,
                });

            }
        } else {
            console.log("No subselector present.");
            this.setState({
                visibleSubselector: null,
                preselectedMultiplier: undefined,
            }, () => {
                this.client.emit('schieber-selecttrick', multiplier, null, (response) => {
    
                })
            });
        }
    }

    requestPushNext() {
        console.log("player pushs");
        this.client.emit('schieber-selectpush', (response) => {
        })
    }

    requestPlayCard(cardName, allCardsUnlocked) {
        console.log("player play card", cardName);
        this.client.emit('schieber-playcard', cardName, allCardsUnlocked, (result) => {
            if (result.status === false) {
                Alert.error('Could not play card: ' + result.message, 2000);
            }
        })
    }

    onStart() {
        this.client.on('schieber-gamestate', (gameState, mainState) => {
            console.log("schieber-gamestate", gameState);
            this.setState(gameState);
            if (mainState) {
                this.globalSetState(mainState);
            }
        });
        this.client.emit('schieber-requestgamestate');
    }
}

export default SchieberRules;