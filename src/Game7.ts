/**
 * author: cjj
 * des: flap bird小鸟 7模式
 */
module view {
    const playerWidth: number = 78;
    const playerHeight: number = 66;
    const jumpDistance: number = 160;
    const initPosX: number = 109;
    const initPosY: number = 601;
    const initPlaySpeed: number = 4;
    export class Game7 extends ui.Game7UI {
        static playerSpeed: number = initPlaySpeed;
        private score: number = 0;
        private fallSpeed: number = 6;
        private jumpSpeed: number = 8;
        private isClientJump: boolean = false;
        private lastAddScoreTime: number = 0;
        private jumpLenght: number;
        private dynMoveManager: DynMoveManager;
        private hinderManager: HinderManager;
        private playerBody: Laya.Sprite;
        private wing: Laya.Animation;
        private accelerSpeed: number;
        constructor() {
            super();
            this.wing = new Laya.Animation();
            this.wing.pivot(96 / 2, 96 / 2);
            this.wing.skewY = 180;
            this.wing.x = 78;
            this.wing.y = 32;
            this.player.addChild(this.wing);
            Laya.Animation.createFrames(["Game7/w_00000.png",
                "Game7/w_00001.png",
                "Game7/w_00002.png",
                "Game7/w_00003.png",
                "Game7/w_00004.png",
                "Game7/w_00005.png",
                "Game7/w_00006.png",
                "Game7/w_00007.png",
                "Game7/w_00008.png",], "wingFly");
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

        private updateScore(score: number) {
            this.score += score;
            ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.score);
            if (this.score == 26) {
                HinderManager.dynamicChance = 0.5;
            } else if (this.score == 51) {
                HinderManager.gapHeight = Math.max(260, HinderManager.gapHeight - 30);
            } else if (this.score == 100) {
                HinderManager.dynamicChance = 1;
            }
        }
        // 重新玩一次
        OnTryPlaySucc() {
            this.clearHinder();
            this.init();
            this.resetParam();
        }
        // 继续游戏
        OnGameContinue() {
            this.clearHinder();
            this.init();
        }
        private init() {
            this.dynMoveManager = new DynMoveManager((this.getChildByName("dynMoveArea")) as Laya.Sprite);
            this.hinderManager = new HinderManager((this.getChildByName("hinderGroup")) as Laya.Sprite);
            this.playerBody = this.player;
            this.playerBody.x = initPosX; this.playerBody.y = initPosY;
            let bodyUrl: string = PlayerManager.Instance.GetUsedSkinUrl();
            this.playerBody.loadImage(bodyUrl, 0, 0, playerWidth, playerHeight);
            this.playerBody.pivot(playerWidth / 2, playerHeight / 2);
            this.playerBody.skewY = 180;
            this.playerBody.zOrder = 99;
            this.wing.play(0, true, "wingFly");
            this.accelerSpeed = 0;
            this.beginCheckInto();
            this.on(Laya.Event.CLICK, this, this.jump);
        }
        private resetParam() {
            this.updateScore(-this.score);
            Game7.playerSpeed = initPlaySpeed;
            HinderManager.gapHeight = initGapHeight;
            HinderManager.dynamicChance = 0;
        }
        private clearHinder() {
            if (this.hinderManager)
                this.hinderManager.getSpr().removeChildren();
        }
        private jump() {
             MusicManager.Instance.playSound(StringDefine.SOUND_CLICKBTN);
            this.jumpLenght = jumpDistance;
            this.isClientJump = true;
            this.accelerSpeed = 0;
            MusicManager.Instance.playSound("click_botton");
        }
        private beginCheckInto(): void {
            Laya.timer.frameLoop(1, this, this.onLoop);
        }
        private onLoop() {
            var rotationVal = 0;
            var yVal = 0;
            if (this.isClientJump) {
                var jumpVal = this.jumpLenght - this.jumpSpeed > 0 ? this.jumpSpeed : this.jumpLenght;
                if (jumpVal > 0) {
                    this.jumpLenght -= jumpVal;
                    yVal = this.playerBody.y <= 0 ? 0 : -jumpVal;
                    if (this.playerBody.rotation > -20)
                        rotationVal = -2;
                } else {
                    this.jumpLenght = 0;
                    this.isClientJump = false;
                    this.accelerSpeed = 0;
                }
            } else {
                this.accelerSpeed += 0.1;
                if (this.playerBody.rotation < 70) {
                    rotationVal = 1.6;
                }
                yVal = this.fallSpeed + this.accelerSpeed;
            }
            this.playerBody.rotation += rotationVal;
            this.playerBody.y += yVal;

            if (this.hinderManager.getSpr().numChildren > 0) {
                var lx = this.playerBody.x - playerWidth / 2; var ly = this.playerBody.y;
                var rx = this.playerBody.x + playerWidth / 2; var ry = this.playerBody.y;
                var tx = this.playerBody.x; var ty = this.playerBody.y - playerHeight / 2;
                var bx = this.playerBody.x; var by = this.playerBody.y + playerHeight / 2;
                for (var i = 0; i < this.hinderManager.getSpr().numChildren; i++) {
                    var hinderGroup: HinderGroup = this.hinderManager.getSpr().getChildAt(i) as HinderGroup;
                    if (hinderGroup.name == "hinderGroup") {
                        for (var j = 0; j < hinderGroup.numChildren; j++) {
                            var hinder: Hinder = hinderGroup.getChildAt(j) as Hinder;
                            if (hinder.hitTestPoint(lx, ly) || hinder.hitTestPoint(rx, ry) || hinder.hitTestPoint(tx, ty) || hinder.hitTestPoint(bx, by)) {
                                this.gameOver();
                            }
                            if (hinder.name == "hinderTop") {
                                var hinderCenterX = hinder.x + hinder.width;
                                if (hinderCenterX > 0 && hinderCenterX < lx && (Laya.Browser.now() - this.lastAddScoreTime) > 500) {
                                    this.lastAddScoreTime = Laya.Browser.now();
                                    this.updateScore(1);
                                }
                            }
                        }
                    }
                }
            }
            if (this.playerBody.y + playerHeight / 2 > ValueConfig.screenDefaultHeight - roadHeight) {
                this.gameOver();
            }
        }
        private gameOver(): void {
            this.dynMoveManager.clearTask();
            this.hinderManager.clearTask();
            Laya.timer.clear(this, this.onLoop);
            this.wing.stop();
            this.off(Laya.Event.CLICK, this, this.jump);
            GameUIManager.Instance.OpenUIResult();
            console.log("撞到障碍物 Game Over");
        }

        OnClosedPanel() {
            GameUIManager.Instance.removeUI(this, true, true);
        }
    }
}