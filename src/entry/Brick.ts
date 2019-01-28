class Brick extends Laya.Sprite{
    isDown:boolean;
    isLeft:boolean;
    constructor(isLeft:boolean){
        super();
        this.isLeft = isLeft;
        this.isDown = false;
    }
}