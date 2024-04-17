class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}

class Location extends Scene {
    create(key) {
        let locationData = key;
        if(this.engine.fate <= 0 && locationData != "Oblivion"){
            this.engine.gotoScene(Location, "Oblivion");
        } else if(this.engine.fate >= 100 && locationData != "Reality"){
            this.engine.gotoScene(Location, "Reality");
        } else {
            if((locationData == "Game1" || locationData == "Game2") && this.engine.permission != true){
                this.engine.show(this.engine.storyData.Locations[locationData].Body2);
            } else {
                this.engine.show(this.engine.storyData.Locations[locationData].Body);
            }
            if(this.engine.storyData.Locations[locationData].Choices != null) {
                if((locationData == "Game1" || locationData == "Game2") && this.engine.permission != true){
                    this.engine.gotoScene(Location, "DwellingInterior");
                } else {
                    for(let choice of this.engine.storyData.Locations[locationData].Choices) {
                        if(locationData == "Game1" || locationData == "Game2"){
        
                        }
                        this.engine.addChoice(choice.Text, choice);
                    }
                } 
            } else {
                this.engine.addChoice("The end.")
            }
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            if(choice.Target == "Wheel"){
                this.engine.gotoScene(Wheel);
            } else if(choice.Target == "Sage"){
                this.engine.permission = true;
                this.engine.gotoScene(Location, choice.Target);
            } else if(choice.Target == "Count"){
                this.engine.show("You currently possess " + this.engine.fate + " fate");
                this.engine.gotoScene(Location, choice.Target);
            } else if(choice.Target == "Poker"){
                let hand = Math.floor(Math.random() * 3) + 1;
                this.engine.fate--;
                if(hand == 1){
                    this.engine.gotoScene(Location, "Hand1");
                } else if(hand == 2){
                    this.engine.gotoScene(Location, "Hand2");
                } else {
                    this.engine.gotoScene(Location, "Hand3");
                }
            } else if(choice.Target == "Hand1Call"){
                this.engine.gotoScene(Hand1);
            } else if(choice.Target == "Hand2Call"){
                this.engine.gotoScene(Hand2);
            } else if(choice.Target == "Hand3Call"){
                this.engine.gotoScene(Hand3);
            } else {
                this.engine.gotoScene(Location, choice.Target);
            }
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class Wheel extends Scene {
    create() {
        let random = Math.floor(Math.random() * 100) + 1;
        let fateAdjustment = 0;
        if(random <= 60){
            fateAdjustment = Math.floor(random / 6) + 1;
            this.engine.show(this.engine.storyData.WheelOfMisfortune.Woe);
            this.engine.show("You lose " + fateAdjustment + " fate");
            this.engine.fate -= fateAdjustment;
            this.engine.addChoice(this.engine.storyData.Locations["Game1"].Choices[0].Text, this.engine.storyData.Locations["Game1"].Choices[0]);
            this.engine.addChoice(this.engine.storyData.Locations["Game1"].Choices[1].Text, this.engine.storyData.Locations["Game1"].Choices[1]);
        } else if(random <= 95){
            fateAdjustment = Math.floor(random / 9.5) + 1;
            this.engine.show(this.engine.storyData.WheelOfMisfortune.Weal);
            this.engine.show("You gain " + fateAdjustment + " fate");
            this.engine.fate += fateAdjustment;
            this.engine.addChoice(this.engine.storyData.Locations["Game1"].Choices[0].Text, this.engine.storyData.Locations["Game1"].Choices[0]);
            this.engine.addChoice(this.engine.storyData.Locations["Game1"].Choices[1].Text, this.engine.storyData.Locations["Game1"].Choices[1]);
        } else {
            fateAdjustment = 50;
            this.engine.show(this.engine.storyData.WheelOfMisfortune.Wonder);
            this.engine.show("You gain " + fateAdjustment + " fate");
            this.engine.fate += fateAdjustment;
            this.engine.addChoice(this.engine.storyData.Locations["Game1"].Choices[1].Text, this.engine.storyData.Locations["Game1"].Choices[1]);
        }
    }

    handleChoice(choice) {
        this.engine.show("&gt; "+choice.Text);
        if(choice.Target == "Wheel"){
            this.engine.gotoScene(Wheel);
        } else {
            this.engine.gotoScene(Location, "ChooseGame");
        }
    }
}

class Hand1 extends Scene {
    create() {
        let random = Math.floor(Math.random() * 100) + 1;
        let fateAdjustment = 0;
        if(random <= 30){
            fateAdjustment = Math.floor((100-random) / 5) + 1;
            this.engine.show("You gain " + fateAdjustment + " fate");
            this.engine.fate += fateAdjustment;
            this.engine.gotoScene(Location, "Hand1Win");
        } else {
            fateAdjustment = Math.floor((random-30) / 10) + 1;
            this.engine.show("You lose " + fateAdjustment + " fate");
            this.engine.fate -= fateAdjustment;
            this.engine.gotoScene(Location, "Hand1Lose");
        }
    }
}

class Hand2 extends Scene {
    create() {
        let random = Math.floor(Math.random() * 100) + 1;
        let fateAdjustment = 0;
        if(random <= 50){
            fateAdjustment = Math.floor((100-random) / 5) + 1;
            this.engine.show("You gain " + fateAdjustment + " fate");
            this.engine.fate += fateAdjustment;
            this.engine.gotoScene(Location, "Hand2Win");
        } else {
            fateAdjustment = Math.floor((100-random) / 5) + 1;
            this.engine.show("You lose " + fateAdjustment + " fate");
            this.engine.fate -= fateAdjustment;
            this.engine.gotoScene(Location, "Hand2Lose");
        }
    }
}

class Hand3 extends Scene {
    create() {
        let random = Math.floor(Math.random() * 100) + 1;
        let fateAdjustment = 0;
        if(random <= 80){
            fateAdjustment = Math.floor((100-random) / 12) + 1;
            this.engine.show("You gain " + fateAdjustment + " fate");
            this.engine.fate += fateAdjustment;
            this.engine.gotoScene(Location, "Hand3Win");
        } else {
            fateAdjustment = Math.floor(random / 7) + 1;
            this.engine.show("You lose " + fateAdjustment + " fate");
            this.engine.fate -= fateAdjustment;
            this.engine.gotoScene(Location, "Hand3Lose");
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');