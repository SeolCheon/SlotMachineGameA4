/*

*/
(function(){
    // Function scoped Variables
    let stage: createjs.Stage;
    let assets: createjs.LoadQueue;
    let slotMachineBackground: Core.GameObject;

    let spinButton: UIObjects.Button;
    let bet1Button: UIObjects.Button;
    let bet10Button: UIObjects.Button;
    let bet100Button: UIObjects.Button;
    let betMaxButton: UIObjects.Button;

    let jackPotLabel: UIObjects.Label;
    let creditLabel: UIObjects.Label;
    let winningsLabel: UIObjects.Label;
    let betLabel: UIObjects.Label;
    let leftReel: Core.GameObject;
    let middleReel: Core.GameObject;
    let rightReel: Core.GameObject;
    let betLine: Core.GameObject;

    // symbol tallies
    let grapes = 0;
    let bananas = 0;
    let oranges = 0;
    let cherries = 0;
    let bars = 0;
    let bells = 0;
    let sevens = 0;
    let blanks = 0;

    let manifest: Core.Item[] = [
        {id:"background", src:"./Assets/images/background.png"},
        {id:"banana", src:"./Assets/images/banana.gif"},
        {id:"bar", src:"./Assets/images/bar.gif"},
        {id:"bell", src:"./Assets/images/bell.gif"},
        {id:"bet_line", src:"./Assets/images/bet_line.gif"},
        {id:"bet1Button", src:"./Assets/images/bet1Button.png"},
        {id:"bet10Button", src:"./Assets/images/bet10Button.png"},
        {id:"bet100Button", src:"./Assets/images/bet100Button.png"},
        {id:"betMaxButton", src:"./Assets/images/betMaxButton.png"},
        {id:"blank", src:"./Assets/images/blank.gif"},
        {id:"cherry", src:"./Assets/images/cherry.gif"},
        {id:"grapes", src:"./Assets/images/grapes.gif"},
        {id:"orange", src:"./Assets/images/orange.gif"},
        {id:"seven", src:"./Assets/images/seven.gif"},
        {id:"spinButton", src:"./Assets/images/spinButton.png"},
    ];   

    // This function triggers first and "Preloads" all the assets
    function Preload()
    {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);
        assets.loadManifest(manifest);
    }

    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start():void
    {
        console.log("App Started...");
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);

        stage.enableMouseOver(20);

        Config.Globals.AssetManifest = assets;

        Main();
    }

    // called every frame
    function Update():void
    {
        stage.update();
    }

    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value:number, lowerBounds:number, upperBounds:number):number | boolean {
        if (value >= lowerBounds && value <= upperBounds)
        {
            return value;
        }
        else {
            return !value;
        }
    }

    /* When this function is called it determines the betLine results.
    e.g. Bar - Orange - Banana */
    function Reels():string[] {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];

        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                    betLine[spin] = "blank";
                    blanks++;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "grapes";
                    grapes++;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "banana";
                    bananas++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "orange";
                    oranges++;
                    break;
                case checkRange(outCome[spin], 55, 59): // 7.7% probability
                    betLine[spin] = "cherry";
                    cherries++;
                    break;
                case checkRange(outCome[spin], 60,62): // 4.6% probability
                    betLine[spin] = "bar";
                    bars++;
                    break;
                case checkRange(outCome[spin], 63, 64): // 3.1% probability
                    betLine[spin] = "bell";
                    bells++;
                    break;
                case checkRange(outCome[spin], 65, 65): // 1.5% probability
                    betLine[spin] = "seven";
                    sevens++;
                    break;
            }
        }
        return betLine;                                 //return betLine array
    }
    /*function for building interface. You put all objects that will be shown in screen here*/
    function buildInterface():void
    {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true );
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

    /**this function is for making slot machine logic
     * it will show what happens when you click buttons
     */
    function interfaceLogic():void
    {
        //when you click spin button
        spinButton.on("click", ()=>{            
            if(creditLabel.text == "0")                                             //if you don't have money(credit)
            {
                if(confirm(`You ran out of Money!\n Do you want to play again?`))   //show this confirm message
                Main();                                                             //to reset everything (if you put Start, it occurs working error)
            }
            else if(Number(betLabel.text) > Number(creditLabel.text))               //if your money(credit) is less than your betting amount
            {
                alert(`You don't have enough Money to place that bet.`);            //show this alert message
                Main();                                                             //to reset everything (if you put Start, it occurs error)
            }
            else if(Number(betLabel.text) <= Number(creditLabel.text))              //if you have enough money to play
            {
            // reel test
            let reels = Reels();
            // example of how to replace the images in the reels
            leftReel.image = assets.getResult(reels[0]) as HTMLImageElement;
            middleReel.image = assets.getResult(reels[1]) as HTMLImageElement;
            rightReel.image = assets.getResult(reels[2]) as HTMLImageElement;  

            determinWinnings();                                                     //implement determinWinnings function 
                    
            }})  
            

        bet1Button.on("click", ()=>{                                                //when you click bet1 button
            console.log("bet1Button Button Clicked");                               //show this on console
            betLabel.setText((Number(betLabel.text)+1).toString());                 //change the bet amount by adding 1
        });

        bet10Button.on("click", ()=>{                                               //when you click bet10 button
            console.log("bet10Button Button Clicked");                              //show this on console    
            betLabel.setText((Number(betLabel.text)+10).toString());                //change the bet amount by adding 10
        });

        bet100Button.on("click", ()=>{                                              //when you click bet100 button
            console.log("bet100Button Button Clicked");                             //show this on console                         
            betLabel.setText((Number(betLabel.text)+100).toString());               //change the bet amount by adding 100
        });

        betMaxButton.on("click", ()=>{                                              //when you click bet100 button
            console.log("betMaxButton Button Clicked");                             //show this on console                 
            betLabel.setText(Number(creditLabel.text).toString());                  //change the bet amount by adding Max credit
        });
    }

    /**this function is for determining winning point
     * depending on the number of shapes, winning point will be different
     */
    function determinWinnings()
    {
        
        let reels = Reels();                //call Reels function and assign it reels
        //set variables(the number of shapes on the betline)
        let blankcount = 0;
        let grapecount =0;
        let bananacount =0;
        let orangecount =0;
        let cherrycount =0;
        let barcount =0;
        let bellcount =0;
        let sevencount = 0;
            
            //for one spin, whenever the shape appears, it will count the number of that shape
            for(let i=0;i<reels.length;i++)
            {
                
                if(reels[i]=="blank")
                blankcount++;
                if(reels[i]=="grapes")
                grapecount++;
                if(reels[i]=="banana")
                bananacount++;
                if(reels[i]=="orange")
                orangecount++;
                if(reels[i]=="cherry")
                cherrycount++;
                if(reels[i]=="bar")
                barcount++;
                if(reels[i]=="bell")
                bellcount++;
                if(reels[i]=="seven")
                sevencount++;
            }
             
        //this consolel message is for checking which shapes appears how many times on betline    
        console.log(`the number of {blank, grape, banana, orange, cherry, bar, bell, seven\n ${blankcount},${grapecount},${bananacount},${orangecount},${cherrycount},${barcount},${bellcount},${sevencount}`)
            
            //determining winning points and adding winning points to credit   
            if(blankcount==0)                                                                                           //if there's no blank-(win)    
                    {
                        if(grapecount==3)                                                                               //if there are 3 grapes on bet line    
                        {
                            winningsLabel.setText((Number(betLabel.text)*10).toString());                               //winning point is betamount *10
                            creditLabel.setText((Number(creditLabel.text)+Number(winningsLabel.text)).toString());      //add the winning point to credit
        
                        } 
                        else if(bananacount==3)                                                                         //if there are 3 banana on bet line
                        {
                            winningsLabel.setText((Number(betLabel.text)*20).toString());                               //winning point is betamount *20
                            creditLabel.setText((Number(creditLabel.text)+Number(winningsLabel.text)).toString());      //add the winning point to credit
                        } 
                        else if(orangecount==3)                                                                         //if there are 3 oranges on bet line
                        {
                            winningsLabel.setText((Number(betLabel.text)*30).toString());                               //winning point is betamount *30
                            creditLabel.setText((Number(creditLabel.text)+Number(winningsLabel.text)).toString());      //add the winning point to credit
                        } 
                        else if(cherrycount==3)                                                                         //if there are 3 cherries on bet line
                        {
                            winningsLabel.setText((Number(betLabel.text)*40).toString());                               //winning point is betamount *40
                            creditLabel.setText((Number(creditLabel.text)+Number(winningsLabel.text)).toString());      //add the winning point to credit
                        }   
                        else if(barcount==3)                                                                            //if there are 3 bars on bet line
                        {
                            winningsLabel.setText((Number(betLabel.text)*50).toString());                               //winning point is betamount *50
                            creditLabel.setText((Number(creditLabel.text)+Number(winningsLabel.text)).toString());      //add the winning point to credit
                        } 
                        else if(bellcount==3)                                                                           //if there are 3 bells on bet line
                        {
                            winningsLabel.setText((Number(betLabel.text)*75).toString());                               //winning point is betamount *75
                            creditLabel.setText((Number(creditLabel.text)+Number(winningsLabel.text)).toString());      //add the winning point to credit
                        } 
                        else if(sevencount==3)                                                                          //if there are 3 sevens(jackpot) on bet line
                        {
                            winningsLabel.setText((Number(betLabel.text)*100).toString());                              //winning point is betamount *100
                            creditLabel.setText((Number(creditLabel.text)+Number(winningsLabel.text)).toString());      //add the winning point to credit
                            confirm(`Jackpot!!!\nYou got Jackpot point ${jackPotLabel.text} and winning point ${winningsLabel.text}}`)    //show this message on your screen
                        } 
                        else if(grapecount==2)                                                                          //if there are 2 grapes on bet line
                        {
                            winningsLabel.setText((Number(betLabel.text)*2).toString());                                //winning point is betamount *2
                            creditLabel.setText((Number(creditLabel.text)+Number(winningsLabel.text)).toString());      //add the winning point to credit
                        } 
                        else if(bananacount==2)                                                                         //if there are 2 bananas on bet line
                        {
                            winningsLabel.setText((Number(betLabel.text)*2).toString());                                //winning point is betamount *2
                            creditLabel.setText((Number(creditLabel.text)+Number(winningsLabel.text)).toString());      //add the winning point to credit
                        } 
                        else if(orangecount==2)                                                                         //if there are 2 oranges on bet line
                        {
                            winningsLabel.setText((Number(betLabel.text)*3).toString());                                //winning point is betamount *3
                            creditLabel.setText((Number(creditLabel.text)+Number(winningsLabel.text)).toString());      //add the winning point to credit
                        } 
                        else if(cherrycount==2)                                                                         //if there are 2 cherries on bet line
                        {
                            winningsLabel.setText((Number(betLabel.text)*4).toString());                                //winning point is betamount *4
                            creditLabel.setText((Number(creditLabel.text)+Number(winningsLabel.text)).toString());      //add the winning point to credit
                        } 
                        else if(barcount==2)                                                                            //if there are 2 bars on bet line
                        {
                            winningsLabel.setText((Number(betLabel.text)*5).toString());                                //winning point is betamount *5
                            creditLabel.setText((Number(creditLabel.text)+Number(winningsLabel.text)).toString());      //add the winning point to credit
                        } 
                        else if(bellcount==2)                                                                           //if there are 2 bells on bet line
                        {
                            winningsLabel.setText((Number(betLabel.text)*10).toString());                               //winning point is betamount *10
                            creditLabel.setText((Number(creditLabel.text)+Number(winningsLabel.text)).toString());      //add the winning point to credit
                        }
                        else if(sevencount==2)                                                                          //if there are 2 sevens on bet line
                        {
                            winningsLabel.setText((Number(betLabel.text)*20).toString());                               //winning point is betamount *20
                            creditLabel.setText((Number(creditLabel.text)+Number(winningsLabel.text)).toString());      //add the winning point to credit
                        } 
                        else if(sevencount==1)                                                                          //if there are 1 seven on bet line
                        {
                            winningsLabel.setText((Number(betLabel.text)*5).toString());                                //winning point is betamount *5
                            creditLabel.setText((Number(creditLabel.text)+Number(winningsLabel.text)).toString());      //add the winning point to credit
                        } 
                        else                                                                                            //left cases when you don't have blank on you bet line
                        {
                            winningsLabel.setText((Number(betLabel.text)*1).toString());                                //winning point is betamount *1
                            creditLabel.setText((Number(creditLabel.text)+Number(winningsLabel.text)).toString());      //add the winning point to credit
                        }
                        
                }  
            else                                                                                                        //if you lose game(=if there's blank more than one)
                    {
                        creditLabel.setText((Number(creditLabel.text)-Number(betLabel.text)).toString());               //your credit will deducted by bet amount
                        
                    }  
           
    }

    
    // app logic goes here
    function Main():void
    {
        //implement these functions
        buildInterface();
        interfaceLogic();
    }

    window.addEventListener("load", Preload);
    }
)();