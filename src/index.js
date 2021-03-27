import Phaser from 'phaser';
import SceneStart from './scenes/SceneStart'
import SceneMain from "./scenes/SceneMain";
import SceneWon from './scenes/sceneWon';
import SceneLeaderboard from './scenes/SceneLeaderboard.js'
import SceneSignUp from './scenes/SceneSignUp'
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin.js';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'


var isMobile = navigator.userAgent.indexOf("Mobile");

if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
}
if (isMobile == -1) {
    var config = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            _parent: 'phaser-example',
            width: 506,
            height: 800,
            autoCenter: true,
        },
        backgroundColor: '#2d2d2d',
        dom: {
            createContainer: true
        },
        scene: [SceneStart, SceneMain, SceneWon, SceneLeaderboard]
    };
} else {
    var config = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            _parent: 'phaser-example',
            width: 506,
            height: 800,
        },
        backgroundColor: '#2d2d2d',
        scene: [SceneStart, SceneMain, SceneWon]
    };
}



const game = new Phaser.Game(config);

