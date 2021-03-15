import Phaser from 'phaser';
export default class SceneStart extends Phaser.Scene {
    constructor() {
        
        super('SceneStart');
        console.log('dfjk')
    }
    preload()
    {
    	this.load.image('mainBG', 'assets/images/StartScreen.png')
       // this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
       this.load.plugin('rexbuttonplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbuttonplugin.min.js', true);
       this.load.image('PlayButtonOP', 'assets/images/PlayNGButtonOP.png')
    }
    
    create() {
        this.buttonSquare = this.add.rectangle(195, 542.5, 330, 80, 0x000000)

        var button2 = this.plugins.get('rexbuttonplugin').add(this.buttonSquare, {
            enable: true,
            mode: 0,            // 0|'press'|1|'release'
            // clickInterval: 100  // ms
        });
        button2.on('click', function (button, gameObject, pointer, event) {
    
            this.playButtonOP = this.add.image(198, 550, 'PlayButtonOP')
            this.playButtonOP.scaleX = 0.1515
            this.playButtonOP.scaleY = 0.15
        }, this);

        var button = this.plugins.get('rexbuttonplugin').add(this.buttonSquare, {
            enable: true,
            mode: 1,            // 0|'press'|1|'release'
            // clickInterval: 100  // ms
        });
        button.on('click', function (button, gameObject, pointer, event) {
            this.playButtonOP.destroy();
            console.log('button pressed')
            this.scene.start('SceneMain')
        }, this )
        this.buttonSquare.setOrigin(0.5, 0.5)

        
        this.mainBG = this.add.image(0, 0, 'mainBG')
        this.mainBG.scaleX = 0.47
        this.mainBG.scaleY = 0.47
        this.mainBG.setOrigin(0, 0)
        console.log(this.mainBG);
        // this.playButtonOP = this.add.image(198, 550, 'PlayButtonOP')
        // this.playButtonOP.scaleX = 0.15
        // this.playButtonOP.scaleY = 0.15
        //this.scene.start('SceneWon')

    }
    update() {}
}