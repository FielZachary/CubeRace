import Phaser from 'phaser';
import GameSquare from "../classes/gamesquare";
import BlankGameSquare from "../classes/blanksquare";
export { counter };
export { moveCounter };
import { leaderBoard } from "../scenes/SceneStart"
import { calledBack } from "../scenes/SceneStart"
import { ifSoundOn } from "./SceneSettings"
import { analytics } from "../scenes/SceneStart"
console.log('In scene main ' + calledBack)
//import {sceneWonMade} from '../scenes/sceneWon'

let counter = 0;
let countdown = 1;
let moveCounter = 0;
let hasAdjusted = 0;
let MhasAdjusted = 0;
const COLOR_PRIMARY = 0xFFFFFF  ;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;


export default class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain', {key: 'examples'});
    }
    preload()
    {
        this.load.audio('incorrect', 'assets/Sound/wrongSFX.mp3')
        this.load.image('screenBG', 'assets/images/bg4.png')
        this.load.image('ExitButton', 'assets/images/ExitButton.png')
        this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
        this.load.plugin('rexbuttonplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbuttonplugin.min.js', true);
        this.load.image('doneButtonNP', 'assets/images/DoneButtonNP.png')
        this.load.image('doneButtonOP', 'assets/images/DoneButtonOP.png')
        this.load.audio('MovePiece', 'assets/Sound/MovePieceSFX.mp3')
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });     


    }
    create() {
        hasAdjusted = 0;
        MhasAdjusted = 0;
        moveCounter = 0;
        counter = 0;
        console.log('In Scene main')
        this.pieceMoveSound = this.sound.add('MovePiece')
        this.loadFont('MixolydianTitlingRg-Bold', "assets/fonts/mixolydian.ttf")
        this.bg = this.add.image(-10, 140, 'screenBG')
        this.bg.scaleX = 0.5
        this.bg.scaleY = 0.5
        this.bg.setOrigin(0.155, 0.17)
        this.graySquare = this.add.rexRoundRectangle(254, 530, 350, 350, 16, 0xECECEC);
        this.graySquare.alpha = 1
        this.buttonSquare = this.add.rexRoundRectangle(254, 750 , 180, 50, 16, 0x6F91C7)
       // this.doneSquareText = this.add.text(210, 730, 'Done!', {fontFamily: 'Verdana', fontStyle: 'bold', fontSize: '30px'})
        this.doneButton = this.add.image(254, 750, 'doneButtonNP')
        this.doneButton.scaleX = 0.1
        this.doneButton.scaleY = 0.1
        this.incorrectSound = this.sound.add('incorrect')
        //this.helpButton = this.add.rectangle()


        this.purpleOutline = this.add.rexRoundRectangle(254, 210, 207, 207, 16, 0x6a0dad);
        this.purpleOutline.alpha = 0.2

        this.purpleOutline2 = this.add.rexRoundRectangle(254, 530, 207, 207, 16, 0x6a0dad);
        this.purpleOutline2.alpha = 0.2

        this.transparentRec = this.add.rexRoundRectangle(73, 270, 130, 80, 16, 0xECECEC);
        this.transparentRec.alpha = 0.8
        this.blueRec = this.add.rexRoundRectangle(73, 230, 90, 30, 16, 0x6F91C7);
        this.movesText = this.add.text(39, 216, 'Moves', {fontFamily: 'Balsamiq Sans', fontSize: '23px', fontStyle: 'bold'})
        this.movesNum = this.add.text(60, 250, moveCounter, {fontFamily: 'Balsamiq Sans', fontSize: '40px', color: "#000000"})

        this.transparentRec2 = this.add.rexRoundRectangle(433, 270, 130, 80, 16, 0xECECEC);
        this.transparentRec2.alpha = 0.7
        this.blueRec2 = this.add.rexRoundRectangle(433, 230, 90, 30, 16, 0x6F91C7);
        this.timerText = this.add.text(402, 217, 'Timer', {fontFamily: 'Balsamiq Sans', fontStyle: 'bold', fontSize: '23px'})

        this.gsSolution = [];
        this.gsGameBoard = [];
        this.solutionColors = [];
        this.solX = 184;
        this.solY = 140;
        this.gbX = 114
        this.gbY = 390
        this.colorArray = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];
        this.setSolution();
        this.setGameBoard();
        counter = 0;
        this.makeButton();
        this.finishedFade = true;   
        this.exitButton = this.add.rectangle(40, 40, 20, 20)      
        this.exitButtonImg = this.add.image(40, 40, 'ExitButton')
        this.exitButtonImg.scaleX = 0.5            
        this.exitButtonImg.scaleY = 0.5       
        var eButton = this.plugins.get('rexbuttonplugin').add(this.exitButtonImg, {
             enable: true,
             mode: 0,            // 0|'press'|1|'release'
            // clickInterval: 100  // ms
        });       
        eButton.on('click', function (button, gameObject, pointer, event) {
          //  calledBack = true;
            countdown = 1
            this.scene.start('SceneStart')
            analytics.logEvent('Left_main_game')
        }, this);     






        this.timerNumText = this.add.text(420, 250, counter, {fontFamily: 'Balsamiq Sans', color: "#000000", fontSize: '40px'})

        var gameCountDown = this.time.addEvent({
            delay: 1000,                // ms
            callback: this.updateCountDown,
            //args: [],
            callbackScope: this,
            repeat: 2
        });

        this.countDownText = this.add.text(232, 400, `${countdown}`, {fontFamily: 'Balsamiq Sans', color: "#000000", fontSize: '80px'})
      //  this.scene.start('SceneWon')



    }
    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }   


    updateCounter() {

        counter++
        this.timerNumText.setText(counter)
        if(counter >= 10)
        {
 
            if (hasAdjusted == 0)
            {
                this.timerNumText.x -= 8;
                hasAdjusted = 1;
            }


        }
        if(counter >= 100)
        {
 
            if (hasAdjusted == 1)
            {
                this.timerNumText.x -= 9;
                hasAdjusted = 2;
            }


        }

    }
    updateCountDown() {
        countdown++;
        if(countdown == 4) {
            this.countDownText.x -= 65
            this.countDownText.setText('start!')
            const tween = this.tweens.add({
                targets: [this.countDownText],
                alpha: 0,
                duration: 1250,
                repeat: 0,

              });
              this.timer = this.time.addEvent({
                delay: 1000,
                callback: this.updateCounter,
                callbackScope: this,
                loop: true,
    
            });
        } else {
            this.countDownText.setText(countdown)
        }

    }
    startCounter() {

    }
    setSolution()
    {
        this.shuffledArray = this.shuffle(this.colorArray);
        for (var i = 0; i <= 8; i++ ) {
            var colorNumber = this.determineColor(this.shuffledArray[i])
            this.gsSolution[i] = new GameSquare({scene:this}, this.solX, this.solY, colorNumber, false, this.shuffledArray[i])
            if (this.solX <= 330 ) {
                this.solX += 70;
            }
            if (this.solX > 330 ) {
                this.solX = 184;
                this.solY += 70;
            }
        }

    }
    setGameBoard()
    {
        this.bGS = new BlankGameSquare({scene:this}, 394, 670, 0x000000)
        this.shuffledArray = this.shuffle(this.colorArray);
        for (var i = 0; i <= 23; i++ ) {
            var colorNumber = this.determineColor(this.shuffledArray[i])
            this.gsGameBoard[i] = new GameSquare({scene:this}, this.gbX, this.gbY, colorNumber, true, this.shuffledArray[i])
            if (this.gbX <= 400 ) {
                this.gbX += 70;
            }
            if (this.gbX > 400 ) {
                this.gbX = 114
                this.gbY += 70
            }

        }
        this.zone = this.add.zone(394, 670, 60, 60).setRectangleDropZone(60, 60);
        this.graphics = this.add.graphics();

    }
    shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }

    determineColor(shuffledArray)
    {
        if (shuffledArray == 0 ) {
            var squareColor = 0x000000;
        }
        if (shuffledArray == 1) {
            var squareColor = 0x847777;
        }
        if (shuffledArray == 2) {
            var squareColor = 0xCBCCD1;
        }
        if (shuffledArray == 3) {
            var squareColor = 0xFF0000;
        }
        if (shuffledArray == 4) {
            var squareColor = 0xFFA500;
        }
        if (shuffledArray == 5) {
            var squareColor = 0x6F91C7;
        }
        if (shuffledArray == 6) {
            var squareColor = 0x228B22;
        }

        return squareColor;

    }
    switchZone(destinationX, destinationY, )
    {
        this.zone.x = destinationX;
        this.zone.y = destinationY;
        this.bGS.switchSquare1( destinationX, destinationY );
        moveCounter++;
        this.movesNum.setText(moveCounter)
        if ( ifSoundOn == true ) {
            this.pieceMoveSound.play();
        }

        if(moveCounter >= 10)
        {
 
            if (MhasAdjusted == 0)
            {
                this.movesNum.x -= 7;
                MhasAdjusted = 1;
            }
        }
        if(moveCounter >= 100)
        {
 
            if (MhasAdjusted == 1)
            {
                this.movesNum.x -= 9;
                MhasAdjusted = 2;
            }
        }


        for (var i=0; i<=23; i++) {
            var isAllowed = this.checkAllowed(this.gsGameBoard[i].square)
            if(isAllowed == true )
            {
                this.gsGameBoard[i].square.setInteractive();
                this.input.on('pointerdown', this.gsGameBoard[i].startDrag, this.gsGameBoard[i]);
            } else {
                this.gsGameBoard[i].square.disableInteractive();
                this.input.off('pointerdown', this.gsGameBoard[i].startDrag, this.gsGameBoard[i]);
                this.input.off('pointermove', this.gsGameBoard[i].moveDrag, this.gsGameBoard[i])
                this.input.off('pointerup', this.gsGameBoard[i].stopDrag, this)
            }
        }

    }
    checkArrays(array1, array2) {
        var array12 = [];
        var array13 = [];
        var array14 = [];
        if (array1.length !== array2.length)
        {
        //  console.log('Not same length')
          return false
        }
        for (var i = 0; i <= 7; i++)
        {
            if(array1[i] !== array2[i])
            {
              array12 = this.findOtherPossibilities(array2, 1)
              if (array1[i] !== array12[i])
              {
                array13 = this.findOtherPossibilities(array12, 2)
                if (array1[i] !== array13[i])
                {
                    array14 = this.findOtherPossibilities(array13, 3)
                    if (array1[i] !== array14[i])
                    {
                        return false;
                    }
                }
              }

            }
        }
        return true;
    }
    gb3x3Colors()
    {
      //      this.testSquare = this.add.rectangle(184, 460, 80, 80)
        var checkX = 184;
        var checkY = 460;
        this.innerGBColors = [];
        for (var i = 0; i <= 8; i++)
        {
            for (var b = 0; b<= 23; b++)
            {
               // console.log(this.gsGameBoard[b].square.x + ' ' + checkX)
                if(this.gsGameBoard[b].square.x == checkX)
                {
                  //  console.log(this.gsGameBoard[b].square.y + ' ' + checkY)
                    if(this.gsGameBoard[b].square.y == checkY)
                    {
                        //console.log('im in')
                        this.innerGBColors.push(this.gsGameBoard[b].squareColor);

                    }
                }

            }
            if (checkX <= 324 ) {
                checkX += 70;
            }
            if (checkX > 324 ) {
                checkX = 184;
                checkY += 70;
            }
        }
        return;

    }
    checking3x3Colors() {
        for (var b = 0; b<= 23; b++)
        {
          //  console.log('im in')
            if(this.gsGameBoard[b].square.x == checkX)
            {

                this.innerGBColors.unshift(this.gsGameBoard[b]);
                if (checkX <= 330 ) {
                    checkX += 70;
                }
                if (checkX > 330 ) {
                    checkX = 190;
                    checkY += 70;
                }
            }

        }
    }
    checkAllowed(givenObject) {
        var finalAllowedCoords = [];
        var finalAllowedCoords = this.checkAllowedCoords(this.bGS.square.x, this.bGS.square.y);
        for (var i=0; i<=3; i++)
        {
            if (givenObject.x == finalAllowedCoords[i][0])
            {


                if (givenObject.y == finalAllowedCoords[i][1])
                {

                   return true;

                }

            }

        }


    }
    checkAllowedCoords(givenX, givenY)
    {
        var finalAllowedCoords = []
        finalAllowedCoords = [
          [givenX, givenY+70],
          [givenX, givenY-70],
          [givenX+70, givenY],
          [givenX-70, givenY],
        ]
        return finalAllowedCoords;
    }
    findOtherPossibilities(givenArray, whichPos) {
        var otherPossibility1 = [];
        var otherPossibility2 = [];
        var otherPossibility3 = [];
        otherPossibility1.push(givenArray[6])
        otherPossibility1.push(givenArray[3])
        otherPossibility1.push(givenArray[0])
        otherPossibility1.push(givenArray[7])
        otherPossibility1.push(givenArray[4])
        otherPossibility1.push(givenArray[1])
        otherPossibility1.push(givenArray[8])
        otherPossibility1.push(givenArray[5])
        otherPossibility1.push(givenArray[2])

        otherPossibility2.push(otherPossibility1[6])
        otherPossibility2.push(otherPossibility1[3])
        otherPossibility2.push(otherPossibility1[0])
        otherPossibility2.push(otherPossibility1[7])
        otherPossibility2.push(otherPossibility1[4])
        otherPossibility2.push(otherPossibility1[1])
        otherPossibility2.push(otherPossibility1[8])
        otherPossibility2.push(otherPossibility1[5])
        otherPossibility2.push(otherPossibility1[2])

        otherPossibility3.push(otherPossibility2[6])
        otherPossibility3.push(otherPossibility2[3])
        otherPossibility3.push(otherPossibility2[0])
        otherPossibility3.push(otherPossibility2[7])
        otherPossibility3.push(otherPossibility2[4])
        otherPossibility3.push(otherPossibility2[1])
        otherPossibility3.push(otherPossibility2[8])
        otherPossibility3.push(otherPossibility2[5])
        otherPossibility3.push(otherPossibility2[2])

        if (whichPos == 1)
        {
            return otherPossibility1;
        }

        if (whichPos == 2)
        {
            return otherPossibility2;
        }

        if (whichPos == 3)
        {
            return otherPossibility3;
        }
      }

      async makeButton() {
        //this.scene.start('SceneWon')
        var button2 = this.plugins.get('rexbuttonplugin').add(this.buttonSquare, {
            enable: true,
            mode: 0,            // 0|'press'|1|'release'
           // clickInterval: 100  // ms
        });
        button2.on('click', function (button, gameObject, pointer, event) {
            this.doneButton.visible = false;
            this.doneButtonClosed = this.add.image(254, 750, 'doneButtonOP')
            this.doneButtonClosed.scaleX = 0.1;
            this.doneButtonClosed.scaleY = 0.1;
        }, this);
        var button = this.plugins.get('rexbuttonplugin').add(this.buttonSquare, {
            enable: true,
            mode: 1,
        });
        button.on('click', function (button, gameObject, pointer, event) {
            console.log('asdf')
            this.doneButton.visible = true;
            this.doneButtonClosed.destroy();
            var innerGBColors = [];
            var isSame;
            for(var i = 0; i <= 8; i++)
            {
                this.solutionColors[i] = this.gsSolution[i].squareColor;
            }
            this.gb3x3Colors();

            isSame = this.checkArrays(this.innerGBColors, this.solutionColors);



            if (isSame == true)
            {
                countdown = 1
                this.scene.start('SceneWon')
                analytics.logEvent('Finished_a_puzzle')
            }
            if (isSame == false)
            {
                this.buttonSquare.setFillStyle(0xFF0000)
                this.wrongAnimation(this.buttonSquare);
                this.incorrectSound.play();
                counter+=5;
                if (this.finishedFade == true)
                {
                    this.penaltyText = this.add.text(420, 320, '+5', {fontFamily: 'Balsamiq Sans', color: "#FF0000", fontSize: '30px'})
                    this.penaltyText.alpha = 0;
                    const tween = this.tweens.add({
                        targets: [this.penaltyText],
                        alpha: 1,
                        duration: 1000,
                        repeat: 0,
    
                      });
                      const tween2 = this.tweens.add({
                        targets: [this.penaltyText],
                        scaleX: 1.5,
                        scaleY  : 1.5,
                        duration: 1000,
                        repeat: 0,
    
    
                      });
                      this.finishedFade = false;
                }
    
            }



        }, this);
      }

      wrongAnimation(givenButton)
      {

        var setOrig = this.time.addEvent({
            delay: 500,
            callback: this.setButtonBlue,
            callbackScope: this,
            loop: false,

        });

      }
      setButtonRed() {

            this.buttonSquare.setFillStyle(0xFF0000)
      }
      setButtonBlue(givenButton) {
        this.buttonSquare.setFillStyle(0x6F91C7)
        var resetFade = this.time.addEvent({
            delay: 500,
            callback: this.fadeOutText,
            callbackScope: this,
            loop: false,

        });

     }
     fadeOutText() {
         //console.log('hi')
        const tween3 = this.tweens.add({
            targets: [this.penaltyText],
            alpha: 0,
            duration: 1000,
            repeat: 0,


          });
        this.finishedFade = true;
     }


}


const GetValue = Phaser.Utils.Objects.GetValue;
var CreateLoginDialog = function (scene, config, onSubmit) {
    var username = GetValue(config, 'username', 'Username');
    var password = GetValue(config, 'password', '');
    var title = GetValue(config, 'title', 'Welcome');
    var x = GetValue(config, 'x', 0);
    var y = GetValue(config, 'y', 0);
    var width = GetValue(config, 'width', undefined);
    var height = GetValue(config, 'height', undefined);

    var background = scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_PRIMARY);
    var titleField = scene.add.text(0, 0, title, {fontSize: '30px', color: '#000000', fontFamily: 'Balsamiq Sans' });
    var backgroundRectangle = scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(1, 0xC6CEBC)
    var takenUsername = scene.add.text(110, 420, 'This username is already in use', {color: '#FF0000', fontFamily: 'Balsamiq Sans'})
    takenUsername.visible = false;
    var userNameField = scene.rexUI.add.label({
        orientation: 'x',
        background: backgroundRectangle,
        //icon: scene.add.image(0, 0, 'user'),
        text: scene.rexUI.add.BBCodeText(0, 0, username, { fixedWidth: 250, fixedHeight: 36, valign: 'center', color: '#000000', fontFamily: 'Balsamiq Sans' }),
        space: { top: 5, bottom: 5, left: 15, right: 15, }
    })
        .setInteractive()
        .on('pointerdown', function () {
            var checkingUsedUsername;
            var config = {
                onTextChanged: async function(textObject, text) {
                    username = text;
                    textObject.text = text;
                    checkingUsedUsername = await leaderBoard.getScore(`${textObject.text}`)
                    if (checkingUsedUsername != undefined)
                    {
                        console.log('Username is taken!')
                        backgroundRectangle.setStrokeStyle(1, 0xFF0000, 1);
                        takenUsername.visible = true;
                    } else {
                        backgroundRectangle.setStrokeStyle(1, 0xC6CEBC, 1);
                        takenUsername.visible = false;
                    }
                    console.log(textObject.text);
                }
            }
            scene.rexUI.edit(userNameField.getElement('text'), config);
        });

    var loginButton = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 20, 15, 10, 0xC6CEBC),
        text: scene.add.text(0, 0, 'Sign Up', {fontFamily: 'Balsamiq Sans', fontSize: '23px', fontStyle: 'bold'}),
        space: { top: 8, bottom: 8, left: 16, right: 16 }
    })
        .setInteractive()
        .on('pointerdown', function () {
            loginDialog.emit('login', username, password);
            console.log(username)
        });

    var loginDialog = scene.rexUI.add.sizer({
        orientation: 'y',
        x: x,
        y: y,
        width: width,
        height: height,
    })
        .addBackground(background)
        .add(titleField, 0, 'center', { top: 30, bottom: 30, left: 30, right: 30 }, false)
        .add(userNameField, 0, 'left', { bottom: 40, left: 75, right: 75 }, true)
        .add(loginButton, 0, 'center', { bottom: 30, left: 30, right: 30 }, false)
        .layout();
    return loginDialog;
};

var markPassword = function (password) {
    return new Array(password.length + 1).join('•');
};

var config = {
     type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 503,
    height: 800,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
        createContainer: true
    },
    scene: SceneMain
};