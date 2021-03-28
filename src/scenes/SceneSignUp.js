// import InputText from 'phaser3-rex-plugins/plugins/inputtext.js';
// import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'

// export default class SceneSignUp extends Phaser.Scene {
//     constructor() {
//         super('SceneSignUp');
//     }
//     preload()
//     {
//         //this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true); 
//         this.load.image('SUScreen', 'assets/images/SignUpScreen.png')
//         this.load.scenePlugin({
//             key: 'rexuiplugin',
//             url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
//             sceneKey: 'rexUI'
//         });   
//         //this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true)
//     }
//     create() {
//         // console.log(';ab')
//         // this.bg = this.add.image(0, 0, 'SUScreen') 
//         // this.bg.scaleX = 0.47
//         // this.bg.scaleY = 0.47
//         // this.bg.setOrigin(0.152, 0.165)

            
//         // this.inputText = this.add.rexInputText(250, 382, 370, 53, {

//         //     type: 'textarea',    // 'text'|'password'|'textarea'|'number'|'color'|...
//         //     text: 'Username',
//         //     fontSize: '24px',
//         //     color: "#000000",
//         // })
//         // .on('textchange', function (inputText) {
//         //     //this.displayText.text = this.inputText.text;
//         // })
//         // .on('focus', function (inputText) {
//         //     console.log('On focus');
//         // })
//         // .on('blur', function (inputText) {
//         //     console.log('On blur');
//         // })
//         // .on('click', function (inputText) {
//         //     console.log('On click');
//         // })
//         // .on('dblclick', function (inputText) {
//         //     console.log('On dblclick');
//         // })


//         // const text = this.add.text(400, 300, 'Hello World', { fixedWidth: 150, fixedHeight: 36,  })
//         // text.setOrigin(0.5, 0.5)
    
//         // text.setInteractive().on('pointerdown', () => {
//         //     var config = {
//         //         onTextChanged: function(textObject, text) {
//         //             username = text;
//         //             textObject.text = text;
//         //         }
//         //     }
//         //     this.rexUI.edit(text, config)

//         // })


//         var username = 'abc'
//         var userNameField = this.rexUI.add.label({
//            // orientation: 'x',
//            // background: this.rexUI.add.roundRectangle(200, 200, 10, 10, 10).setStrokeStyle(2, 0x7b5e57),
//            // icon: this.add.image(0, 0, 'user'),
//             text: this.rexUI.add.BBCodeText(200, 200, username, { fixedWidth: 150, fixedHeight: 36, valign: 'center' }),
//             // space: { top: 5, bottom: 5, left: 5, right: 5, icon: 10, }
//         })
//         .setInteractive()
//         .on('pointerdown', function () {
//             console.log('hi')
//             var config = {
//                 onTextChanged: function(textObject, text) {
//                     username = text;
//                     textObject.text = text;
//                 }
//             }
//             this.rexUI.edit(userNameField.getElement('text'), config);
//         });


//         // this.textrect = this.add.rectangle(250, 382, 370, 53, 0x000000)
//         // console.log(this.inputText.text)
//     }
//     update() {}
// }

const COLOR_PRIMARY = 0xFFFFFF  ;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export default class SceneSignUp extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('user', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/person.png');
        this.load.image('password', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/key.png');
        this.load.image('SUScreen', 'assets/images/SignUpScreen.png')
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });        
    }

    create() {
        this.bg = this.add.image(0, 0, 'SUScreen') 
        this.bg.scaleX = 0.47
        this.bg.scaleY = 0.47
        this.bg.setOrigin(0.152, 0.165)
        var print = this.add.text(0, 0, '');

       var loginDialog = CreateLoginDialog(this, {
            x: 250,
            y: 400,
            title: 'Sign up to submit your time',
            username: 'Enter desired username',
            password: '123',
        })
            .on('login', function (username, password) {
                print.text += `${username}:${password}\n`;
                loginDialog.destroy();
            })
            //.drawBounds(this.add.graphics(), 0xff0000)
            .popUp(500);
        var username = 'Username'


    }

    update() { }
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
    var userNameField = scene.rexUI.add.label({
        orientation: 'x',
        background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(1, 0xC6CEBC),
        //icon: scene.add.image(0, 0, 'user'),
        text: scene.rexUI.add.BBCodeText(0, 0, username, { fixedWidth: 250, fixedHeight: 36, valign: 'center', color: '#000000', fontFamily: 'Balsamiq Sans' }),
        space: { top: 5, bottom: 5, left: 15, right: 15, }
    })
        .setInteractive()
        .on('pointerdown', function () {
            var config = {
                onTextChanged: function(textObject, text) {
                    username = text;
                    textObject.text = text;
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
    scene: SceneSignUp
};

//var game = new Phaser.Game(config);