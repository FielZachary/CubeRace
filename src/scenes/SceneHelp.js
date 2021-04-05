import { analytics } from "./SceneStart";

export default class SceneHelp extends Phaser.Scene {
  constructor() {
    super("SceneHelp");
  }

  preload() {
    this.load.image("Page1Help", "assets/images/Page1Help.png");
    this.load.image("Page2Help", "assets/images/Page2Help.png");
    this.load.image("Page3Help", "assets/images/Page3Help.png");
  }

  create() {
    this.onPage = 1;

    const exitButton = this.add.rectangle(40.5, 38.5, 40, 40, 0x000000);
    // var previousPage = this.add.rectangle(165, 740, 20, 20, 0x000000)
    const nextPage = this.add.rectangle(358, 740, 40, 40, 0x000000);
    const previousPage = this.add.rectangle(165, 740, 40, 40, 0x000000);

    this.Page1 = this.add.image(0, 0, "Page1Help");
    this.Page1.scaleX = 0.47;
    this.Page1.scaleY = 0.47;
    this.Page1.setOrigin(0.135, 0.165);
    this.Page1.visible = false;

    this.Page2 = this.add.image(0, 0, "Page2Help");
    this.Page2.scaleX = 0.47;
    this.Page2.scaleY = 0.47;
    this.Page2.setOrigin(0.135, 0.165);
    this.Page2.visible = false;

    this.Page3 = this.add.image(0, 0, "Page3Help");
    this.Page3.scaleX = 0.47;
    this.Page3.scaleY = 0.47;
    this.Page3.setOrigin(0.135, 0.165);
    this.Page3.visible = false;

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

    const previousButton = this.plugins
      .get("rexbuttonplugin")
      .add(previousPage, {
        enable: true,
        mode: 0, // 0|'press'|1|'release'
        // clickInterval: 100  // ms
      });
    previousButton.on(
      "click",
      function () {
        //  calledBack = true;
        // countdown = 1
        if (this.onPage > 1) {
          this.onPage -= 1;
          // console.log(this.onPage)
        }
        this.whichPage();
      },
      this
    );

    const nextButton = this.plugins.get("rexbuttonplugin").add(nextPage, {
      enable: true,
      mode: 0, // 0|'press'|1|'release'
      // clickInterval: 100  // ms
    });
    nextButton.on(
      "click",
      function () {
        //  calledBack = true;
        // countdown = 1
        if (this.onPage < 3) {
          this.onPage += 1;
          // console.log(this.onPage)
        }
        this.whichPage();
        analytics.logEvent("Using tutorial screen");
      },
      this
    );

    this.whichPage();
  }

  whichPage() {
    // console.log('Which page is it?')
    if (this.onPage === 1) {
      this.Page1.visible = true;
      this.Page2.visible = false;
      this.Page3.visible = false;
    } else if (this.onPage === 2) {
      this.Page1.visible = false;
      this.Page2.visible = true;
      this.Page3.visible = false;
    } else if (this.onPage === 3) {
      this.Page1.visible = false;
      this.Page2.visible = false;
      this.Page3.visible = true;
    }
  }
}
