(function () {
    // Function scoped Variables
    let stage;
    let assets;
    let slotMachineBackground;
    let spinButton;
    let bet1Button;
    let bet10Button;
    let bet100Button;
    let betMaxButton;
    let jackPotLabel;
    let creditLabel;
    let winningsLabel;
    let betLabel;
    let leftReel;
    let middleReel;
    let rightReel;
    let betLine;
    // symbol tallies
    let grapes = 0;
    let bananas = 0;
    let oranges = 0;
    let cherries = 0;
    let bars = 0;
    let bells = 0;
    let sevens = 0;
    let blanks = 0;
    let manifest = [
        { id: "background", src: "./Assets/images/background.png" },
        { id: "banana", src: "./Assets/images/banana.gif" },
        { id: "bar", src: "./Assets/images/bar.gif" },
        { id: "bell", src: "./Assets/images/bell.gif" },
        { id: "bet_line", src: "./Assets/images/bet_line.gif" },
        { id: "bet1Button", src: "./Assets/images/bet1Button.png" },
        { id: "bet10Button", src: "./Assets/images/bet10Button.png" },
        { id: "bet100Button", src: "./Assets/images/bet100Button.png" },
        { id: "betMaxButton", src: "./Assets/images/betMaxButton.png" },
        { id: "blank", src: "./Assets/images/blank.gif" },
        { id: "cherry", src: "./Assets/images/cherry.gif" },
        { id: "grapes", src: "./Assets/images/grapes.gif" },
        { id: "orange", src: "./Assets/images/orange.gif" },
        { id: "seven", src: "./Assets/images/seven.gif" },
        { id: "spinButton", src: "./Assets/images/spinButton.png" },
    ];
    // This function triggers first and "Preloads" all the assets
    function Preload() {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);
        assets.loadManifest(manifest);
    }
    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start() {
        console.log("App Started...");
        let canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        Config.Globals.AssetManifest = assets;
        Main();
    }
    // called every frame
    function Update() {
        stage.update();
    }
    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
    /* When this function is called it determines the betLine results.
    e.g. Bar - Orange - Banana */
    function Reels() {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];
        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 30): // (1,27)41.5% probability
                    betLine[spin] = "blank";
                    blanks++;
                    break;
                case checkRange(outCome[spin], 31, 31): // (28,37)15.4% probability
                    betLine[spin] = "grapes";
                    grapes++;
                    break;
                case checkRange(outCome[spin], 32, 32): // (38,46)13.8% probability
                    betLine[spin] = "banana";
                    bananas++;
                    break;
                case checkRange(outCome[spin], 33, 34): // (47,54)12.3% probability
                    betLine[spin] = "orange";
                    oranges++;
                    break;
                case checkRange(outCome[spin], 35, 41): //  (55,59)7.7% probability
                    betLine[spin] = "cherry";
                    cherries++;
                    break;
                case checkRange(outCome[spin], 42, 51): //  (60,62)4.6% probability
                    betLine[spin] = "bar";
                    bars++;
                    break;
                case checkRange(outCome[spin], 52, 59): //  (63,64)3.1% probability
                    betLine[spin] = "bell";
                    bells++;
                    break;
                case checkRange(outCome[spin], 60, 65): //  (65,65)1.5% probability
                    betLine[spin] = "seven";
                    sevens++;
                    break;
            }
        }
        return betLine;
    }
    /*function for building interface. You put all objects that will be shown in screen here*/
    function buildInterface() {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true);
        stage.addChild(slotMachineBackground);
        // Buttons
        spinButton = new UIObjects.Button("spinButton", Config.Screen.CENTER_X + 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(spinButton);
        bet1Button = new UIObjects.Button("bet1Button", Config.Screen.CENTER_X - 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet1Button);
        bet10Button = new UIObjects.Button("bet10Button", Config.Screen.CENTER_X - 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet10Button);
        bet100Button = new UIObjects.Button("bet100Button", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet100Button);
        betMaxButton = new UIObjects.Button("betMaxButton", Config.Screen.CENTER_X + 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(betMaxButton);
        // Labels
        jackPotLabel = new UIObjects.Label("00005000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 175, true);
        stage.addChild(jackPotLabel);
        creditLabel = new UIObjects.Label("00001000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(creditLabel);
        winningsLabel = new UIObjects.Label("00000000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(winningsLabel);
        betLabel = new UIObjects.Label("0000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(betLabel);
        // Reel GameObjects
        leftReel = new Core.GameObject("bell", Config.Screen.CENTER_X - 79, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(leftReel);
        middleReel = new Core.GameObject("banana", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(middleReel);
        rightReel = new Core.GameObject("bar", Config.Screen.CENTER_X + 78, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(rightReel);
        // Bet Line
        betLine = new Core.GameObject("bet_line", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(betLine);
    }
    function interfaceLogic() {
        spinButton.on("click", () => {
            if (creditLabel.text == "0") {
                if (confirm(`You ran out of Money!\n Do you want to play again?`))
                    Main(); //to reset everything (if you put Start, it occurs working error)
            }
            else if (Number(betLabel.text) > Number(creditLabel.text)) {
                alert(`You don't have enough Money to place that bet.`);
                Main(); //to reset everything (if you put Start, it occurs error)
            }
            else if (Number(betLabel.text) <= Number(creditLabel.text)) {
                // reel test
                let reels = Reels();
                // example of how to replace the images in the reels
                leftReel.image = assets.getResult(reels[0]);
                middleReel.image = assets.getResult(reels[1]);
                rightReel.image = assets.getResult(reels[2]);
                let blankcount = 0;
                let grapecount = 0;
                let bananacount = 0;
                let orangecount = 0;
                let cherrycount = 0;
                let barcount = 0;
                let bellcount = 0;
                let sevencount = 0;
                for (let i = 0; i < reels.length; i++) {
                    if (reels[i] == "blank")
                        blankcount++;
                    if (reels[i] == "grapes")
                        grapecount++;
                    if (reels[i] == "banana")
                        bananacount++;
                    if (reels[i] == "orange")
                        orangecount++;
                    if (reels[i] == "cherry")
                        cherrycount++;
                    if (reels[i] == "bar")
                        barcount++;
                    if (reels[i] == "bell")
                        bellcount++;
                    if (reels[i] == "seven")
                        sevencount++;
                }
                console.log(`the number of {blank, grape, banana, orange, cherry, bar, bell, seven\n ${blankcount},${grapecount},${bananacount},${orangecount},${cherrycount},${barcount},${bellcount},${sevencount}`);
                if (blankcount == 0) {
                    if (grapecount == 3) {
                        winningsLabel.setText((Number(betLabel.text) * 10).toString());
                        creditLabel.setText((Number(creditLabel.text) + Number(winningsLabel.text)).toString());
                    }
                    else if (bananacount == 3) {
                        winningsLabel.setText((Number(betLabel.text) * 20).toString());
                        creditLabel.setText((Number(creditLabel.text) + Number(winningsLabel.text)).toString());
                    }
                    else if (orangecount == 3) {
                        winningsLabel.setText((Number(betLabel.text) * 30).toString());
                        creditLabel.setText((Number(creditLabel.text) + Number(winningsLabel.text)).toString());
                    }
                    else if (cherrycount == 3) {
                        winningsLabel.setText((Number(betLabel.text) * 40).toString());
                        creditLabel.setText((Number(creditLabel.text) + Number(winningsLabel.text)).toString());
                    }
                    else if (barcount == 3) {
                        winningsLabel.setText((Number(betLabel.text) * 50).toString());
                        creditLabel.setText((Number(creditLabel.text) + Number(winningsLabel.text)).toString());
                    }
                    else if (bellcount == 3) {
                        winningsLabel.setText((Number(betLabel.text) * 75).toString());
                        creditLabel.setText((Number(creditLabel.text) + Number(winningsLabel.text)).toString());
                    }
                    else if (sevencount == 3) {
                        winningsLabel.setText((Number(betLabel.text) * 100).toString());
                        creditLabel.setText((Number(creditLabel.text) + Number(winningsLabel.text)).toString());
                        confirm(`Jackpot!!!\nYou got Jackpot point ${jackPotLabel.text} and winning point ${winningsLabel.text}}`);
                    }
                    else if (grapecount == 2) {
                        winningsLabel.setText((Number(betLabel.text) * 2).toString());
                        creditLabel.setText((Number(creditLabel.text) + Number(winningsLabel.text)).toString());
                    }
                    else if (bananacount == 2) {
                        winningsLabel.setText((Number(betLabel.text) * 2).toString());
                        creditLabel.setText((Number(creditLabel.text) + Number(winningsLabel.text)).toString());
                    }
                    else if (orangecount == 2) {
                        winningsLabel.setText((Number(betLabel.text) * 3).toString());
                        creditLabel.setText((Number(creditLabel.text) + Number(winningsLabel.text)).toString());
                    }
                    else if (cherrycount == 2) {
                        winningsLabel.setText((Number(betLabel.text) * 4).toString());
                        creditLabel.setText((Number(creditLabel.text) + Number(winningsLabel.text)).toString());
                    }
                    else if (barcount == 2) {
                        winningsLabel.setText((Number(betLabel.text) * 5).toString());
                        creditLabel.setText((Number(creditLabel.text) + Number(winningsLabel.text)).toString());
                    }
                    else if (bellcount == 2) {
                        winningsLabel.setText((Number(betLabel.text) * 10).toString());
                        creditLabel.setText((Number(creditLabel.text) + Number(winningsLabel.text)).toString());
                    }
                    else if (sevencount == 2) {
                        winningsLabel.setText((Number(betLabel.text) * 20).toString());
                        creditLabel.setText((Number(creditLabel.text) + Number(winningsLabel.text)).toString());
                    }
                    else if (sevencount == 1) {
                        winningsLabel.setText((Number(betLabel.text) * 5).toString());
                        creditLabel.setText((Number(creditLabel.text) + Number(winningsLabel.text)).toString());
                    }
                    else {
                        winningsLabel.setText((Number(betLabel.text) * 1).toString());
                        creditLabel.setText((Number(creditLabel.text) + Number(winningsLabel.text)).toString());
                    }
                }
                else {
                    creditLabel.setText((Number(creditLabel.text) - Number(betLabel.text)).toString());
                }
            }
        });
        bet1Button.on("click", () => {
            console.log("bet1Button Button Clicked");
            betLabel.setText((Number(betLabel.text) + 1).toString());
        });
        bet10Button.on("click", () => {
            console.log("bet10Button Button Clicked");
            betLabel.setText((Number(betLabel.text) + 10).toString());
        });
        bet100Button.on("click", () => {
            console.log("bet100Button Button Clicked");
            betLabel.setText((Number(betLabel.text) + 100).toString());
        });
        betMaxButton.on("click", () => {
            console.log("betMaxButton Button Clicked");
            betLabel.setText(Number(creditLabel.text).toString());
        });
    }
    // app logic goes here
    function Main() {
        buildInterface();
        interfaceLogic();
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=app.js.map