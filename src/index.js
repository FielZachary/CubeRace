import Phaser from 'phaser';
import SceneStart from './scenes/SceneStart'
import SceneMain from "./scenes/SceneMain";
import SceneWon from './scenes/sceneWon';

const config = {
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

const game = new Phaser.Game(config);

function preload ()
{
    this.load.image('logo', 'assets/logo.png');
}

function create ()
{
    const logo = this.add.image(400, 150, 'logo');

    this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
    });
}
