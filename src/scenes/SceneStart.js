import Phaser from 'phaser';
export { leaderBoard }
export { bgMusic }
export { analytics }


firebase.initializeApp({
    apiKey: "AIzaSyAIR8i2ia1-fNmDSFYLWX28TXgmjfE4GLY",
    authDomain: "cuberace-5d31c.firebaseapp.com",
    databaseURL: "https://cuberace-5d31c-default-rtdb.firebaseio.com",
    projectId: "cuberace-5d31c",
    storageBucket: "cuberace-5d31c.appspot.com",
    messagingSenderId: "942525608410",
    appId: "1:942525608410:web:82b444e42e9c16562990e3",
    measurementId: "G-8EBYQP6CGV"
})

var leaderBoard;
var bgMusic;
const analytics = firebase.analytics();

//console.log(analytics)


if ( calledBack == undefined) {
    var calledOnce = false;
} else if (calledBack == true) {
    var calledOnce = false;
}

console.log('In scene start ' + calledBack)
var calledBack = false;
export { calledBack }



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
       this.load.audio('BGMusic', 'assets/Sound/CubeRaceBGMusic.mp3')
       this.load.plugin('rexfirebaseplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfirebaseplugin.min.js', true);
    }
    
    async create() {

        leaderBoard = this.plugins.get('rexfirebaseplugin').add.leaderBoard({
			root: 'MainLeaderBoard',
			// timeFilters: false,
			// timeFilterType: 'year',
			// pageItemCount: 100,
			// boardID: undefined,
			// tag: undefined
		});

        this.settingsSquare = this.add.rectangle(36, 37, 40, 40, 0x000000)
        this.buttonSquare = this.add.rectangle(195, 542.5, 330, 80, 0x000000)
        this.leaderBoardSquare = this.add.rectangle(135, 690, 210, 130, 0x000000)
        this.CFSquare = this.add.rectangle(375, 690, 210, 130, 0x000000)
        this.helpSquare = this.add.rectangle(435, 540, 80, 80, 0x000000 )


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
            analytics.logEvent('Play_new_game')
        }, this )
        this.buttonSquare.setOrigin(0.5, 0.5)

        
        var button3 = this.plugins.get('rexbuttonplugin').add(this.leaderBoardSquare, {
            enable: true,
            mode: 1,            // 0|'press'|1|'release'
            // clickInterval: 100  // ms
        });
        button3.on('click', function (button, gameObject, pointer, event) {
            this.scene.start('SceneLeaderboard')
            analytics.logEvent('Going_to_leaderboard')
        }, this )

        var button4 = this.plugins.get('rexbuttonplugin').add(this.CFSquare, {
            enable: true,
            mode: 1,            // 0|'press'|1|'release'
            // clickInterval: 100  // ms
        });
        button4.on('click', function (button, gameObject, pointer, event) {
            this.scene.start('SceneWIP')
        }, this )


        var settingsButton = this.plugins.get('rexbuttonplugin').add(this.settingsSquare, {
            enable: true,
            mode: 1,            // 0|'press'|1|'release'
            // clickInterval: 100  // ms
        });
        settingsButton.on('click', function (button, gameObject, pointer, event) {
            this.scene.start('SceneSettings')
            analytics.logEvent('Going_to_settings')
        }, this )

        var helpButton = this.plugins.get('rexbuttonplugin').add(this.helpSquare, {
            enable: true,
            mode: 1,            // 0|'press'|1|'release'
            // clickInterval: 100  // ms
        });
        helpButton.on('click', function (button, gameObject, pointer, event) {
            this.scene.start('SceneHelp')
            analytics.logEvent('Going_to_tutorial')
        }, this )


        
        this.mainBG = this.add.image(0, 0, 'mainBG')
        this.mainBG.scaleX = 0.47
        this.mainBG.scaleY = 0.47
        this.mainBG.setOrigin(0, 0)




        if (calledOnce == false)
        {
            console.log('playing music')
            this.playMusic();
            calledOnce = true;
        }
        

        //console.log(this.mainBG);
        // this.playButtonOP = this.add.image(198, 550, 'PlayButtonOP')
        // this.playButtonOP.scaleX = 0.15
        // this.playButtonOP.scaleY = 0.15
        //this.scene.start('SceneWon')
        //this.scene.start('SceneWIP')
        //console.log('end')

    }
    update() {}
    playMusic() {
        bgMusic = this.sound.add('BGMusic')
        bgMusic.play();
        bgMusic.loop = true;
    }
}


// //localStorage.setItem('name', 'zac');
// var value = localStorage.getItem('name');
// if (value == null) {
//     gotologin
// } else {
//     gotoscore
// }
