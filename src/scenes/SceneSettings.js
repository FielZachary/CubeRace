import { bgMusic } from './SceneStart'


let ifMusicOn = true;
let ifSoundOn = true;

export { ifMusicOn };
export { ifSoundOn };

export default class SceneSettings extends Phaser.Scene {
    constructor() {
        super('SceneSettings');
    }
    preload()
    {
        this.load.image('SettingsBG', 'assets/images/SettingsScreen.PNG')
        // this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
        this.load.plugin('rexbuttonplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbuttonplugin.min.js', true);
        this.load.image('SettingsOn', 'assets/images/SoundOn.png')
        this.load.image('SettingsOff', 'assets/images/SoundOff.png')
       // this.load.audio('BGMusic', 'assets/Sound/CubeRaceBGMusic.mp3')
        this.load.plugin('rexfirebaseplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfirebaseplugin.min.js', true);
    }
    create() {
        this.SoundRect = this.add.rectangle(360, 490, 100, 50, 0x000000)
        this.MusicRect = this.add.rectangle(360, 575, 100, 50, 0x000000)
        var exitButton = this.add.rectangle(40, 40, 40, 40, 0x000000)    

        this.mainBG = this.add.image(-2, 0, 'SettingsBG')
        this.mainBG.scaleX = 1
        this.mainBG.scaleY = 1
        this.mainBG.setOrigin(0, 0)

        this.SoundOn = this.add.image(360, 490, 'SettingsOn')
        this.SoundOn.scaleX = 0.45
        this.SoundOn.scaleY = 0.45
        if (ifSoundOn = true) {
            this.SoundOn.visible = true;
        } else {
            this.SoundOn.visible = false;
        }


        this.SoundOff = this.add.image(370, 490, 'SettingsOff')
        this.SoundOff.scaleX = 0.45
        this.SoundOff.scaleY = 0.45
        if (ifSoundOn == true) {
            this.SoundOff.visible = false;
        } else {
            this.SoundOff.visible = true;
        }


       // var ifMusicOn = true;
        this.MusicOn = this.add.image(360, 575, 'SettingsOn')
        this.MusicOn.scaleX = 0.45
        this.MusicOn.scaleY = 0.45
        if (ifMusicOn == true) {
            this.MusicOn.visible = true;
        } else {
            this.MusicOn.visible = false;
        }

        this.MusicOff = this.add.image(370, 575, 'SettingsOff')
        this.MusicOff.scaleX = 0.45
        this.MusicOff.scaleY = 0.45
        if (ifMusicOn == true) {
            this.MusicOff.visible = false;
        } else {
            this.MusicOff.visible = true;
        }
        //this.MusicOff.visible = false;

        var SoundButton = this.plugins.get('rexbuttonplugin').add(this.SoundRect, {
            enable: true,
            mode: 0,            // 0|'press'|1|'release'
           // clickInterval: 100  // ms
       });       
       SoundButton.on('click', function (button, gameObject, pointer, event) {
         //  calledBack = true;
            if (ifSoundOn == true ) {
                this.SoundOn.visible = false;
                this.SoundOff.visible = true;
                ifSoundOn = false;
            } else if (ifSoundOn == false) {
                this.SoundOn.visible = true;
                this.SoundOff.visible = false;
                ifSoundOn = true
            }
       }, this);    


       var MusicButton = this.plugins.get('rexbuttonplugin').add(this.MusicRect, {
        enable: true,
        mode: 0,            // 0|'press'|1|'release'
       // clickInterval: 100  // ms
   });       
      MusicButton.on('click', function (button, gameObject, pointer, event) {
     //  calledBack = true;
     if (ifMusicOn == true ) {
        this.MusicOn.visible = false;
        this.MusicOff.visible = true;
        ifMusicOn = false;
        bgMusic.stop();
    } else if (ifMusicOn == false) {
        this.MusicOn.visible = true;
        this.MusicOff.visible = false;
        ifMusicOn = true
        bgMusic.play();
    }
     }, this);     


     var eButton = this.plugins.get('rexbuttonplugin').add(exitButton, {
        enable: true,
        mode: 0,            // 0|'press'|1|'release'
       // clickInterval: 100  // ms
   });       
   eButton.on('click', function (button, gameObject, pointer, event) {
     //  calledBack = true;
       //countdown = 1
       this.scene.start('SceneStart')
   }, this);    




    }
    update() {}
}