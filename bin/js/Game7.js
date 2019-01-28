var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * author: cjj
 * des: flap bird小鸟 7模式
 */
var view;
(function (view) {
    var playerWidth = 78;
    var playerHeight = 66;
    var jumpDistance = 160;
    var initPosX = 109;
    var initPosY = 601;
    var initPlaySpeed = 4;
    var Game7 = /** @class */ (function (_super) {
        __extends(Game7, _super);
        function Game7() {
            var _this = _super.call(this) || this;
            _this.score = 0;
            _this.fallSpeed = 6;
            _this.jumpSpeed = 8;
            _this.isClientJump = false;
            _this.lastAddScoreTime = 0;
            _this.wing = new Laya.Animation();
            _this.wing.pivot(96 / 2, 96 / 2);
            _this.wing.skewY = 180;
            _this.wing.x = 78;
            _this.wing.y = 32;
            _this.player.addChild(_this.wing);
            Laya.Animation.createFrames(["Game7/w_00000.png",
                "Game7/w_00001.png",
                "Game7/w_00002.png",
                "Game7/w_00003.png",
                "Game7/w_00004.png",
                "Game7/w_00005.png",
                "Game7/w_00006.png",
                "Game7/w_00007.png",
                "Game7/w_00008.png",], "wingFly");
            return _this;
        }
        Game7.prototype.onShow = function () {
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_START, this, this.init);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_TRYPLAY, this, this.OnTryPlaySucc);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_OVER, this, this.OnClosedPanel);
        };
        // 关闭界面
        Game7.prototype.onClosed = function () {
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_START, this, this.init);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_TRYPLAY, this, this.OnTryPlaySucc);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_OVER, this, this.OnClosedPanel);
        };
        Game7.prototype.updateScore = function (score) {
            this.score += score;
            ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.score);
            if (this.score == 26) {
                HinderManager.dynamicChance = 0.5;
            }
            else if (this.score == 51) {
                HinderManager.gapHeight = Math.max(260, HinderManager.gapHeight - 30);
            }
            else if (this.score == 100) {
                HinderManager.dynamicChance = 1;
            }
        };
        // 重新玩一次
        Game7.prototype.OnTryPlaySucc = function () {
            this.clearHinder();
            this.init();
            this.resetParam();
        };
        // 继续游戏
        Game7.prototype.OnGameContinue = function () {
            this.clearHinder();
            this.init();
        };
        Game7.prototype.init = function () {
            this.dynMoveManager = new DynMoveManager((this.getChildByName("dynMoveArea")));
            this.hinderManager = new HinderManager((this.getChildByName("hinderGroup")));
            this.playerBody = this.player;
            this.playerBody.x = initPosX;
            this.playerBody.y = initPosY;
            var bodyUrl = PlayerManager.Instance.GetUsedSkinUrl();
            this.playerBody.loadImage(bodyUrl, 0, 0, playerWidth, playerHeight);
            this.playerBody.pivot(playerWidth / 2, playerHeight / 2);
            this.playerBody.skewY = 180;
            this.playerBody.zOrder = 99;
            this.wing.play(0, true, "wingFly");
            this.accelerSpeed = 0;
            this.beginCheckInto();
            this.on(Laya.Event.CLICK, this, this.jump);
        };
        Game7.prototype.resetParam = function () {
            this.updateScore(-this.score);
            Game7.playerSpeed = initPlaySpeed;
            HinderManager.gapHeight = initGapHeight;
            HinderManager.dynamicChance = 0;
        };
        Game7.prototype.clearHinder = function () {
            if (this.hinderManager)
                this.hinderManager.getSpr().removeChildren();
        };
        Game7.prototype.jump = function () {
            MusicManager.Instance.playSound(StringDefine.SOUND_CLICKBTN);
            this.jumpLenght = jumpDistance;
            this.isClientJump = true;
            this.accelerSpeed = 0;
            MusicManager.Instance.playSound("click_botton");
        };
        Game7.prototype.beginCheckInto = function () {
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        Game7.prototype.onLoop = function () {
            var rotationVal = 0;
            var yVal = 0;
            if (this.isClientJump) {
                var jumpVal = this.jumpLenght - this.jumpSpeed > 0 ? this.jumpSpeed : this.jumpLenght;
                if (jumpVal > 0) {
                    this.jumpLenght -= jumpVal;
                    yVal = this.playerBody.y <= 0 ? 0 : -jumpVal;
                    if (this.playerBody.rotation > -20)
                        rotationVal = -2;
                }
                else {
                    this.jumpLenght = 0;
                    this.isClientJump = false;
                    this.accelerSpeed = 0;
                }
            }
            else {
                this.accelerSpeed += 0.1;
                if (this.playerBody.rotation < 70) {
                    rotationVal = 1.6;
                }
                yVal = this.fallSpeed + this.accelerSpeed;
            }
            this.playerBody.rotation += rotationVal;
            this.playerBody.y += yVal;
            if (this.hinderManager.getSpr().numChildren > 0) {
                var lx = this.playerBody.x - playerWidth / 2;
                var ly = this.playerBody.y;
                var rx = this.playerBody.x + playerWidth / 2;
                var ry = this.playerBody.y;
                var tx = this.playerBody.x;
                var ty = this.playerBody.y - playerHeight / 2;
                var bx = this.playerBody.x;
                var by = this.playerBody.y + playerHeight / 2;
                for (var i = 0; i < this.hinderManager.getSpr().numChildren; i++) {
                    var hinderGroup = this.hinderManager.getSpr().getChildAt(i);
                    if (hinderGroup.name == "hinderGroup") {
                        for (var j = 0; j < hinderGroup.numChildren; j++) {
                            var hinder = hinderGroup.getChildAt(j);
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
        };
        Game7.prototype.gameOver = function () {
            this.dynMoveManager.clearTask();
            this.hinderManager.clearTask();
            Laya.timer.clear(this, this.onLoop);
            this.wing.stop();
            this.off(Laya.Event.CLICK, this, this.jump);
            GameUIManager.Instance.OpenUIResult();
            console.log("撞到障碍物 Game Over");
        };
        Game7.prototype.OnClosedPanel = function () {
            GameUIManager.Instance.removeUI(this, true, true);
        };
        Game7.playerSpeed = initPlaySpeed;
        return Game7;
    }(ui.Game7UI));
    view.Game7 = Game7;
})(view || (view = {}));
//# sourceMappingURL=Game7.js.map