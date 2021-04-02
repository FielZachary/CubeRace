import Phaser from 'phaser';
import { counter } from '../scenes/SceneMain'
import { moveCounter } from '../scenes/SceneMain'
import { leaderBoard } from "../scenes/SceneStart"
import { bgMusic } from "../scenes/SceneStart"
import { calledBack } from "../scenes/SceneStart"
import { analytics } from "../scenes/SceneStart"
export { calledBack }
// const sceneWonMade;
// export { sceneWonMade }



const COLOR_PRIMARY = 0xFFFFFF  ;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;


export default class SceneWon extends Phaser.Scene {
    constructor() {
        super('SceneWon');

    }
    preload()
    {

    	this.load.image('wonBG', 'assets/images/NewWonScreen.png')
        this.load.image('NextButtonOP', 'assets/images/NextButtonOP.png')
        this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
        this.load.plugin('rexbuttonplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbuttonplugin.min.js', true);
        this.load.image('QuitButtonNP', 'assets/images/QuitButtonNP.png')
        this.load.image('QuitButtonOP', 'assets/images/QuitButtonOP.png')
        this.load.audio('FinishedSFX', 'assets/Sound/FinishedSFX.mp3')
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });   

    }
    async create() {
        bgMusic.stop()
        this.finishedSFX = this.sound.add('FinishedSFX')
        this.finishedSFX.play();
        this.playButton = this.add.rexRoundRectangle(130, 700 , 220, 70, 16, 0x6F91C7)
        //this.playAgainText =  this.add.text(120, 700, 'Play', {fontFamily: 'Verdana', fontStyle: 'bold', fontSize: '30px'})
        this.makePlayAgainButton(this.playButton)
        this.quitButton = this.add.rexRoundRectangle(380, 700 , 220, 70, 16, 0xFF0000)
        // this.quitText =  this.add.text(300, 700, 'Leave', {fontFamily: 'Verdana', fontStyle: 'bold', fontSize: '30px'})
         this.makeLeaveButton(this.quitButton)


        this.movesNumX = 395;
        this.timeNumX = 170;
        this.bg = this.add.image(0, -40, 'wonBG')
        this.bg.scaleX = 0.47
        this.bg.scaleY = 0.47
        this.bg.setOrigin(0, 0)
        console.log('asdpofihsadopifh')

        this.timeNum = this.add.text(this.timeNumX, 570, counter , {fontFamily: 'Balsamiq Sans', fontStyle: 'bold', fontSize: '30px', color: "#000000"})


        this.movesNum = this.add.text(this.movesNumX, 570, moveCounter, {fontFamily: 'Balsamiq Sans', fontStyle: 'bold', fontSize: '30px', color: "#000000"})
        console.log(counter)
       // console.log(hasSwitched)
       this.quitButtonNP = this.add.image(370, 692, 'QuitButtonNP')
       this.quitButtonNP.scaleX = 0.114
       this.quitButtonNP.scaleY = 0.11



       var userUsername = localStorage.getItem('username')
       var UserRank = await leaderBoard.getRank(`${userUsername}`)
       var UserTopScore = await leaderBoard.getScore(`${userUsername}`)

       console.log(userUsername)
    //   console.log(userUsername)
    //   console.log(leaderBoard)
       var value = localStorage.getItem('username');
       if (value == null)
       {
           var loginDialog = CreateLoginDialog(this, {
               x: 250,
               y: 400,
               title: 'Sign up to submit your time',
               username: 'Enter desired username',
               password: '123',
           })
               .on('login', async function (username, password) {
                   localStorage.setItem('username', `${username}`)
                   //print.text += `${username}:${password}\n`;
                   var ifExists = await leaderBoard.getScore(`${username}`)
                   var ifLong = username.length
                   console.log(ifLong)
                   if (ifExists == undefined && ifLong <= 11)
                   {
                       //this.timer.paused = true;
                      // this.scene.start('SceneWon') 
                       leaderBoard.setUser(`${username}`).post(counter * -1, { moves: `${moveCounter}` });
                       loginDialog.destroy();
                          
                   } 
               })
               //.drawBounds(this.add.graphics(), 0xff0000)
               .popUp(500);

           var username = 'Username'

       } else {
           var UserTopTime = UserTopScore.score
           if (counter < UserTopTime * -1)
           {
               leaderBoard.setUser(`${userUsername}`).post(counter * -1, { moves: `${moveCounter}` });
               console.log('You have beaten your high score!')
               this.beatenHSText = this.add.text(50, 620, 'You are now top ' + ( UserRank.rank + 1 ) + ' on the leaderboard!', {fontFamily: 'Balsamiq Sans ', fontSize: '25px',})
           }
           //this.scene.start('SceneWon')
       }

       


        
    }
    update() {}
    makeLeaveButton(givenButton) {
        var button2 = this.plugins.get('rexbuttonplugin').add(givenButton, {
            enable: true,
            mode: 0,            // 0|'press'|1|'release'
            // clickInterval: 100  // ms
        });
        button2.on('click', function (button, gameObject, pointer, event) {
            this.quitButtonNP.visible = false       
            this.quitButtonOP = this.add.image(370, 692, 'QuitButtonOP')
            this.quitButtonOP.scaleX = 0.114
            this.quitButtonOP.scaleY = 0.11

            
        }, this);


        var button = this.plugins.get('rexbuttonplugin').add(givenButton, {
            enable: true,
            mode: 1,            // 0|'press'|1|'release'
            // clickInterval: 100  // ms
        });
        button.on('click', function (button, gameObject, pointer, event) {
            this.quitButtonNP.visible = true
            this.quitButtonOP.destroy();
            this.scene.start('SceneStart')
            analytics.logEvent('Quitting_main_game')
            bgMusic.play();
        }, this);
      }
      makePlayAgainButton(givenButton) {
        var button2 = this.plugins.get('rexbuttonplugin').add(givenButton, {
            enable: true,
            mode: 0,            // 0|'press'|1|'release'
            // clickInterval: 100  // ms
        });
        button2.on('click', function (button, gameObject, pointer, event) {
            console.log('Clicked!')
            this.playButtonOP = this.add.image(55, 782, 'NextButtonOP')
            this.playButtonOP.scaleX = 0.114
            this.playButtonOP.scaleY = 0.11
        }, this);


        var button = this.plugins.get('rexbuttonplugin').add(givenButton, {
            enable: true,
            mode: 1,            // 0|'press'|1|'release'
            // clickInterval: 100  // ms
        });
        button.on('click', function (button, gameObject, pointer, event) {
            this.playButtonOP.destroy();
            this.scene.start('SceneMain')
            analytics.logEvent('Playing_another_game')
            bgMusic.play();
            moveCounter = 0;
            
        }, this);
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
    var longUsername = scene.add.text(110, 420, 'This username is too long', {color: '#FF0000', fontFamily: 'Balsamiq Sans'})
    takenUsername.visible = false;
    longUsername.visible = false;

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
                        longUsername.visible = false;
                    } else {
                        backgroundRectangle.setStrokeStyle(1, 0xC6CEBC, 1);
                        takenUsername.visible = false;
                    }
                    if (textObject.text.length > 11) {
                        backgroundRectangle.setStrokeStyle(1, 0xFF0000, 1);
                        longUsername.visible = true
                        takenUsername.visible = false;
                    } else {
                        backgroundRectangle.setStrokeStyle(1, 0xC6CEBC, 1);
                        longUsername.visible = false;
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