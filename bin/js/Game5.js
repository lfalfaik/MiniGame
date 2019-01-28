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
 * @author:cjj
 * @des:模式5
 */
var view;
(function (view) {
    var bgImage = "Game5/bg.png";
    var ybImage = "Game5/yb01.png";
    view.zImage = "Game1/z.png";
    var beginImage = "Game2/t11.png";
    var jumpDis = 138;
    var beginPointW = 116;
    var beginPointH = 110; //起跳台信息
    var playW = 348;
    var playH = 348;
    view.playMiniW = 125;
    view.playMiniH = 100;
    view.W = ValueConfig.screenDefaultWitdh;
    view.H = ValueConfig.screenDefaultHeight;
    var Game5 = /** @class */ (function (_super) {
        __extends(Game5, _super);
        function Game5() {
            var _this = _super.call(this) || this;
            _this.jumpSpeed = 6;
            _this.curPlayerY = 0;
            _this.score = 0;
            _this.reviveTimes = 0;
            _this.isFall = false;
            _this.isElastic = false;
            _this.isElasticFall = false;
            _this.screenDownSpeed = 1.5;
            _this.scrollDis = 0;
            //结束
            _this.backReviewSpeed = 0.5;
            var modelate = ModelManager.Instance.GetDataById(5);
            var dataArr = ClientTools.GetGamePhaseDatas(modelate.phase);
            _this.configArray = new Array(dataArr.length);
            for (var i = 0; i < dataArr.length; i++) {
                var tm = dataArr[i];
                _this.configArray[i] = new ConfigData(tm.Score, tm.Speed, tm.Time, tm.Resource);
            }
            return _this;
        }
        Game5.prototype.init = function () {
            this.reviveTimes = 0;
            this.playerImage = PlayerManager.Instance.GetUsedSkinUrl(SkinUrlType.Front);
            var assets = [{ url: bgImage },
                { url: ybImage }, { url: view.zImage },
                { url: beginImage }, { url: this.playerImage }];
            Laya.loader.load(assets, Laya.Handler.create(this, this.onLoaded));
        };
        Game5.prototype.updateScore = function (score) {
            this.score += score;
            ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.score);
            for (var i = 0; i < this.configArray.length - 1; i++) {
                var leftCfg = this.configArray[i];
                var rightCfg = this.configArray[i + 1];
                if (this.score >= leftCfg.scoreLine && this.score < rightCfg.scoreLine) {
                    this.brickAreaManager.updateGameParam(leftCfg);
                }
            }
        };
        Game5.prototype.initBackgroun = function () {
            if (this.backgroundArea.numChildren == 0) {
                var firstBg = new Laya.Sprite;
                firstBg.name = "bgOne";
                firstBg.graphics.drawTexture(Laya.loader.getRes(bgImage));
                this.backgroundArea.addChild(firstBg);
                var lastBg = new Laya.Sprite;
                lastBg.name = "bgTwo";
                lastBg.graphics.drawTexture(Laya.loader.getRes(bgImage));
                lastBg.y = -view.H;
                this.backgroundArea.addChild(lastBg);
            }
        };
        Game5.prototype.onLoaded = function () {
            this.initBackgroun();
            this.container = new Laya.Sprite;
            //起始台
            this.beginPoint = new Laya.Sprite();
            this.beginPoint.graphics.drawTexture(Laya.loader.getRes(beginImage), 0, 0, beginPointW, beginPointH);
            this.beginPoint.pivot(beginPointW / 2, beginPointH / 2);
            this.beginPoint.pos(view.W / 2, view.H - view.H / 6);
            this.container.addChild(this.beginPoint);
            this.addChild(this.container);
            //角色
            this.initPlayer();
            this.curBrickY = this.curPlayerY + view.playMiniH / 2;
            this.brickAreaManager = new view.BrickAreaManager(this, this.curBrickY);
            this.brickAreaManager.updateGameParam(this.configArray[0]);
            this.startRuning();
        };
        Game5.prototype.startRuning = function () {
            this.brickAreaManager.startTask();
            Laya.timer.frameLoop(1, this, this.braveryBg);
            Laya.timer.frameLoop(1, this, this.playerMoveCalc);
            this.on(Laya.Event.CLICK, this, this.jump);
        };
        //初始化角色对象
        Game5.prototype.initPlayer = function () {
            if (this.playerBody == null) {
                this.playerBody = new Laya.Sprite();
                this.playerBody.graphics.drawTexture(Laya.loader.getRes(this.playerImage), 0, 0, view.playMiniW, view.playMiniH);
                this.playerBody.pivot(view.playMiniW / 2, view.playMiniH / 2);
                this.container.addChild(this.playerBody);
            }
            else {
                this.playerBody.rotation = 0;
            }
            var playHeight = this.curPlayerY != 0 ? this.curPlayerY : view.H - view.H / 4;
            this.playerBody.pos(view.W / 2, playHeight);
            this.curPlayerY = this.playerBody.y;
        };
        Game5.prototype.jump = function () {
            if (!this.isJump) {
                this.isJump = true;
                this.jumpWane = 2;
                this.jumpGravity = 0;
            }
        };
        /**
         * 跳起后的相关处理
         */
        Game5.prototype.playerMoveCalc = function () {
            if (this.isJump) {
                if (!this.isFall) {
                    this.jumpWane = this.jumpWane <= 0 ? 0 : this.jumpWane - 0.16;
                    var jumpVal = this.jumpSpeed + this.jumpWane;
                    var differNum = (this.playerBody.y - jumpVal) - (this.curPlayerY - jumpDis);
                    if (differNum > 0) {
                        this.playerBody.y -= jumpVal;
                    }
                    else {
                        this.playerBody.y -= +differNum;
                        this.isFall = true;
                    }
                }
                else if (this.isFall && !this.isElastic) {
                    var jumpVal = this.jumpSpeed + (this.jumpGravity += 0.36);
                    if (this.playerBody.y + jumpVal < this.curPlayerY) {
                        var tempY = this.playerBody.y + jumpVal;
                        for (var i = this.brickAreaManager.getBrickArea().numChildren - 1; i > -1; i--) {
                            var brick = this.brickAreaManager.getBrickArea().getChildAt(i);
                            if (!brick.isDown) {
                                var lbx = this.playerBody.x - view.playMiniH / 4;
                                var by = tempY + view.playMiniH / 2 + Game5.scrollHeight;
                                var cbx = this.playerBody.x;
                                var rbx = this.playerBody.x + view.playMiniW / 4;
                                var brick_LX = brick.x;
                                var brick_RX = brick.x + view.brickWidth;
                                if ( /*brick.hitTestPoint(lbx, by) || */brick.hitTestPoint(cbx, by) /* || brick.hitTestPoint(rbx, by)*/) {
                                    tempY = brick.y - view.playMiniH / 2;
                                    this.curPlayerY = tempY;
                                    //背景区移动
                                    if (Game5.scrollHeight == 0) {
                                        var absNum = Math.abs(tempY - view.H / 2);
                                        if (absNum <= 30) {
                                            this.scrollDis = view.brickHeight;
                                        }
                                    }
                                    else {
                                        this.scrollDis += view.brickHeight;
                                    }
                                    brick.isDown = true;
                                    this.updateScore(1);
                                    this.brickAreaManager.setIsCreate(true);
                                }
                                break;
                            }
                        }
                        this.playerBody.y = tempY;
                    }
                    else {
                        this.playerBody.y = this.curPlayerY;
                        this.isElastic = true;
                    }
                }
                if (this.isElastic) {
                    if (!this.isElasticFall) {
                        if (this.playerBody.y - 1 > this.curPlayerY - 8) {
                            this.playerBody.y -= 1;
                        }
                        else {
                            this.isElasticFall = true;
                        }
                    }
                    else {
                        if (this.playerBody.y + 1 < this.curPlayerY) {
                            this.playerBody.y += 1;
                        }
                        else {
                            this.jumpEndReset();
                        }
                    }
                }
            }
        };
        Game5.prototype.jumpEndReset = function () {
            this.playerBody.y = this.curPlayerY;
            this.isJump = false;
            this.isFall = false;
            this.isElastic = false;
            this.isElasticFall = false;
        };
        Game5.prototype.backgroundScroll = function () {
            if (this.scrollDis > 0) {
                var downNum = (this.scrollDis - this.screenDownSpeed >= 0) ? this.screenDownSpeed : this.scrollDis;
                this.scrollDis -= downNum;
                Game5.scrollHeight += downNum;
                this.container.y += downNum;
                for (var i = 0; i < this.backgroundArea.numChildren; i++) {
                    var bgObj = this.backgroundArea.getChildAt(i);
                    var differNum = view.H - (bgObj.y + downNum);
                    if (differNum > 0) {
                        bgObj.y += downNum;
                    }
                    else {
                        bgObj.y = view.H;
                    }
                    if (bgObj.y >= view.H) {
                        var searchName = bgObj.name == "bgOne" ? "bgTwo" : "bgOne";
                        var afterBgObj = this.backgroundArea.getChildByName(searchName);
                        bgObj.y = afterBgObj.y - view.H;
                        if (i == 0) {
                            bgObj.y += downNum;
                        }
                    }
                }
            }
        };
        Game5.prototype.braveryBg = function () {
            this.backgroundScroll();
            for (var i = 0; i < this.backgroundArea.numChildren; i++) {
                var bgObj = this.backgroundArea.getChildAt(i);
                if (bgObj.numChildren > 0) {
                    for (var j = 0; j < bgObj.numChildren; j++) {
                        var yb = bgObj.getChildAt(j);
                        var scaVal = void 0;
                        var rotaVal = void 0;
                        if (yb.name == "a") {
                            scaVal = 0.05;
                            rotaVal = -(Math.random() * 2 + 1);
                        }
                        else {
                            scaVal = -0.01;
                            rotaVal = Math.random() * 1 + 0.2;
                        }
                        if (yb.scaleX > 0.6) {
                            yb.rotation += rotaVal;
                        }
                        if (yb.scaleX <= 0.1) {
                            yb.name = "a";
                        }
                        else if (yb.scaleX >= 1.6) {
                            yb.name = "b";
                        }
                        yb.scale(yb.scaleX + scaVal, yb.scaleY + scaVal);
                    }
                }
                else {
                    for (var j = 0; j < 10; j++) {
                        var rdX = Math.random() * view.W;
                        var rdY = Math.random() * view.H;
                        var yb = new Laya.Sprite();
                        yb.name = Math.random() < 0.35 ? "a" : "b";
                        var sizeX = Math.random() * 114 + 20;
                        var sizeY = 93 * (sizeX / 134);
                        yb.graphics.drawTexture(Laya.loader.getRes(ybImage), 0, 0, sizeX, sizeY);
                        yb.pivot(sizeX / 2, sizeY / 2);
                        yb.pos(rdX, rdY);
                        bgObj.addChild(yb);
                    }
                }
            }
        };
        Game5.prototype.onImpactAnimation = function () {
            var isEnd = false;
            if (this.dieIsLeft) {
                this.playerBody.rotation += 16;
                this.playerBody.x += 9;
                this.playerBody.y -= 5;
                if (this.playerBody.x - view.playMiniW / 2 > view.H) {
                    isEnd = true;
                }
            }
            else {
                this.playerBody.rotation -= 16;
                this.playerBody.x -= 9;
                this.playerBody.y -= 5;
                if (this.playerBody.x + view.playMiniW / 2 < 0) {
                    isEnd = true;
                }
            }
            if (isEnd) {
                Laya.timer.clear(this, this.onImpactAnimation);
                Laya.timer.frameLoop(1, this, this.GameOver);
                this.backLookHeight = Game5.scrollHeight;
            }
        };
        Game5.prototype.playerDie = function (isLeft) {
            this.dieIsLeft = isLeft;
            Laya.timer.clear(this, this.braveryBg);
            Laya.timer.clear(this, this.playerMoveCalc);
            this.brickAreaManager.clearTask();
            this.off(Laya.Event.CLICK, this, this.jump);
            Laya.timer.frameLoop(1, this, this.onImpactAnimation);
        };
        Game5.prototype.onShow = function () {
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_START, this, this.init);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_TRYPLAY, this, this.OnTryPlaySucc);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_OVER, this, this.OnClosedPanel);
        };
        // 关闭界面
        Game5.prototype.onClosed = function () {
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_START, this, this.init);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_TRYPLAY, this, this.OnTryPlaySucc);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_OVER, this, this.OnClosedPanel);
        };
        Game5.prototype.OnClosedPanel = function () {
            GameUIManager.Instance.removeUI(this, true, true);
        };
        Game5.prototype.getPlayer = function () {
            return this.playerBody;
        };
        Game5.prototype.resetParam = function () {
            this.jumpEndReset();
            this.backReviewSpeed = 0.5;
        };
        Game5.prototype.GameOver = function () {
            var downY = this.backLookHeight - this.backReviewSpeed >= 0 ? this.backReviewSpeed : this.backLookHeight;
            this.backReviewSpeed += 0.1;
            this.backLookHeight -= downY;
            this.container.y -= downY;
            if (this.backLookHeight == 0) {
                this.resetParam();
                Laya.timer.clear(this, this.GameOver);
                console.log("被撞飞了 Game Over!");
                GameUIManager.Instance.OpenUIResult(this.reviveTimes);
            }
        };
        //显示
        Game5.prototype.Show = function () {
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_START, this, this.init);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_TRYPLAY, this, this.OnTryPlaySucc);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
        };
        // 关闭
        Game5.prototype.close = function () {
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_START, this, this.init);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_TRYPLAY, this, this.OnTryPlaySucc);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
        };
        // 重玩
        Game5.prototype.OnTryPlaySucc = function () {
            this.playerBody = null;
            this.container.destroy(true);
            this.container.removeSelf();
            this.updateScore(-this.score);
            this.curPlayerY = 0;
            Game5.scrollHeight = 0;
            this.onLoaded();
        };
        // 继续
        Game5.prototype.OnGameContinue = function () {
            if (this.reviveTimes >= 1)
                return;
            this.reviveTimes++;
            this.container.y += Game5.scrollHeight;
            var lastBrick = this.brickAreaManager.getBrickArea().getChildAt(this.brickAreaManager.getBrickArea().numChildren - 1);
            lastBrick.isLeft ? lastBrick.x = -view.brickWidth : lastBrick.x = view.W + view.brickWidth;
            this.initPlayer();
            this.startRuning();
        };
        Game5.scrollHeight = 0;
        return Game5;
    }(ui.Game5UI));
    view.Game5 = Game5;
    var ConfigData = /** @class */ (function () {
        function ConfigData(scoreLine, secsMovePixel, rdLeftVal, rdRightVal) {
            this.scoreLine = scoreLine;
            this.secsMovePixel = secsMovePixel;
            this.rdLeftVal = rdLeftVal;
            this.rdRightVal = rdRightVal;
        }
        return ConfigData;
    }());
    view.ConfigData = ConfigData;
})(view || (view = {}));
//# sourceMappingURL=Game5.js.map