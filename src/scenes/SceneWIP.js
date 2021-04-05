import Phaser from "phaser";

export default class SceneWIP extends Phaser.Scene {
  constructor() {
    super("SceneWIP");
  }

  preload() {
    this.load.image("WIPBackground", "assets/images/WIPScreen.png");
  }

  create() {
    const exitButton = this.add.rectangle(40.5, 38.5, 40, 40, 0x000000);

    this.WIPBackground = this.add.image(0, 0, "WIPBackground");
    this.WIPBackground.scaleX = 0.47;
    this.WIPBackground.scaleY = 0.47;
    this.WIPBackground.setOrigin(0.153, 0.165);

    const eButton = this.plugins.get("rexbuttonplugin").add(exitButton, {
      enable: true,
      mode: 0, // 0|'press'|1|'release'
      // clickInterval: 100  // ms
    });
    eButton.on(
      "click",
      function () {
        //  calledBack = true;
        // countdown = 1
        this.scene.start("SceneStart");
      },
      this
    );
  }

  update() {}
}
