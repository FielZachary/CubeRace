import Phaser from "phaser";
import "regenerator-runtime";
import { leaderBoard } from "./SceneStart";

const COLOR_PRIMARY = 0xffffff;

let hasAccount = true;

// Initialize Firebase
// firebase.initializeApp(firebaseConfig)

export default class SceneLeaderboard extends Phaser.Scene {
  constructor() {
    super("SceneLeaderboard");
  }

  preload() {
    this.load.image("LBBG", "assets/images/LeaderboardScreen.png");
    this.load.image("LBBGTop3", "assets/images/LeaderboardScreen2.png");
    this.load.image("NextPageOP", "assets/images/NextPageOP.png");
    this.load.plugin(
      "rexfirebaseplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfirebaseplugin.min.js",
      true
    );
    this.load.plugin(
      "rexbuttonplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbuttonplugin.min.js",
      true
    );
    this.load.scenePlugin({
      key: "rexuiplugin",
      url:
        "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      sceneKey: "rexUI",
    });
  }

  async create() {
    this.exitSquare = this.add.rectangle(40, 30, 40, 40, 0x2d2d2d);
    // localStorage.removeItem('username');

    const value = localStorage.getItem("username");
    if (value == null) {
      hasAccount = false;
      this.bg = this.add.image(0, 0, "LBBGTop3");
      this.bg.scaleX = 0.47;
      this.bg.scaleY = 0.47;
      this.bg.setOrigin(0.135, 0.165);
    } else {
      const UserUsername = localStorage.getItem("username");

      var UserRank = await leaderBoard.getRank(`${UserUsername}`); // Remember to plus one since its ranking based off an array

      var UserScore = await leaderBoard.getScore(`${UserUsername}`);
      if (UserRank.rank <= 2) {
        this.bg = this.add.image(0, 0, "LBBGTop3");
        this.bg.scaleX = 0.47;
        this.bg.scaleY = 0.47;
        this.bg.setOrigin(0.135, 0.165);
      } else {
        this.bg = this.add.image(0, 0, "LBBG");
        this.bg.scaleX = 0.47;
        this.bg.scaleY = 0.47;
        this.bg.setOrigin(0.135, 0.165);

        this.UserName = this.add.text(80, 600, "You", {
          fontFamily: "Balsamiq Sans",
          fontSize: "35px",
          fontStyle: "bold",
          color: "#000000",
        });
        this.UserTime = this.add.text(
          300,
          595,
          `time: ${UserScore.score * -1} secs`,
          {
            fontFamily: "Balsamiq Sans",
            fontSize: "23px",
            fontStyle: "bold",
            color: "#A1A3A6",
          }
        );
        this.UserMoves = this.add.text(300, 620, `moves: ${UserScore.moves}`, {
          fontFamily: "Balsamiq Sans",
          fontSize: "23px",
          fontStyle: "bold",
          color: "#A1A3A6",
        });

        this.fourthNumText = this.add.text(42.5, 530, `${UserRank.rank + 1}`, {
          fontFamily: "Balsamiq Sans",
          fontSize: "45px",
          fontStyle: "bold",
        });
      }
    }

    const topUsers = await leaderBoard.loadFirstPage();

    const topUser = topUsers[0];
    const topTwoUser = topUsers[1];
    const topThreeUser = topUsers[2];

    if (hasAccount === true) {
      const UserUsername = localStorage.getItem("username");
      // console.log(UserUsername)

      var UserRank = await leaderBoard.getRank(`${UserUsername}`); // Remember to plus one since its ranking based off an array
      // console.log(UserRank)

      var UserScore = await leaderBoard.getScore(`${UserUsername}`);
    }

    // console.log(UserScore)

    this.firstNum = 1;
    this.secondNum = 2;
    this.thirdNum = 3;

    this.firstNumText = this.add.text(50, 70, `${this.firstNum}`, {
      fontFamily: "Balsamiq Sans",
      fontSize: "45px",
      fontStyle: "bold",
    });
    this.secondNumText = this.add.text(42.5, 220, `${this.secondNum}`, {
      fontFamily: "Balsamiq Sans",
      fontSize: "45px",
      fontStyle: "bold",
    });
    this.thirdNumText = this.add.text(47.5, 377, `${this.thirdNum}`, {
      fontFamily: "Balsamiq Sans",
      fontSize: "45px",
      fontStyle: "bold",
    });

    const button2 = this.plugins.get("rexbuttonplugin").add(this.exitSquare, {
      enable: true,
      mode: 0, // 0|'press'|1|'release'
      // clickInterval: 100  // ms
    });
    button2.on(
      "click",
      function () {
        this.scene.start("SceneStart");
      },
      this
    );

    // console.log(this.topScore)
    // leaderBoard.setUser('1', 'zacurry1').post(10, { moves: '30' });
    // var user1Score = await leaderBoard.getScore('1')

    // leaderBoard.setUser('2', 'BTA Ashy').post(15, { moves: '40' });
    // var user2Score = await leaderBoard.getScore('2')
    // console.log(user2Score)
    // leaderBoard.setUser('3', 'BTA Simang').post(20, { moves: '50' });
    // var user3Score = await leaderBoard.getScore('3')

    // leaderBoard.setUser('4', 'wolfxper').post(25, { moves: '60' });
    // var user4Score = await leaderBoard.getScore('4')

    this.firstUserName = this.add.text(80, 135, `${topUser.userID}`, {
      fontFamily: "Balsamiq Sans",
      fontSize: "35px",
      fontStyle: "bold",
      color: "#000000",
    });
    this.firstUserTime = this.add.text(
      300,
      130,
      `time: ${topUser.score * -1} secs`,
      {
        fontFamily: "Balsamiq Sans",
        fontSize: "23px",
        fontStyle: "bold",
        color: "#A1A3A6",
      }
    );
    this.firstUserMoves = this.add.text(300, 155, `moves: ${topUser.moves}`, {
      fontFamily: "Balsamiq Sans",
      fontSize: "23px",
      fontStyle: "bold",
      color: "#A1A3A6",
    });

    this.secondUserName = this.add.text(80, 285, `${topTwoUser.userID}`, {
      fontFamily: "Balsamiq Sans",
      fontSize: "35px",
      fontStyle: "bold",
      color: "#000000",
    });
    this.secondUserTime = this.add.text(
      300,
      280,
      `time: ${topTwoUser.score * -1} secs`,
      {
        fontFamily: "Balsamiq Sans",
        fontSize: "23px",
        fontStyle: "bold",
        color: "#A1A3A6",
      }
    );
    this.secondUserMoves = this.add.text(
      300,
      305,
      `moves: ${topTwoUser.moves}`,
      {
        fontFamily: "Balsamiq Sans",
        fontSize: "23px",
        fontStyle: "bold",
        color: "#A1A3A6",
      }
    );

    this.thirdUserName = this.add.text(80, 445, `${topThreeUser.userID}`, {
      fontFamily: "Balsamiq Sans",
      fontSize: "35px",
      fontStyle: "bold",
      color: "#000000",
    });
    this.thirdUserTime = this.add.text(
      300,
      440,
      `time: ${topThreeUser.score * -1} secs`,
      {
        fontFamily: "Balsamiq Sans",
        fontSize: "23px",
        fontStyle: "bold",
        color: "#A1A3A6",
      }
    );
    this.thirdUserMoves = this.add.text(
      300,
      465,
      `moves: ${topThreeUser.moves}`,
      {
        fontFamily: "Balsamiq Sans",
        fontSize: "23px",
        fontStyle: "bold",
        color: "#A1A3A6",
      }
    );

    // this.fourthNumText.text = `${UserRank.rank + 1}`
  }
}

const { GetValue } = Phaser.Utils.Objects;
const CreateLoginDialog = function (scene, config) {
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
  var userNameField = scene.rexUI.add
    .label({
      orientation: "x",
      background: scene.rexUI.add
        .roundRectangle(0, 0, 10, 10, 10)
        .setStrokeStyle(1, 0xc6cebc),
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
      const config = {
        onTextChanged(textObject, text) {
          username = text;
          textObject.text = text;
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
const markPassword = function (password) {
  return new Array(password.length + 1).join("•");
};
