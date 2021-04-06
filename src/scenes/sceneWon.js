import Phaser from "phaser";
import { counter, moveCounter } from "./SceneMain";

import { leaderBoard, bgMusic, calledBack, analytics } from "./SceneStart";

export { calledBack };
// const sceneWonMade;
// export { sceneWonMade }

const COLOR_PRIMARY = 0xffffff;

const { GetValue } = Phaser.Utils.Objects;
const CreateLoginDialog = function createLoginDialog(scene, config) {
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
  const longUsername = scene.add.text(110, 420, "This username is too long", {
    color: "#FF0000",
    fontFamily: "Balsamiq Sans",
  });
  takenUsername.visible = false;
  longUsername.visible = false;

  const userNameField = scene.rexUI.add
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
      const userNameConfig = {
        async onTextChanged(textObject, text) {
          // let textObjText;
          // textObjText = textObject.text
          username = text;
          textObject.text = text;
          checkingUsedUsername = await leaderBoard.getScore(
            `${textObject.text}`
          );
          if (checkingUsedUsername !== undefined) {
            backgroundRectangle.setStrokeStyle(1, 0xff0000, 1);
            takenUsername.visible = true;
            longUsername.visible = false;
          } else {
            backgroundRectangle.setStrokeStyle(1, 0xc6cebc, 1);
            takenUsername.visible = false;
          }
          if (textObject.text.length > 11) {
            backgroundRectangle.setStrokeStyle(1, 0xff0000, 1);
            longUsername.visible = true;
            takenUsername.visible = false;
          } else {
            backgroundRectangle.setStrokeStyle(1, 0xc6cebc, 1);
            longUsername.visible = false;
          }
        },
      };
      scene.rexUI.edit(userNameField.getElement("text"), userNameConfig);
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
    });

  const loginDialog = scene.rexUI.add
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

export default class SceneWon extends Phaser.Scene {
  constructor() {
    super("SceneWon");
  }

  preload() {
    this.load.image("wonBG", "assets/images/NewWonScreen.png");
    this.load.image("NextButtonOP", "assets/images/NextButtonOP.png");
    this.load.plugin(
      "rexroundrectangleplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js",
      true
    );
    this.load.plugin(
      "rexbuttonplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbuttonplugin.min.js",
      true
    );
    this.load.image("QuitButtonNP", "assets/images/QuitButtonNP.png");
    this.load.image("QuitButtonOP", "assets/images/QuitButtonOP.png");
    this.load.audio("FinishedSFX", "assets/Sound/FinishedSFX.mp3");
    this.load.scenePlugin({
      key: "rexuiplugin",
      url:
        "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      sceneKey: "rexUI",
    });
  }

  async create() {
    bgMusic.stop();
    this.finishedSFX = this.sound.add("FinishedSFX");
    this.finishedSFX.play();
    this.playButton = this.add.rexRoundRectangle(
      130,
      700,
      220,
      70,
      16,
      0x6f91c7
    );

    this.makePlayAgainButton(this.playButton);
    this.quitButton = this.add.rexRoundRectangle(
      380,
      700,
      220,
      70,
      16,
      0xff0000
    );

    this.makeLeaveButton(this.quitButton);

    this.movesNumX = 395;
    this.timeNumX = 170;
    this.bg = this.add.image(0, -40, "wonBG");
    this.bg.scaleX = 0.47;
    this.bg.scaleY = 0.47;
    this.bg.setOrigin(0, 0);

    this.timeNum = this.add.text(this.timeNumX, 570, counter, {
      fontFamily: "Balsamiq Sans",
      fontStyle: "bold",
      fontSize: "30px",
      color: "#000000",
    });

    this.movesNum = this.add.text(this.movesNumX, 570, moveCounter, {
      fontFamily: "Balsamiq Sans",
      fontStyle: "bold",
      fontSize: "30px",
      color: "#000000",
    });

    // console.log(hasSwitched)
    this.quitButtonNP = this.add.image(370, 692, "QuitButtonNP");
    this.quitButtonNP.scaleX = 0.114;
    this.quitButtonNP.scaleY = 0.11;

    const userUsername = localStorage.getItem("username");
    const UserRank = await leaderBoard.getRank(`${userUsername}`);
    const UserTopScore = await leaderBoard.getScore(`${userUsername}`);

    //   console.log(userUsername)
    //   console.log(leaderBoard)
    const value = localStorage.getItem("username");
    if (value == null) {
      const loginDialog = CreateLoginDialog(this, {
        x: 250,
        y: 400,
        title: "Sign up to submit your time",
        username: "Enter desired username",
        password: "123",
      })
        .on("login", async (username) => {
          localStorage.setItem("username", `${username}`);
          // print.text += `${username}:${password}\n`;
          const ifExists = await leaderBoard.getScore(`${username}`);
          const ifLong = username.length;

          if (ifExists === undefined && ifLong <= 11) {
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
    } else {
      const UserTopTime = UserTopScore.score;
      if (counter < UserTopTime * -1) {
        leaderBoard
          .setUser(`${userUsername}`)
          .post(counter * -1, { moves: `${moveCounter}` });

        this.beatenHSText = this.add.text(
          50,
          620,
          `You are now top ${UserRank.rank + 1} on the leaderboard!`,
          { fontFamily: "Balsamiq Sans ", fontSize: "25px" }
        );
      }
      // this.scene.start('SceneWon')
    }
  }

  makeLeaveButton(givenButton) {
    const button2 = this.plugins.get("rexbuttonplugin").add(givenButton, {
      enable: true,
      mode: 0, // 0|'press'|1|'release'
      // clickInterval: 100  // ms
    });
    button2.on(
      "click",
      function onClick() {
        this.quitButtonNP.visible = false;
        this.quitButtonOP = this.add.image(370, 692, "QuitButtonOP");
        this.quitButtonOP.scaleX = 0.114;
        this.quitButtonOP.scaleY = 0.11;
      },
      this
    );

    const button = this.plugins.get("rexbuttonplugin").add(givenButton, {
      enable: true,
      mode: 1, // 0|'press'|1|'release'
      // clickInterval: 100  // ms
    });
    button.on(
      "click",
      function onClick() {
        this.quitButtonNP.visible = true;
        this.quitButtonOP.destroy();
        this.scene.start("SceneStart");
        analytics.logEvent("Quitting_main_game");
        bgMusic.play();
      },
      this
    );
  }

  makePlayAgainButton(givenButton) {
    const button2 = this.plugins.get("rexbuttonplugin").add(givenButton, {
      enable: true,
      mode: 0, // 0|'press'|1|'release'
      // clickInterval: 100  // ms
    });
    button2.on(
      "click",
      function onClick() {
        this.playButtonOP = this.add.image(55, 782, "NextButtonOP");
        this.playButtonOP.scaleX = 0.114;
        this.playButtonOP.scaleY = 0.11;
      },
      this
    );

    const button = this.plugins.get("rexbuttonplugin").add(givenButton, {
      enable: true,
      mode: 1, // 0|'press'|1|'release'
      // clickInterval: 100  // ms
    });
    button.on(
      "click",
      function onClick() {
        this.playButtonOP.destroy();
        this.scene.start("SceneMain");
        analytics.logEvent("Playing_another_game");
        bgMusic.play();
        moveCounter = 0;
      },
      this
    );
  }
}
