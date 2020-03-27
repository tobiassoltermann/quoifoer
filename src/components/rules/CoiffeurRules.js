

class CoiffeurRules {

    constructor(setState, client) {
        this.setState = setState;
        this.client = client;
    }

    onStart() {
        this.client.on('coiffeur-gamestate', (state) => {
            console.log("coiffeur-gamestate", state);
        });
        this.client.emit('coiffeur-requestgamestate');
    }
}

export default CoiffeurRules;