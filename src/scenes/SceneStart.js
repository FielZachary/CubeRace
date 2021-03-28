import Phaser from 'phaser';
export { leaderBoard }
var leaderBoard;

if ( calledBack == undefined) {
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
        // leaderBoard.setUser('dummy1').post(101 * -1, { moves: '30' });
        // leaderBoard.setUser('dummy2').post(102 * -1, { moves: '30' });
        // leaderBoard.setUser('dummy3').post(103 * -1, { moves: '30' });
        // leaderBoard.setUser('dummy4').post(104 * -1, { moves: '30' });
        // leaderBoard.setUser('dummy5').post(105 * -1, { moves: '30' });
        // leaderBoard.setUser('dummy6').post(106 * -1, { moves: '30' });





        //console.log('asdl;')
        this.buttonSquare = this.add.rectangle(195, 542.5, 330, 80, 0x000000)
        this.leaderBoardSquare = this.add.rectangle(135, 690, 210, 130, 0x000000)


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
    

        
        var button3 = this.plugins.get('rexbuttonplugin').add(this.leaderBoardSquare, {
            enable: true,
            mode: 1,            // 0|'press'|1|'release'
            // clickInterval: 100  // ms
        });
        button3.on('click', function (button, gameObject, pointer, event) {
            this.scene.start('SceneLeaderboard')
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
        //this.scene.start('SceneLeaderboard')
        //console.log('end')

    }
    update() {}
    playMusic() {
        this.bgMusic = this.sound.add('BGMusic')
        this.bgMusic.play();
        this.bgMusic.loop = true;
    }
}


// //localStorage.setItem('name', 'zac');
// var value = localStorage.getItem('name');
// if (value == null) {
//     gotologin
// } else {
//     gotoscore
// }
