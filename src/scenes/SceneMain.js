import Phaser from "phaser";
import GameSquare from "../classes/gamesquare";
import BlankGameSquare from "../classes/blanksquare";
import { analytics } from "./SceneStart";

import { ifSoundOn } from "./SceneSettings";

let counter = 0;
let countdown = 1;
let moveCounter = 0;
let hasAdjusted = 0;
let MhasAdjusted = 0;

export { counter };
export { moveCounter };

// import {sceneWonMade} from '../scenes/sceneWon'

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain", { key: "examples" });
  }

  preload() {
    this.load.audio("incorrect", "assets/Sound/wrongSFX.mp3");
    this.load.image("screenBG", "assets/images/bg4.png");
    this.load.image("ExitButton", "assets/images/ExitButton.png");
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
    this.load.image("doneButtonNP", "assets/images/DoneButtonNP.png");
    this.load.image("doneButtonOP", "assets/images/DoneButtonOP.png");
    this.load.audio("MovePiece", "assets/Sound/MovePieceSFX.mp3");
    this.load.scenePlugin({
      key: "rexuiplugin",
      url:
        "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      sceneKey: "rexUI",
    });
  }

  create() {
    hasAdjusted = 0;
    MhasAdjusted = 0;
    moveCounter = 0;
    counter = 0;

    this.pieceMoveSound = this.sound.add("MovePiece");
    this.bg = this.add.image(-10, 140, "screenBG");
    this.bg.scaleX = 0.5;
    this.bg.scaleY = 0.5;
    this.bg.setOrigin(0.155, 0.17);
    this.graySquare = this.add.rexRoundRectangle(
      254,
      530,
      350,
      350,
      16,
      0xececec
    );
    this.graySquare.alpha = 1;
    this.buttonSquare = this.add.rexRoundRectangle(
      254,
      750,
      180,
      50,
      16,
      0x6f91c7
    );

    this.doneButton = this.add.image(254, 750, "doneButtonNP");
    this.doneButton.scaleX = 0.1;
    this.doneButton.scaleY = 0.1;
    this.incorrectSound = this.sound.add("incorrect");
    // this.helpButton = this.add.rectangle()

    this.purpleOutline = this.add.rexRoundRectangle(
      254,
      210,
      207,
      207,
      16,
      0x6a0dad
    );
    this.purpleOutline.alpha = 0.2;

    this.purpleOutline2 = this.add.rexRoundRectangle(
      254,
      530,
      207,
      207,
      16,
      0x6a0dad
    );
    this.purpleOutline2.alpha = 0.2;

    this.transparentRec = this.add.rexRoundRectangle(
      73,
      270,
      130,
      80,
      16,
      0xececec
    );
    this.transparentRec.alpha = 0.8;
    this.blueRec = this.add.rexRoundRectangle(73, 230, 90, 30, 16, 0x6f91c7);
    this.movesText = this.add.text(39, 216, "Moves", {
      fontFamily: "Balsamiq Sans",
      fontSize: "23px",
      fontStyle: "bold",
    });
    this.movesNum = this.add.text(60, 250, moveCounter, {
      fontFamily: "Balsamiq Sans",
      fontSize: "40px",
      color: "#000000",
    });

    this.transparentRec2 = this.add.rexRoundRectangle(
      433,
      270,
      130,
      80,
      16,
      0xececec
    );
    this.transparentRec2.alpha = 0.7;
    this.blueRec2 = this.add.rexRoundRectangle(433, 230, 90, 30, 16, 0x6f91c7);
    this.timerText = this.add.text(402, 217, "Timer", {
      fontFamily: "Balsamiq Sans",
      fontStyle: "bold",
      fontSize: "23px",
    });

    this.gsSolution = [];
    this.gsGameBoard = [];
    this.solutionColors = [];
    this.solX = 184;
    this.solY = 140;
    this.gbX = 114;
    this.gbY = 390;
    this.colorArray = [
      1,
      1,
      1,
      1,
      2,
      2,
      2,
      2,
      3,
      3,
      3,
      3,
      4,
      4,
      4,
      4,
      5,
      5,
      5,
      5,
      6,
      6,
      6,
      6,
    ];
    this.setSolution();
    this.setGameBoard();
    counter = 0;
    this.makeButton();
    this.finishedFade = true;
    this.exitButton = this.add.rectangle(40, 40, 20, 20);
    this.exitButtonImg = this.add.image(40, 40, "ExitButton");
    this.exitButtonImg.scaleX = 0.5;
    this.exitButtonImg.scaleY = 0.5;
    const eButton = this.plugins
      .get("rexbuttonplugin")
      .add(this.exitButtonImg, {
        enable: true,
        mode: 0, // 0|'press'|1|'release'
        // clickInterval: 100  // ms
      });
    eButton.on(
      "click",
      function onClick() {
        //  calledBack = true;
        countdown = 1;
        this.scene.start("SceneStart");
        analytics.logEvent("Left_main_game");
      },
      this
    );

    this.timerNumText = this.add.text(420, 250, counter, {
      fontFamily: "Balsamiq Sans",
      color: "#000000",
      fontSize: "40px",
    });

    this.time.addEvent({
      delay: 1000, // ms
      callback: this.updateCountDown,
      // args: [],
      callbackScope: this,
      repeat: 2,
    });

    this.countDownText = this.add.text(232, 400, `${countdown}`, {
      fontFamily: "Balsamiq Sans",
      color: "#000000",
      fontSize: "80px",
    });
    //  this.scene.start('SceneWon')
  }

  updateCounter() {
    counter += 1;
    this.timerNumText.setText(counter);
    if (counter >= 10) {
      if (hasAdjusted === 0) {
        this.timerNumText.x -= 8;
        hasAdjusted = 1;
      }
    }
    if (counter >= 100) {
      if (hasAdjusted === 1) {
        this.timerNumText.x -= 9;
        hasAdjusted = 2;
      }
    }
  }

  updateCountDown() {
    countdown += 1;
    if (countdown === 4) {
      this.countDownText.x -= 65;
      this.countDownText.setText("start!");
      this.tweens.add({
        targets: [this.countDownText],
        alpha: 0,
        duration: 1250,
        repeat: 0,
      });
      this.timer = this.time.addEvent({
        delay: 1000,
        callback: this.updateCounter,
        callbackScope: this,
        loop: true,
      });
    } else {
      this.countDownText.setText(countdown);
    }
  }

  setSolution() {
    this.shuffledArray = this.shuffle(this.colorArray);
    for (let i = 0; i <= 8; i += 1) {
      const colorNumber = this.determineColor(this.shuffledArray[i]);
      this.gsSolution[i] = new GameSquare(
        { scene: this },
        this.solX,
        this.solY,
        colorNumber,
        false,
        this.shuffledArray[i]
      );
      if (this.solX <= 330) {
        this.solX += 70;
      }
      if (this.solX > 330) {
        this.solX = 184;
        this.solY += 70;
      }
    }
  }

  setGameBoard() {
    this.bGS = new BlankGameSquare({ scene: this }, 394, 670, 0x000000);
    this.shuffle(this.colorArray);
    for (let i = 0; i <= 23; i += 1) {
      const colorNumber = this.determineColor(this.shuffledArray[i]);
      this.gsGameBoard[i] = new GameSquare(
        { scene: this },
        this.gbX,
        this.gbY,
        colorNumber,
        true,
        this.shuffledArray[i]
      );
      if (this.gbX <= 400) {
        this.gbX += 70;
      }
      if (this.gbX > 400) {
        this.gbX = 114;
        this.gbY += 70;
      }
    }
    this.zone = this.add.zone(394, 670, 60, 60).setRectangleDropZone(60, 60);
    this.graphics = this.add.graphics();
  }

  shuffle(array) {
    const newArray = array;
    for (let i = newArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    this.shuffledArray = newArray;
    return newArray;
  }

  determineColor(shuffledArray) {
    if (shuffledArray === 0) {
      this.squareColor = 0x000000;
    }
    if (shuffledArray === 1) {
      this.squareColor = 0x847777;
    }
    if (shuffledArray === 2) {
      this.squareColor = 0xcbccd1;
    }
    if (shuffledArray === 3) {
      this.squareColor = 0xff0000;
    }
    if (shuffledArray === 4) {
      this.squareColor = 0xffa500;
    }
    if (shuffledArray === 5) {
      this.squareColor = 0x6f91c7;
    }
    if (shuffledArray === 6) {
      this.squareColor = 0x228b22;
    }

    return this.squareColor;
  }

  switchZone(destinationX, destinationY) {
    this.zone.x = destinationX;
    this.zone.y = destinationY;
    this.bGS.switchSquare1(destinationX, destinationY);
    moveCounter += 1;
    this.movesNum.setText(moveCounter);
    if (ifSoundOn === true) {
      this.pieceMoveSound.play();
    }

    if (moveCounter >= 10) {
      if (MhasAdjusted === 0) {
        this.movesNum.x -= 7;
        MhasAdjusted = 1;
      }
    }
    if (moveCounter >= 100) {
      if (MhasAdjusted === 1) {
        this.movesNum.x -= 9;
        MhasAdjusted = 2;
      }
    }

    for (let i = 0; i <= 23; i += 1) {
      const isAllowed = this.checkAllowed(this.gsGameBoard[i].square);
      if (isAllowed === true) {
        this.gsGameBoard[i].square.setInteractive();
        this.input.on(
          "pointerdown",
          this.gsGameBoard[i].startDrag,
          this.gsGameBoard[i]
        );
      } else {
        this.gsGameBoard[i].square.disableInteractive();
        this.input.off(
          "pointerdown",
          this.gsGameBoard[i].startDrag,
          this.gsGameBoard[i]
        );
        this.input.off(
          "pointermove",
          this.gsGameBoard[i].moveDrag,
          this.gsGameBoard[i]
        );
        this.input.off("pointerup", this.gsGameBoard[i].stopDrag, this);
      }
    }
  }

  checkArrays(array1, array2) {
    let array12 = [];
    let array13 = [];
    let array14 = [];
    if (array1.length !== array2.length) {
      //  console.log('Not same length')
      return false;
    }
    for (let i = 0; i <= 7; i += 1) {
      if (array1[i] !== array2[i]) {
        this.findOtherPossibilities(array2);
        array12 = this.otherPossibility1;
        if (array1[i] !== array12[i]) {
          this.findOtherPossibilities(array12);
          array13 = this.otherPossibility2;
          if (array1[i] !== array13[i]) {
            this.findOtherPossibilities(array13);
            array14 = this.otherPossibility3;
            if (array1[i] !== array14[i]) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  gb3x3Colors() {
    //      this.testSquare = this.add.rectangle(184, 460, 80, 80)
    this.checkX = 184;
    this.checkY = 460;
    this.innerGBColors = [];
    for (let i = 0; i <= 8; i += 1) {
      for (let b = 0; b <= 23; b += 1) {
        // console.log(this.gsGameBoard[b].square.x + ' ' + checkX)
        if (this.gsGameBoard[b].square.x === this.checkX) {
          //  console.log(this.gsGameBoard[b].square.y + ' ' + checkY)
          if (this.gsGameBoard[b].square.y === this.checkY) {
            // console.log('im in')
            this.innerGBColors.push(this.gsGameBoard[b].squareColor);
          }
        }
      }
      if (this.checkX <= 324) {
        this.checkX += 70;
      }
      if (this.checkX > 324) {
        this.checkX = 184;
        this.checkY += 70;
      }
    }
  }

  checking3x3Colors() {
    for (let b = 0; b <= 23; b += 1) {
      //  console.log('im in')
      if (this.gsGameBoard[b].square.x === this.checkX) {
        this.innerGBColors.unshift(this.gsGameBoard[b]);
        if (this.checkX <= 330) {
          this.checkX += 70;
        }
        if (this.checkX > 330) {
          this.checkX = 190;
          this.checkY += 70;
        }
      }
    }
  }

  checkAllowed(givenObject) {
    this.finalAllowedCoords = this.checkAllowedCoords(
      this.bGS.square.x,
      this.bGS.square.y
    );
    for (let i = 0; i <= 3; i += 1) {
      if (givenObject.x === this.finalAllowedCoords[i][0]) {
        if (givenObject.y === this.finalAllowedCoords[i][1]) {
          return true;
        }
      }
    }
    return false;
  }

  checkAllowedCoords(givenX, givenY) {
    this.finalAllowedCoords = [];
    this.finalAllowedCoords = [
      [givenX, givenY + 70],
      [givenX, givenY - 70],
      [givenX + 70, givenY],
      [givenX - 70, givenY],
    ];
    return this.finalAllowedCoords;
  }

  findOtherPossibilities(givenArray) {
    this.otherPossibility1 = [];
    this.otherPossibility2 = [];
    this.otherPossibility3 = [];
    this.otherPossibility1.push(givenArray[6]);
    this.otherPossibility1.push(givenArray[3]);
    this.otherPossibility1.push(givenArray[0]);
    this.otherPossibility1.push(givenArray[7]);
    this.otherPossibility1.push(givenArray[4]);
    this.otherPossibility1.push(givenArray[1]);
    this.otherPossibility1.push(givenArray[8]);
    this.otherPossibility1.push(givenArray[5]);
    this.otherPossibility1.push(givenArray[2]);

    this.otherPossibility2.push(this.otherPossibility1[6]);
    this.otherPossibility2.push(this.otherPossibility1[3]);
    this.otherPossibility2.push(this.otherPossibility1[0]);
    this.otherPossibility2.push(this.otherPossibility1[7]);
    this.otherPossibility2.push(this.otherPossibility1[4]);
    this.otherPossibility2.push(this.otherPossibility1[1]);
    this.otherPossibility2.push(this.otherPossibility1[8]);
    this.otherPossibility2.push(this.otherPossibility1[5]);
    this.otherPossibility2.push(this.otherPossibility1[2]);

    this.otherPossibility3.push(this.otherPossibility2[6]);
    this.otherPossibility3.push(this.otherPossibility2[3]);
    this.otherPossibility3.push(this.otherPossibility2[0]);
    this.otherPossibility3.push(this.otherPossibility2[7]);
    this.otherPossibility3.push(this.otherPossibility2[4]);
    this.otherPossibility3.push(this.otherPossibility2[1]);
    this.otherPossibility3.push(this.otherPossibility2[8]);
    this.otherPossibility3.push(this.otherPossibility2[5]);
    this.otherPossibility3.push(this.otherPossibility2[2]);

    return this.otherPossibility1;
  }

  async makeButton() {
    // this.scene.start('SceneWon')
    const button2 = this.plugins.get("rexbuttonplugin").add(this.buttonSquare, {
      enable: true,
      mode: 0, // 0|'press'|1|'release'
      // clickInterval: 100  // ms
    });
    button2.on(
      "click",
      function onClick() {
        this.doneButton.visible = false;
        this.doneButtonClosed = this.add.image(254, 750, "doneButtonOP");
        this.doneButtonClosed.scaleX = 0.1;
        this.doneButtonClosed.scaleY = 0.1;
      },
      this
    );
    const button = this.plugins.get("rexbuttonplugin").add(this.buttonSquare, {
      enable: true,
      mode: 1,
    });
    button.on(
      "click",
      function onClick() {
        this.doneButton.visible = true;
        this.doneButtonClosed.destroy();

        for (let i = 0; i <= 8; i += 1) {
          this.solutionColors[i] = this.gsSolution[i].squareColor;
        }
        this.gb3x3Colors();

        const isSame = this.checkArrays(
          this.innerGBColors,
          this.solutionColors
        );

        if (isSame === true) {
          countdown = 1;
          this.scene.start("SceneWon");
          analytics.logEvent("Finished_a_puzzle");
        }
        if (isSame === false) {
          this.buttonSquare.setFillStyle(0xff0000);
          this.wrongAnimation(this.buttonSquare);
          this.incorrectSound.play();
          counter += 5;
          if (this.finishedFade === true) {
            this.penaltyText = this.add.text(420, 320, "+5", {
              fontFamily: "Balsamiq Sans",
              color: "#FF0000",
              fontSize: "30px",
            });
            this.penaltyText.alpha = 0;
            this.tweens.add({
              targets: [this.penaltyText],
              alpha: 1,
              duration: 1000,
              repeat: 0,
            });
            this.tweens.add({
              targets: [this.penaltyText],
              scaleX: 1.5,
              scaleY: 1.5,
              duration: 1000,
              repeat: 0,
            });
            this.finishedFade = false;
          }
        }
      },
      this
    );
  }

  wrongAnimation() {
    this.time.addEvent({
      delay: 500,
      callback: this.setButtonBlue,
      callbackScope: this,
      loop: false,
    });
  }

  setButtonRed() {
    this.buttonSquare.setFillStyle(0xff0000);
  }

  setButtonBlue() {
    this.buttonSquare.setFillStyle(0x6f91c7);
    this.time.addEvent({
      delay: 500,
      callback: this.fadeOutText,
      callbackScope: this,
      loop: false,
    });
  }

  fadeOutText() {
    // console.log('hi')
    this.tweens.add({
      targets: [this.penaltyText],
      alpha: 0,
      duration: 1000,
      repeat: 0,
    });
    this.finishedFade = true;
  }
}
