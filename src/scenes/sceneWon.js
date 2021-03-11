import Phaser from 'phaser';
import { counter } from '../scenes/SceneMain'
import { moveCounter } from '../scenes/SceneMain'
export default class SceneWon extends Phaser.Scene {
    constructor() {
        super('SceneWon');

    }
    preload()
    {
    	this.load.image('wonBG', 'assets/images/NewWonScreen.jpg')
        this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
        this.load.plugin('rexbuttonplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbuttonplugin.min.js', true);
    }
    create() {

        this.playButton = this.add.rexRoundRectangle(120, 740 , 220, 70, 16, 0x6F91C7)
        //this.playAgainText =  this.add.text(120, 700, 'Play', {fontFamily: 'Verdana', fontStyle: 'bold', fontSize: '30px'})
        this.makePlayAgainButton(this.playButton)

        this.quitButton = this.add.rexRoundRectangle(370, 740 , 220, 70, 16, 0xFF0000)
       // this.quitText =  this.add.text(300, 700, 'Leave', {fontFamily: 'Verdana', fontStyle: 'bold', fontSize: '30px'})
        this.makeLeaveButton(this.quitButton)
        this.movesNumX = 435;
        this.timeNumX = 193;
        this.bg = this.add.image(0, -40, 'wonBG')
        this.bg.scaleX = 0.11375
        this.bg.scaleY = 0.11375
        this.bg.setOrigin(0, 0)
        console.log('asdpofihsadopifh')
        // this.wonChar = this.add.image(247, 290, 'wonChar')
        // this.wonChar.scaleX = 0.8
        // this.wonChar.scaleY = 0.8
        // this.whiteSquare = this.add.rexRoundRectangle(247, 450, 350, 250, 32, 0xECECEC);
        // this.whiteSquare.setOrigin(0.5, 0.5)
        // this.blueRec = this.add.rexRoundRectangle(247, 320, 250, 50, 16, 0x6F91C7);
        // this.completeText = this.add.text(162, 300, 'completed!', {fontFamily: 'Montserrat', fontStyle: 'bold', fontSize: '30px'})
        // this.timeText = this.add.text(130, 350, 'time', {fontFamily: 'Verdana', fontStyle: 'bold', fontSize: '30px', color: "#6F91C7"})
        // if(counter == 10)
        // {
        //     this.timeNumX -= 15;
        // }
        // if(counter == 100)
        // {
        //     this.timeNumX -= 30;
        // }
        this.timeNum = this.add.text(this.timeNumX, 575, counter , {fontFamily: 'Verdana', fontStyle: 'bold', fontSize: '30px', color: "#000000"})
        //this.movesText = this.add.text(280, 350, 'moves', {fontFamily: 'Verdana', fontStyle: 'bold', fontSize: '30px', color: "#6F91C7"})
        // if(moveCounter >= 10)
        // {
        //     this.movesNumX += 15;
        // } else if(moveCounter >= 100)
        // {
        //     this.movesNumX += 15;
        // }

        this.movesNum = this.add.text(this.movesNumX, 575, moveCounter, {fontFamily: 'Verdana', fontStyle: 'bold', fontSize: '30px', color: "#000000"})
        console.log(counter)
       // console.log(hasSwitched)

        
    }
    update() {}
    makeLeaveButton(givenButton) {
        var button = this.plugins.get('rexbuttonplugin').add(givenButton, {
            enable: true,
            mode: 1,            // 0|'press'|1|'release'
            // clickInterval: 100  // ms
        });
        button.on('click', function (button, gameObject, pointer, event) {

            this.scene.start('SceneStart')
            
        }, this);
      }
      makePlayAgainButton(givenButton) {
        var button = this.plugins.get('rexbuttonplugin').add(givenButton, {
            enable: true,
            mode: 1,            // 0|'press'|1|'release'
            // clickInterval: 100  // ms
        });
        button.on('click', function (button, gameObject, pointer, event) {

            this.scene.start('SceneMain')
            moveCounter = 0;
            
        }, this);
      }
}