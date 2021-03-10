import Phaser from './phaser-custom-sprite-loader';
import SceneStart from './scenes/SceneStart'

const config = {
    type: Phaser.AUTO,
    width: 506.25,
    height: 800,
    backgroundColor: '#2d2d2d',
    scene: [SceneStart]
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
