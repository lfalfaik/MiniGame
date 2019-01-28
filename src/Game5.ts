/**
 * @author:cjj
 * @des:模式5
 */
module view {
    const bgImage: string = "Game5/bg.png";
    const ybImage: string = "Game5/yb01.png";
    export const zImage: string = "Game1/z.png";
    const beginImage: string = "Game2/t11.png";
    const jumpDis: number = 138;
    const beginPointW = 116; const beginPointH = 110;//起跳台信息

    const playW: number = 348; const playH: number = 348;
    export const playMiniW = 125;
    export const playMiniH = 100;

    export const W: number = ValueConfig.screenDefaultWitdh;
    export const H: number = ValueConfig.screenDefaultHeight;
    export class Game5 extends ui.Game5UI {
        configArray: Array<ConfigData>;//配置数据
        container: Laya.Sprite;
        private brickAreaManager: BrickAreaManager;
        private playerBody: Laya.Sprite;
        private beginPoint: Laya.Sprite;
        private jumpSpeed: number = 6;
        private jumpWane: number;//跳跃衰减
        private jumpGravity: number;//下落加速
        private curPlayerY: number = 0;
        private curBrickY: number;
        private score: number = 0;
        private playerImage: string;
        private reviveTimes:number = 0;
        isJump: boolean;
        constructor() {
            super();
            let modelate: ModelData = ModelManager.Instance.GetDataById(5);
            let dataArr: Array<ModelPhaseData> = ClientTools.GetGamePhaseDatas(modelate.phase);
            this.configArray = new Array<ConfigData>(dataArr.length);
            for (let i = 0; i < dataArr.length; i++) {
                let tm: ModelPhaseData = dataArr[i];
                this.configArray[i] = new ConfigData(tm.Score, tm.Speed, tm.Time, tm.Resource);
            }
        }
        private init() {
            this.reviveTimes = 0;
            this.playerImage = PlayerManager.Instance.GetUsedSkinUrl(SkinUrlType.Front);
            let assets: any = [{ url: bgImage },
            { url: ybImage }, { url: zImage },
            { url: beginImage }, { url: this.playerImage }];
            Laya.loader.load(assets, Laya.Handler.create(this, this.onLoaded));
        }
        private updateScore(score: number) {
            this.score += score;
            ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.score);
            for (let i = 0; i < this.configArray.length - 1; i++) {
                let leftCfg: ConfigData = this.configArray[i];
                let rightCfg: ConfigData = this.configArray[i + 1];
                if (this.score >= leftCfg.scoreLine && this.score < rightCfg.scoreLine) {
                    this.brickAreaManager.updateGameParam(leftCfg);
                }
            }
        }
        private initBackgroun(){
            if(this.backgroundArea.numChildren==0){
                let firstBg = new Laya.Sprite;
                firstBg.name="bgOne";
                firstBg.graphics.drawTexture(Laya.loader.getRes(bgImage));
                this.backgroundArea.addChild(firstBg);

                let lastBg = new Laya.Sprite;
                lastBg.name="bgTwo";
                lastBg.graphics.drawTexture(Laya.loader.getRes(bgImage));
                lastBg.y = -H
                this.backgroundArea.addChild(lastBg);
            }
        }
        private onLoaded() {
            this.initBackgroun();
            this.container = new Laya.Sprite;
            //起始台
            this.beginPoint = new Laya.Sprite();
            this.beginPoint.graphics.drawTexture(Laya.loader.getRes(beginImage), 0, 0, beginPointW, beginPointH);
            this.beginPoint.pivot(beginPointW / 2, beginPointH / 2);
            this.beginPoint.pos(W / 2, H - H / 6);
            this.container.addChild(this.beginPoint);
            this.addChild(this.container);
            //角色
            this.initPlayer();
            this.curBrickY = this.curPlayerY + playMiniH / 2;
            this.brickAreaManager = new BrickAreaManager(this, this.curBrickY);
            this.brickAreaManager.updateGameParam(this.configArray[0]);
            this.startRuning();
        }
        private startRuning() {
            this.brickAreaManager.startTask();
            Laya.timer.frameLoop(1, this, this.braveryBg);
            Laya.timer.frameLoop(1, this, this.playerMoveCalc);
            this.on(Laya.Event.CLICK, this, this.jump);
        }
        //初始化角色对象
        private initPlayer() {
            if (this.playerBody == null) {
                this.playerBody = new Laya.Sprite();
                this.playerBody.graphics.drawTexture(Laya.loader.getRes(this.playerImage), 0, 0, playMiniW, playMiniH);
                this.playerBody.pivot(playMiniW / 2, playMiniH / 2);
                this.container.addChild(this.playerBody);
            } else {
                this.playerBody.rotation = 0;
            }
            let playHeight = this.curPlayerY != 0 ? this.curPlayerY : H - H / 4;
            this.playerBody.pos(W / 2, playHeight);
            this.curPlayerY = this.playerBody.y;
        }
        private jump() {
            if (!this.isJump) {
                this.isJump = true;
                this.jumpWane = 2;
                this.jumpGravity = 0;
            }
        }
        private isFall: boolean = false;
        private isElastic: boolean = false;
        private isElasticFall: boolean = false;
        /**
         * 跳起后的相关处理
         */
        private playerMoveCalc() {
            if (this.isJump) {
                if (!this.isFall) {
                    this.jumpWane = this.jumpWane <= 0 ? 0 : this.jumpWane - 0.16;
                    let jumpVal = this.jumpSpeed + this.jumpWane;
                    let differNum = (this.playerBody.y - jumpVal) - (this.curPlayerY - jumpDis);
                    if (differNum > 0) {
                        this.playerBody.y -= jumpVal;
                    } else {
                        this.playerBody.y -= +differNum;
                        this.isFall = true;
                    }
                } else if (this.isFall && !this.isElastic) {
                    let jumpVal = this.jumpSpeed + (this.jumpGravity += 0.36);
                    if (this.playerBody.y + jumpVal < this.curPlayerY) {
                        let tempY = this.playerBody.y + jumpVal;
                        for (let i = this.brickAreaManager.getBrickArea().numChildren - 1; i > -1; i--) {
                            let brick: Brick = this.brickAreaManager.getBrickArea().getChildAt(i) as Brick;
                            if (!brick.isDown) {
                                let lbx = this.playerBody.x - playMiniH / 4; let by = tempY + playMiniH / 2 + Game5.scrollHeight;
                                let cbx = this.playerBody.x;
                                let rbx = this.playerBody.x + playMiniW / 4;

                                let brick_LX = brick.x; let brick_RX = brick.x + brickWidth;
                                if (/*brick.hitTestPoint(lbx, by) || */brick.hitTestPoint(cbx, by)/* || brick.hitTestPoint(rbx, by)*/) {
                                    tempY = brick.y - playMiniH / 2;
                                    this.curPlayerY = tempY;
                                    //背景区移动
                                    if (Game5.scrollHeight == 0) {
                                        let absNum = Math.abs(tempY - H / 2);
                                        if (absNum <= 30) {
                                            this.scrollDis = brickHeight;
                                        }
                                    } else {
                                        this.scrollDis += brickHeight;
                                    }

                                    brick.isDown = true;
                                    this.updateScore(1);
                                    this.brickAreaManager.setIsCreate(true);
                                }
                                break;
                            }
                        }
                        this.playerBody.y = tempY;
                    } else {
                        this.playerBody.y = this.curPlayerY;
                        this.isElastic = true;
                    }
                }
                if (this.isElastic) {
                    if (!this.isElasticFall) {
                        if (this.playerBody.y - 1 > this.curPlayerY - 8) {
                            this.playerBody.y -= 1;
                        } else {
                            this.isElasticFall = true;
                        }
                    } else {
                        if (this.playerBody.y + 1 < this.curPlayerY) {
                            this.playerBody.y += 1;
                        } else {
                            this.jumpEndReset();
                        }
                    }
                }
            }
        }
        private jumpEndReset() {
            this.playerBody.y = this.curPlayerY;
            this.isJump = false;
            this.isFall = false;
            this.isElastic = false;
            this.isElasticFall = false;
        }

        private screenDownSpeed = 1.5;
        private scrollDis: number = 0;
        static scrollHeight: number = 0;
        private backgroundScroll() {
            if (this.scrollDis > 0) {
                let downNum = (this.scrollDis - this.screenDownSpeed >= 0) ? this.screenDownSpeed : this.scrollDis;
                this.scrollDis -= downNum;
                Game5.scrollHeight += downNum;
                this.container.y += downNum;

                for (let i = 0; i < this.backgroundArea.numChildren; i++) {
                    let bgObj = this.backgroundArea.getChildAt(i) as Laya.Sprite;
                    let differNum = H - (bgObj.y + downNum);
                    if (differNum > 0) {
                        bgObj.y += downNum;
                    } else {
                        bgObj.y = H;
                    }
                    if (bgObj.y >= H) {
                        let searchName = bgObj.name=="bgOne"?"bgTwo":"bgOne";
                        let afterBgObj:Laya.Sprite = this.backgroundArea.getChildByName(searchName) as Laya.Sprite;
                        bgObj.y = afterBgObj.y-H;
                        if(i==0){
                            bgObj.y+=downNum;
                        }
                    }
                }
            }
        }
        private braveryBg() {
            this.backgroundScroll();
            for (let i = 0; i < this.backgroundArea.numChildren; i++) {
                let bgObj: Laya.Sprite = this.backgroundArea.getChildAt(i) as Laya.Sprite;
                if (bgObj.numChildren > 0) {
                    for (let j = 0; j < bgObj.numChildren; j++) {
                        let yb = bgObj.getChildAt(j) as Laya.Sprite;
                        let scaVal: number; let rotaVal: number;
                        if (yb.name == "a") {
                            scaVal = 0.05;
                            rotaVal = -(Math.random() * 2 + 1);
                        } else {
                            scaVal = -0.01;
                            rotaVal = Math.random() * 1 + 0.2;
                        }
                        if (yb.scaleX > 0.6) {
                            yb.rotation += rotaVal;
                        }
                        if (yb.scaleX <= 0.1) {
                            yb.name = "a";
                        } else if (yb.scaleX >= 1.6) {
                            yb.name = "b";
                        }
                        yb.scale(yb.scaleX + scaVal, yb.scaleY + scaVal);
                    }
                } else {
                    for (let j = 0; j < 10; j++) {
                        let rdX = Math.random() * W; let rdY = Math.random() * H;
                        let yb = new Laya.Sprite();
                        yb.name = Math.random() < 0.35 ? "a" : "b";
                        let sizeX = Math.random() * 114 + 20;
                        let sizeY = 93 * (sizeX / 134);
                        yb.graphics.drawTexture(Laya.loader.getRes(ybImage), 0, 0, sizeX, sizeY);
                        yb.pivot(sizeX / 2, sizeY / 2);
                        yb.pos(rdX, rdY);
                        bgObj.addChild(yb);
                    }
                }
            }
        }
        private dieIsLeft: boolean;
        private onImpactAnimation() {
            let isEnd = false;
            if (this.dieIsLeft) {
                this.playerBody.rotation += 16;
                this.playerBody.x += 9;
                this.playerBody.y -= 5;
                if (this.playerBody.x - playMiniW / 2 > H) {
                    isEnd = true;
                }
            } else {
                this.playerBody.rotation -= 16;
                this.playerBody.x -= 9;
                this.playerBody.y -= 5;
                if (this.playerBody.x + playMiniW / 2 < 0) {
                    isEnd = true;
                }
            }
            if (isEnd) {
                Laya.timer.clear(this, this.onImpactAnimation);
                Laya.timer.frameLoop(1, this, this.GameOver);
                this.backLookHeight = Game5.scrollHeight;
            }
        }
        public playerDie(isLeft: boolean) {
            this.dieIsLeft = isLeft;
            Laya.timer.clear(this, this.braveryBg);
            Laya.timer.clear(this, this.playerMoveCalc);
            this.brickAreaManager.clearTask();
            this.off(Laya.Event.CLICK, this, this.jump);
            Laya.timer.frameLoop(1, this, this.onImpactAnimation);
        }
        onShow() {
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_START, this, this.init);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_TRYPLAY, this, this.OnTryPlaySucc);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_OVER, this, this.OnClosedPanel);
        }
        // 关闭界面
        onClosed(): void {
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_START, this, this.init);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_TRYPLAY, this, this.OnTryPlaySucc);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_OVER, this, this.OnClosedPanel);
        }
        OnClosedPanel() {
            GameUIManager.Instance.removeUI(this, true, true);
        }
        public getPlayer(): Laya.Sprite {
            return this.playerBody;
        }
        private resetParam(){
            this.jumpEndReset();
            this.backReviewSpeed = 0.5;
        }
        private backLookHeight: number;
        //结束
        private backReviewSpeed: number = 0.5;
        private GameOver() {
            let downY = this.backLookHeight - this.backReviewSpeed >= 0 ? this.backReviewSpeed : this.backLookHeight;
            this.backReviewSpeed += 0.1;
            this.backLookHeight -= downY;
            this.container.y -= downY;
            if (this.backLookHeight == 0) {
                this.resetParam();
                Laya.timer.clear(this, this.GameOver);
                console.log("被撞飞了 Game Over!");
                GameUIManager.Instance.OpenUIResult(this.reviveTimes);
            }
        }
        //显示
        Show() {
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_START, this, this.init);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_TRYPLAY, this, this.OnTryPlaySucc);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
        }
        // 关闭
        close(): void {
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_START, this, this.init);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_TRYPLAY, this, this.OnTryPlaySucc);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
        }
        // 重玩
        OnTryPlaySucc() {
            this.playerBody = null;
            this.container.destroy(true);
            this.container.removeSelf();
            this.updateScore(-this.score);
            this.curPlayerY = 0;
            Game5.scrollHeight = 0;
            this.onLoaded();
        }
        // 继续
        OnGameContinue() {
            if(this.reviveTimes >=1)return;
            this.reviveTimes++;
            this.container.y += Game5.scrollHeight;
            let lastBrick: Brick = this.brickAreaManager.getBrickArea().getChildAt(this.brickAreaManager.getBrickArea().numChildren - 1) as Brick;
            lastBrick.isLeft ? lastBrick.x = -brickWidth : lastBrick.x = W + brickWidth;
            this.initPlayer();
            this.startRuning();
        }
    }
    export class ConfigData {
        scoreLine: number;
        secsMovePixel: number;
        rdLeftVal: number;
        rdRightVal: number;
        constructor(scoreLine, secsMovePixel, rdLeftVal, rdRightVal) {
            this.scoreLine = scoreLine;
            this.secsMovePixel = secsMovePixel;
            this.rdLeftVal = rdLeftVal;
            this.rdRightVal = rdRightVal;
        }
    }
}