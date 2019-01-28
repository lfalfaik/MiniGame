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
/*
* name;
*/
var view;
(function (view) {
    var Direction;
    (function (Direction) {
        Direction[Direction["Up"] = 1] = "Up";
        Direction[Direction["Down"] = 2] = "Down";
        Direction[Direction["Left"] = 3] = "Left";
        Direction[Direction["Right"] = 4] = "Right";
    })(Direction || (Direction = {}));
    var Game6 = /** @class */ (function (_super) {
        __extends(Game6, _super);
        function Game6() {
            var _this = _super.call(this) || this;
            _this.IsGameOver = false;
            _this.ArmyBgOffset = 40;
            _this.PlayerPoint = 0;
            _this.IsPlayerActioning = false;
            _this.ReviveTimes = 0;
            _this.ModelData = ModelManager.Instance.GetDataById(6);
            if (_this.ModelData != null)
                _this.PhaseData = ClientTools.GetGamePhaseDatas(_this.ModelData.phase);
            _this.HitHandler = Laya.Handler.create(_this, _this.PlayerBeHited, null, false);
            _this.PlayerMoveAnim = new Laya.Animation;
            if (_this.player != null) {
                _this.player.addChild(_this.PlayerMoveAnim);
                _this.PlayerMoveAnim.scale(4, 4);
            }
            _this.PlayerMoveAnim.on(Laya.Event.COMPLETE, _this, function () { this.PlayerMoveAnim.visible = false; });
            return _this;
        }
        Game6.prototype.onShow = function () {
            this.player.skin = PlayerManager.Instance.GetUsedSkinUrl();
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickRetryBtn);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        };
        Game6.prototype.Show = function () {
            this.keyUp.on(Laya.Event.CLICK, this, this.PlayHitAction, [Direction.Up]);
            this.keyDown.on(Laya.Event.CLICK, this, this.PlayHitAction, [Direction.Down]);
            this.keyRight.on(Laya.Event.CLICK, this, this.PlayHitAction, [Direction.Right]);
            this.keyLeft.on(Laya.Event.CLICK, this, this.PlayHitAction, [Direction.Left]);
            this.ResetGame();
        };
        // 关闭界面
        Game6.prototype.onClosed = function () {
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickRetryBtn);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        };
        Game6.prototype.OnGameContinue = function () {
            if (this.ReviveTimes >= 1)
                return;
            this.ReviveTimes++;
            Laya.timer.clearAll(this);
            this.IsGameOver = false;
            Laya.timer.loop(this.CurPhaseData.Time, this, this.CreateArmy);
        };
        Game6.prototype.ResetGame = function () {
            Laya.timer.clearAll(this);
            this.ReviveTimes = 0;
            this.CurPhaseIndex = 0;
            this.CurPhaseData = this.PhaseData[this.CurPhaseIndex];
            this.NextPhasePoint = this.PhaseData[this.CurPhaseIndex + 1].Score;
            this.PlayerPoint = 0;
            this.IsGameOver = false;
            Laya.timer.loop(this.CurPhaseData.Time, this, this.CreateArmy);
        };
        Game6.prototype.PlayHitAction = function (direction) {
            MusicManager.Instance.playSound(StringDefine.SOUND_CLICKBTN);
            if (this.IsPlayerActioning == true)
                return;
            this.IsPlayerActioning = true;
            switch (direction) {
                case Direction.Up:
                    this.player.skin = "skin/zhu_01.png";
                    Laya.Tween.to(this.player, { y: this.player.y - Game6Army.MoveY }, 25, null, Laya.Handler.create(this, this.RePosPlayer));
                    break;
                case Direction.Down:
                    this.player.skin = "skin/zhu_01.png";
                    Laya.Tween.to(this.player, { y: this.player.y + Game6Army.MoveY }, 25, null, Laya.Handler.create(this, this.RePosPlayer));
                    break;
                case Direction.Left:
                    this.player.skin = "skin/zhu_02.png";
                    Laya.Tween.to(this.player, { x: this.player.x - Game6Army.MoveX }, 25, null, Laya.Handler.create(this, this.RePosPlayer));
                    break;
                case Direction.Right:
                    this.player.skin = "skin/zhu_02.png";
                    this.player.skewY = 180;
                    Laya.Tween.to(this.player, { x: this.player.x + Game6Army.MoveX }, 25, null, Laya.Handler.create(this, this.RePosPlayer));
                    break;
            }
            this.PlayerHit(direction);
        };
        Game6.prototype.RePosPlayer = function () {
            Laya.Tween.to(this.player, { x: this.midBg.x, y: this.midBg.y - this.ArmyBgOffset }, 25, null, Laya.Handler.create(this, function () {
                this.IsPlayerActioning = false;
                this.player.skewY = 0;
                this.player.skin = "skin/zhu_01.png";
            }));
        };
        Game6.prototype.PlayerHit = function (direction) {
            this.PlayerMoveAnim.visible = true;
            this.PlayerMoveAnim.play(0, false, "PigBeat");
            switch (direction) {
                case Direction.Up:
                    this.PlayerMoveAnim.rotation = 90;
                    this.PlayerMoveAnim.pos(190, -100);
                    var army;
                    for (var i = this.armyBox.numChildren - 1; i >= 0; i--) {
                        army = this.armyBox.getChildAt(i);
                        if (army.Direction == Direction.Up && army.y >= Laya.stage.height / 2 - Game6Army.MoveY - this.ArmyBgOffset) {
                            this.PlayerPoint += army.Point;
                            ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.PlayerPoint); // 抛出消息：最新分数
                            army.Remove();
                        }
                    }
                    break;
                case Direction.Down:
                    this.PlayerMoveAnim.rotation = -90;
                    this.PlayerMoveAnim.pos(-60, 200);
                    var army;
                    for (var i = this.armyBox.numChildren - 1; i >= 0; i--) {
                        army = this.armyBox.getChildAt(i);
                        if (army.Direction == Direction.Down && army.y <= Laya.stage.height / 2 + Game6Army.MoveY + this.ArmyBgOffset) {
                            this.PlayerPoint += army.Point;
                            ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.PlayerPoint); // 抛出消息：最新分数
                            army.Remove();
                        }
                    }
                    break;
                case Direction.Left:
                    this.PlayerMoveAnim.rotation = 0;
                    this.PlayerMoveAnim.pos(-60, -70);
                    var army;
                    for (var i = this.armyBox.numChildren - 1; i >= 0; i--) {
                        army = this.armyBox.getChildAt(i);
                        if (army.Direction == Direction.Left && army.x >= Laya.stage.width / 2 - Game6Army.MoveX) {
                            this.PlayerPoint += army.Point;
                            ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.PlayerPoint); // 抛出消息：最新分数
                            army.Remove();
                        }
                    }
                    break;
                case Direction.Right:
                    this.PlayerMoveAnim.rotation = 180;
                    this.PlayerMoveAnim.pos(200, 180);
                    var army;
                    for (var i = this.armyBox.numChildren - 1; i >= 0; i--) {
                        army = this.armyBox.getChildAt(i);
                        if (army.Direction == Direction.Right && army.x <= Laya.stage.width / 2 + Game6Army.MoveX) {
                            this.PlayerPoint += army.Point;
                            ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.PlayerPoint); // 抛出消息：最新分数
                            army.Remove();
                        }
                    }
                    break;
            }
            if (this.CurPhaseIndex < this.PhaseData.length - 1) {
                if (this.PlayerPoint >= this.NextPhasePoint) {
                    this.CurPhaseIndex++;
                    this.CurPhaseData = this.PhaseData[this.CurPhaseIndex];
                    if (this.CurPhaseIndex < this.PhaseData.length - 1) {
                        this.NextPhasePoint = this.PhaseData[this.CurPhaseIndex + 1].Score;
                    }
                    Laya.timer.clear(this, this.CreateArmy);
                    Laya.timer.loop(this.CurPhaseData.Time, this, this.CreateArmy);
                }
            }
        };
        Game6.prototype.CreateArmy = function () {
            var random = Math.random();
            var direction;
            var x = 0;
            var y = 0;
            var skin = "";
            if (random <= 0.25) {
                direction = Direction.Up;
                x = this.topBg.x;
                y = this.topBg.y;
            }
            else if (random <= 0.5) {
                direction = Direction.Down;
                x = this.bottomBg.x;
                y = this.bottomBg.y;
            }
            else if (random <= 0.75) {
                direction = Direction.Left;
                x = this.leftBg.x;
                y = this.leftBg.y;
            }
            else {
                direction = Direction.Right;
                x = this.rightBg.x;
                y = this.rightBg.y;
            }
            var army = new Game6Army("Game1/army_" + direction + ".png");
            this.armyBox.addChild(army);
            army.Init(x, y - this.ArmyBgOffset, direction, this.HitHandler, this.CurPhaseData.Speed, this.ModelData.score);
        };
        Game6.prototype.PlayerBeHited = function () {
            this.IsGameOver = true;
            Laya.timer.clearAll(this);
            var army;
            for (var i = this.armyBox.numChildren - 1; i >= 0; i--) {
                army = this.armyBox.getChildAt(i);
                army.Remove();
            }
            GameUIManager.Instance.OpenUIResult(this.ReviveTimes); // show结算界面
        };
        Game6.prototype.OnClickRetryBtn = function () {
            if (this.IsGameOver == false)
                return;
            this.ResetGame();
        };
        Game6.prototype.OnClickCloseBtn = function () {
            if (this.IsGameOver == false)
                return;
            Laya.timer.clearAll(this);
            GameUIManager.Instance.removeUI(this, true, true);
        };
        return Game6;
    }(ui.Game6UI));
    view.Game6 = Game6;
    var Game6Army = /** @class */ (function (_super) {
        __extends(Game6Army, _super);
        function Game6Army() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Game6Army.prototype.Init = function (x, y, direction, del, speed, point) {
            this.Del = del;
            this.Direction = direction;
            this.Point = point;
            this.size(100, 100);
            this.pivot(this.width / 2, this.height / 2);
            this.pos(x, y);
            Laya.timer.loop(speed, this, this.MoveNext);
        };
        Game6Army.prototype.MoveNext = function () {
            if (this.Direction == Direction.Up) {
                if (this.y + Game6Army.MoveY >= Laya.stage.height / 2) {
                    this.OnHit();
                    return;
                }
                this.y += Game6Army.MoveY;
            }
            else if (this.Direction == Direction.Down) {
                if (this.y - Game6Army.MoveY <= Laya.stage.height / 2) {
                    this.OnHit();
                    return;
                }
                this.y -= Game6Army.MoveY;
            }
            else if (this.Direction == Direction.Left) {
                if (this.x + Game6Army.MoveX >= Laya.stage.width / 2) {
                    this.OnHit();
                    return;
                }
                this.x += Game6Army.MoveX;
            }
            else {
                if (this.x - Game6Army.MoveX <= Laya.stage.width / 2) {
                    this.OnHit();
                    return;
                }
                this.x -= Game6Army.MoveX;
            }
        };
        Game6Army.prototype.OnHit = function () {
            this.Del.runWith(this);
            Laya.timer.clearAll(this);
        };
        Game6Army.prototype.Remove = function () {
            Laya.timer.clearAll(this);
            this.removeSelf();
        };
        Game6Army.MoveX = 105;
        Game6Army.MoveY = 110;
        return Game6Army;
    }(Laya.Image));
})(view || (view = {}));
//# sourceMappingURL=Game6.js.map