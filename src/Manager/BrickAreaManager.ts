module view {
    export const brickWidth: number = 200;
    export const brickHeight: number = 69;

    export class BrickAreaManager {
        private curConfig: view.ConfigData;
        private parentSpr: view.Game5;
        private player: Laya.Sprite;
        private brickArea: Laya.Sprite;
        private isCreate: boolean;
        private lastPont_Y: number;
        private delayTime: number;
        private static moveSpeed: number;


        constructor(game5: Game5, lastPoint: number) {
            this.delayTime = 0;
            this.parentSpr = game5;
            this.player = game5.getPlayer();
            this.isCreate = true;
            this.lastPont_Y = lastPoint - brickHeight;
            this.init();
        }
        private init() {
            this.brickArea = new Laya.Sprite();
            this.parentSpr.container.addChild(this.brickArea);
        }
        public updateGameParam(cfg: view.ConfigData) {
           if(this.curConfig==null||this.curConfig.scoreLine!=cfg.scoreLine){
                this.curConfig = cfg;
                BrickAreaManager.moveSpeed = this.curConfig.secsMovePixel/60;
                console.log("难度提升为："+cfg.scoreLine+"段");
           }
        }
        private onLoop() {
            if (this.isCreate) {
                if(Laya.Browser.now()>=this.delayTime){
                    let isLeft: boolean = Math.random() < 0.5 ? true : false;
                    let brick: Brick = new Brick(isLeft);
                    brick.graphics.drawTexture(Laya.loader.getRes(zImage), 0, 0, brickWidth, brickHeight);
                    let posX: number = isLeft ? -brickWidth : W + brickWidth;
                    brick.pos(posX, this.lastPont_Y);
                    this.brickArea.addChild(brick);
                    this.lastPont_Y -= brickHeight;
                    this.setIsCreate(false);
                    this.delayTime = 0;
                }
            }
            for (let i = this.brickArea.numChildren - 1; i > -1; i--) {
                let moveObj: Brick = this.brickArea.getChildAt(i) as Brick;
                if (!moveObj.isDown) {
                    let xVal: number = moveObj.isLeft ? BrickAreaManager.moveSpeed : -BrickAreaManager.moveSpeed;
                    let center = W / 2;
                    if (xVal > 0) {
                        if ((moveObj.x + brickWidth / 2) + xVal <= center) {
                            moveObj.x += xVal;
                        } else {
                            moveObj.x = center - brickWidth / 2;
                        }
                    } else {
                        if ((moveObj.x + brickWidth / 2) + xVal >= center) {
                            moveObj.x += xVal;
                        } else {
                            moveObj.x = center - brickWidth / 2;
                        }
                    }

                    let lx = this.player.x - playMiniW / 3; let ly = this.player.y + Game5.scrollHeight;
                    let rx = this.player.x + playMiniW / 3;
                    if (moveObj.hitTestPoint(lx, ly) || moveObj.hitTestPoint(rx, ly)) {
                        this.parentSpr.playerDie(moveObj.isLeft);
                    }
                    break;
                }
            }
        }
        public setIsCreate(isCreate: boolean) {
            this.isCreate = isCreate;
            if (this.isCreate) {
                let curTime = Laya.Browser.now();
                let rdDelayNum =Math.floor(Math.random() * this.curConfig.rdRightVal - this.curConfig.rdLeftVal + this.curConfig.rdLeftVal);
                this.delayTime = curTime + rdDelayNum;
                console.log("下次出现为:"+rdDelayNum+"ms后");
            }
        }
        public getBrickArea(): Laya.Sprite {
            return this.brickArea;
        }
        public startTask() {
            Laya.timer.frameLoop(1, this, this.onLoop);
        }
        public clearTask() {
            Laya.timer.clear(this, this.onLoop);
        }
    }
}