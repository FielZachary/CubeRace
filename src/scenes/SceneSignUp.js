// import InputText from 'phaser3-rex-plugins/plugins/inputtext.js';
// import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import { leaderBoard } from "./SceneStart";

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

const COLOR_PRIMARY = 0xffffff;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export default class SceneSignUp extends Phaser.Scene {
  constructor() {
    super("SceneSignUp");
  }

  preload() {
    this.load.image(
      "user",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/person.png"
    );
    this.load.image(
      "password",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/key.png"
    );
    this.load.image("SUScreen", "assets/images/NormalBG.png");
    this.load.scenePlugin({
      key: "rexuiplugin",
      url:
        "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      sceneKey: "rexUI",
    });
  }

  create() {
    this.bg = this.add.image(0, 0, "SUScreen");
    this.bg.scaleX = 0.47;
    this.bg.scaleY = 0.47;
    this.bg.setOrigin(0.135, 0.165);

    localStorage.removeItem("username");

    const userUsername = localStorage.getItem("username");
    var loginDialog = CreateLoginDialog(this, {
      x: 250,
      y: 400,
      title: "Sign up to submit your time",
      username: "Enter desired username",
      password: "123",
    })
      .on("login", async function (username, password) {
        localStorage.setItem("username", `${username}`);
        // print.text += `${username}:${password}\n`;
        const ifExists = await leaderBoard.getScore(`${username}`);
        if (ifExists == undefined) {
          this.scene.start("SceneLeaderboard");
          // this.timer.paused = true;
          // this.scene.start('SceneWon')
          leaderBoard
            .setUser(`${username}`)
            .post(counter * -1, { moves: `${moveCounter}` });
          loginDialog.destroy();
        }
      })
      // .drawBounds(this.add.graphics(), 0xff0000)
      .popUp(500);

    const username = "Username";
  }

  update() {}
}

const { GetValue } = Phaser.Utils.Objects;
var CreateLoginDialog = function (scene, config, onSubmit) {
  let username = GetValue(config, "username", "Username");
  const password = GetValue(config, "password", "");
  const title = GetValue(config, "title", "Welcome");
  const x = GetValue(config, "x", 0);
  const y = GetValue(config, "y", 0);
  const width = GetValue(config, "width", undefined);
  const height = GetValue(config, "height", undefined);

  const background = scene.rexUI.add.roundRectangle(
    0,
    0,
    10,
    10,
    10,
    COLOR_PRIMARY
  );
  const titleField = scene.add.text(0, 0, title, {
    fontSize: "30px",
    color: "#000000",
    fontFamily: "Balsamiq Sans",
  });
  const backgroundRectangle = scene.rexUI.add
    .roundRectangle(0, 0, 10, 10, 10)
    .setStrokeStyle(1, 0xc6cebc);
  const takenUsername = scene.add.text(
    110,
    420,
    "This username is already in use",
    { color: "#FF0000", fontFamily: "Balsamiq Sans" }
  );
  takenUsername.visible = false;
  var userNameField = scene.rexUI.add
    .label({
      orientation: "x",
      background: backgroundRectangle,
      // icon: scene.add.image(0, 0, 'user'),
      text: scene.rexUI.add.BBCodeText(0, 0, username, {
        fixedWidth: 250,
        fixedHeight: 36,
        valign: "center",
        color: "#000000",
        fontFamily: "Balsamiq Sans",
      }),
      space: {
        top: 5,
        bottom: 5,
        left: 15,
        right: 15,
      },
    })
    .setInteractive()
    .on("pointerdown", () => {
      let checkingUsedUsername;
      const config = {
        async onTextChanged(textObject, text) {
          username = text;
          textObject.text = text;
          checkingUsedUsername = await leaderBoard.getScore(
            `${textObject.text}`
          );
          if (checkingUsedUsername != undefined) {
            console.log("Username is taken!");
            backgroundRectangle.setStrokeStyle(1, 0xff0000, 1);
            takenUsername.visible = true;
          } else {
            backgroundRectangle.setStrokeStyle(1, 0xc6cebc, 1);
            takenUsername.visible = false;
          }
          console.log(textObject.text);
        },
      };
      scene.rexUI.edit(userNameField.getElement("text"), config);
    });

  const loginButton = scene.rexUI.add
    .label({
      orientation: "x",
      background: scene.rexUI.add.roundRectangle(0, 0, 20, 15, 10, 0xc6cebc),
      text: scene.add.text(0, 0, "Sign Up", {
        fontFamily: "Balsamiq Sans",
        fontSize: "23px",
        fontStyle: "bold",
      }),
      space: {
        top: 8,
        bottom: 8,
        left: 16,
        right: 16,
      },
    })
    .setInteractive()
    .on("pointerdown", () => {
      loginDialog.emit("login", username, password);
      console.log(username);
    });

  var loginDialog = scene.rexUI.add
    .sizer({
      orientation: "y",
      x,
      y,
      width,
      height,
    })
    .addBackground(background)
    .add(
      titleField,
      0,
      "center",
      {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30,
      },
      false
    )
    .add(userNameField, 0, "left", { bottom: 40, left: 75, right: 75 }, true)
    .add(loginButton, 0, "center", { bottom: 30, left: 30, right: 30 }, false)
    .layout();
  return loginDialog;
};
