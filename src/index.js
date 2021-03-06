import Phaser from "phaser";
import SceneStart from "./scenes/SceneStart";
import SceneMain from "./scenes/SceneMain";
import SceneWon from "./scenes/sceneWon";
import SceneLeaderboard from "./scenes/SceneLeaderboard.js";
import SceneSignUp from "./scenes/SceneSignUp";
import SceneSettings from "./scenes/SceneSettings";
import SceneWIP from "./scenes/SceneWIP";
import SceneHelp from "./scenes/SceneHelp";
import InputTextPlugin from "phaser3-rex-plugins/plugins/inputtext-plugin.js";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
var calledOnce = false;

var isMobile = navigator.userAgent.indexOf("Mobile");

if (isMobile == -1) {
  isMobile = navigator.userAgent.indexOf("Tablet");
}
if (isMobile == -1) {
  var config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    scale: {
      mode: Phaser.Scale.FIT,
      //autoCenter: Phaser.Scale.CENTER_BOTH,
      _parent: "phaser-example",
      width: 506,
      height: 800,
      autoCenter: true,
    },
    backgroundColor: "#2d2d2d",
    dom: {
      createContainer: true,
    },
    scene: [
      SceneStart,
      SceneMain,
      SceneWon,
      SceneLeaderboard,
      SceneSignUp,
      SceneSettings,
      SceneWIP,
      SceneHelp,
    ],
  };
} else {
  var config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    scale: {
      mode: Phaser.Scale.FIT,
      //autoCenter: Phaser.Scale.CENTER_BOTH,
      _parent: "phaser-example",
      width: 506,
      height: 800,
      autoCenter: true,
    },
    backgroundColor: "#2d2d2d",
    dom: {
      createContainer: true,
    },
    scene: [
      SceneStart,
      SceneMain,
      SceneWon,
      SceneLeaderboard,
      SceneSignUp,
      SceneSettings,
      SceneWIP,
      SceneHelp,
    ],
  };
}

const game = new Phaser.Game(config);
