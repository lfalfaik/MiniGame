var view;
(function (view) {
    view.brickWidth = 200;
    view.brickHeight = 69;
    var BrickAreaManager = /** @class */ (function () {
        function BrickAreaManager(game5, lastPoint) {
            this.delayTime = 0;
            this.parentSpr = game5;
            this.player = game5.getPlayer();
            this.isCreate = true;
            this.lastPont_Y = lastPoint - view.brickHeight;
            this.init();
        }
        BrickAreaManager.prototype.init = function () {
            this.brickArea = new Laya.Sprite();
            this.parentSpr.container.addChild(this.brickArea);
        };
        BrickAreaManager.prototype.updateGameParam = function (cfg) {
            if (this.curConfig == null || this.curConfig.scoreLine != cfg.scoreLine) {
                this.curConfig = cfg;
                BrickAreaManager.moveSpeed = this.curConfig.secsMovePixel / 60;
                console.log("难度提升为：" + cfg.scoreLine + "段");
            }
        };
        BrickAreaManager.prototype.onLoop = function () {
            if (this.isCreate) {
                if (Laya.Browser.now() >= this.delayTime) {
                    var isLeft = Math.random() < 0.5 ? true : false;
                    var brick = new Brick(isLeft);
                    brick.graphics.drawTexture(Laya.loader.getRes(view.zImage), 0, 0, view.brickWidth, view.brickHeight);
                    var posX = isLeft ? -view.brickWidth : view.W + view.brickWidth;
                    brick.pos(posX, this.lastPont_Y);
                    this.brickArea.addChild(brick);
                    this.lastPont_Y -= view.brickHeight;
                    this.setIsCreate(false);
                    this.delayTime = 0;
                }
            }
            for (var i = this.brickArea.numChildren - 1; i > -1; i--) {
                var moveObj = this.brickArea.getChildAt(i);
                if (!moveObj.isDown) {
                    var xVal = moveObj.isLeft ? BrickAreaManager.moveSpeed : -BrickAreaManager.moveSpeed;
                    var center = view.W / 2;
                    if (xVal > 0) {
                        if ((moveObj.x + view.brickWidth / 2) + xVal <= center) {
                            moveObj.x += xVal;
                        }
                        else {
                            moveObj.x = center - view.brickWidth / 2;
                        }
                    }
                    else {
                        if ((moveObj.x + view.brickWidth / 2) + xVal >= center) {
                            moveObj.x += xVal;
                        }
                        else {
                            moveObj.x = center - view.brickWidth / 2;
                        }
                    }
                    var lx = this.player.x - view.playMiniW / 3;
                    var ly = this.player.y + view.Game5.scrollHeight;
                    var rx = this.player.x + view.playMiniW / 3;
                    if (moveObj.hitTestPoint(lx, ly) || moveObj.hitTestPoint(rx, ly)) {
                        this.parentSpr.playerDie(moveObj.isLeft);
                    }
                    break;
                }
            }
        };
        BrickAreaManager.prototype.setIsCreate = function (isCreate) {
            this.isCreate = isCreate;
            if (this.isCreate) {
                var curTime = Laya.Browser.now();
                var rdDelayNum = Math.floor(Math.random() * this.curConfig.rdRightVal - this.curConfig.rdLeftVal + this.curConfig.rdLeftVal);
                this.delayTime = curTime + rdDelayNum;
                console.log("下次出现为:" + rdDelayNum + "ms后");
            }
        };
        BrickAreaManager.prototype.getBrickArea = function () {
            return this.brickArea;
        };
        BrickAreaManager.prototype.startTask = function () {
            Laya.timer.frameLoop(1, this, this.onLoop);
        };
        BrickAreaManager.prototype.clearTask = function () {
            Laya.timer.clear(this, this.onLoop);
        };
        return BrickAreaManager;
    }());
    view.BrickAreaManager = BrickAreaManager;
})(view || (view = {}));
//# sourceMappingURL=BrickAreaManager.js.map