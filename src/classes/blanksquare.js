export default class BlankGameSquare extends Phaser.GameObjects.Container
{
    constructor(config, x, y, squareColor)
    {
       // console.log('Starting...')
        super(config.scene);
        this.scene = config.scene;
        //console.log(this)
        this.randomColor = this.randomColor();
        this.square = this.scene.add.rexRoundRectangle(x, y, 60, 60, 12, squareColor);
        this.add(this.square);
        this.scene.add.existing(this);

        this.origX = x;
        this.origY = y;

    }



    randomColor()
    {
        var randomColor = Phaser.Math.Between(0, 5);
        return randomColor;
    }
    startDrag(pointer, targets)
    {
        //console.log('Starting Drag...')
        console.log('hi');
        //this.checkDistance();
        //console.log(this.origX);
    }
    moveDrag(pointer)
    {
        //console.log('Moving Drag...')
        this.dragObj.x = pointer.x
        this.dragObj.y = pointer.y

        //this.checkDistance();

    }
    stopDrag(dropZone)
    {
       // this.checkDistance();
       // console.log('Stopping Drag...')
        this.scene.input.on('pointerdown', this.startDrag, this);
        this.scene.input.off('pointermove', this.moveDrag, this)
        this.scene.input.off('pointerup', this.moveDrag, this)
        this.dragObj.x = this.zone.x;
        this.dragObj.y = this.zone.y;
        console.log(this.zone)
      //  this.checkCollision();

        //console.log('asdf')
      // console.log(this.origX);
    }
    checkDistance()
    {

        if (this.dragObj.x >= this.origX+100 || this.dragObj.x <= this.origX-100 || this.dragObj.y >= this.origY+100 || this.dragObj.y <= this.origY-100 )
        {
            console.log('Resetting Drag x...')
            //this.stopDrag();
            this.dragObj.x = this.origXx;
            this.dragObj.y = this.origY;
            //.log(this.origX);
            return;
        } else {
            console.log('didnt work sadge')
            return;
        }

    }
    checkCollision() {
        for (var i = 0; i<= 23; i++)
        {
            // console.log(this.scene.bGS.x);
            if (this.scene.bGS.x == this.scene.gsGameBoard[i].x)
            {
                if (this.scene.bGS.y == this.scene.gsGameBoard[i].y)
                {
                   // console.log
                   // this.stopDrag();
                    this.dragObj.x = this.origX
                    this.dragObj.y = this.origY
                    //this.dragObj.y = this.scene.gsGameBoard[i].y
                }
            }
        }
    }
    switchSquare2(destinationX, destinationY, )
    {

        this.square.x = destinationX;
        this.square.y = destinationY;

    }
    switchSquare1(destinationX, destinationY)
    {
       this.switchSquare2(destinationX, destinationY)

    }


}