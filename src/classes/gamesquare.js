let hasSwitched = true;

export default class GameSquare extends Phaser.GameObjects.Container {
  constructor(config, x, y, squareColor, ifgbS, colorNumber) {
    super(config.scene);
    this.scene = config.scene;
    this.randomColor = this.randomColor();
    this.square = this.scene.add.rexRoundRectangle(
      x,
      y,
      60,
      60,
      12,
      squareColor
    );
    this.add(this.square);
    this.scene.add.existing(this);
    this.origX = x;
    this.origY = y;
    this.allowed = false;
    this.squareColor = colorNumber;
    this.ifgbS = ifgbS;
    if (ifgbS == true) {
      var ifAllowed = this.checkAllowed();

      if (ifAllowed == true) {
        this.square.setInteractive();
        this.scene.input.on("pointerdown", this.startDrag, this);
      }
    }
    //this.notSwitched = false;
  }

  randomColor() {
    var randomColor = Phaser.Math.Between(0, 5);
    return randomColor;
  }
  startDrag(pointer, targets) {
    if (targets[0] == this.square) {
      hasSwitched = true;
      this.scene.input.off("pointerdown", this.startDrag, this);
      this.dragObj = targets[0];

      this.startX = this.dragObj.x;
      this.startY = this.dragObj.y;

      this.scene.input.on("pointermove", this.moveDrag, this);
      this.scene.input.on("pointerup", this.stopDrag, this);
    }
  }
  moveDrag(pointer) {
    this.dragObj.x = pointer.x;
    this.dragObj.y = pointer.y;
  }
  stopDrag() {
    this.scene.input.on("pointerdown", this.startDrag, this);
    this.scene.input.off("pointermove", this.moveDrag, this);
    this.scene.input.off("pointerup", this.stopDrag, this);

    this.onSwitch();
  }

  checkAllowed() {
    var finalAllowedCoords = [];
    var finalAllowedCoords = this.checkAllowedCoords(
      this.scene.bGS.square.x,
      this.scene.bGS.square.y
    );
    for (var i = 0; i <= 3; i++) {
      if (this.square.x == finalAllowedCoords[i][0]) {
        if (this.square.y == finalAllowedCoords[i][1]) {
          return true;
        }
      }
    }
  }
  onSwitch() {
    if (
      this.dragObj.x <= this.scene.zone.x + 40 &&
      this.dragObj.x >= this.scene.zone.x - 40
    ) {
      if (
        this.dragObj.y <= this.scene.zone.y + 40 &&
        this.dragObj.y >= this.scene.zone.y - 40
      ) {
        this.dragObj.x = this.scene.zone.x;
        this.dragObj.y = this.scene.zone.y;
        this.isAllowed = this.checkAllowed();
        this.scene.switchZone(this.startX, this.startY);
        this.startX = this.dragObj.x;
        this.startY = this.dragObj.y;
        this.isAllowed = this.checkAllowed();
        if (this.isAllowed == true) {
          if (this.ifgbS == true) {
            if (this.isAllowed == true) {
              this.square.setInteractive();
              this.scene.input.on("pointerdown", this.startDrag, this);
            } else {
            }
          }
        }

        hasSwitched = false;
      } else {
        if (hasSwitched == true) {
          this.dragObj.x = this.startX;
          this.dragObj.y = this.startY;
        }
      }
    } else {
      if (hasSwitched == true) {
        this.dragObj.x = this.startX;
        this.dragObj.y = this.startY;
      }
    }
  }
  checkAllowedCoords(givenX, givenY) {
    var finalAllowedCoords = [];
    finalAllowedCoords = [
      [givenX, givenY + 70],
      [givenX, givenY - 70],
      [givenX + 70, givenY],
      [givenX - 70, givenY],
    ];
    return finalAllowedCoords;
  }
}
