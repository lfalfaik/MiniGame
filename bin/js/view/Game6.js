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
            var info = ModelManager.Instance.GetInfoById(6);
            {
                if (info != null && info._data != null) {
                    _this.PhaseData = ClientTools.GetGamePhaseDatas(info._data.phase);
                }
            }
            _this.HitHandler = Laya.Handler.create(_this, _this.OnHit, null, false);
            return _this;
        }
        Game6.prototype.onShow = function () {
            this.closeBtn.on(Laya.Event.CLICK, this, this.OnClickCloseBtn);
            this.retryBtn.on(Laya.Event.CLICK, this, this.OnClickRetryBtn);
            this.keyUp.on(Laya.Event.CLICK, this, this.OnHit, [Direction.Up]);
            this.keyDown.on(Laya.Event.CLICK, this, this.OnHit, [Direction.Down]);
            this.keyRight.on(Laya.Event.CLICK, this, this.OnHit, [Direction.Right]);
            this.keyLeft.on(Laya.Event.CLICK, this, this.OnHit, [Direction.Left]);
            this.ResetGame();
        };
        Game6.prototype.PlayHitAction = function (direction) {
            this.CurPlayerDir = direction;
            switch (direction) {
                case Direction.Up:
                    this.player.skin = "";
                    break;
                case Direction.Down:
                    this.player.skin = "";
                    break;
                case Direction.Left:
                    this.player.skin = "";
                    break;
                case Direction.Right:
                    this.player.skin = "";
                    break;
            }
        };
        Game6.prototype.ResetGame = function () {
            Laya.timer.clearAll(this);
            this.PlayerPoint = 0;
            this.IsGameOver = false;
            Laya.timer.loop(1000, this, this.CreateArmy);
        };
        Game6.prototype.CreateArmy = function () {
            var random = Math.random();
            var direction;
            if (random <= 0.25) {
                direction = Direction.Up;
            }
            else if (random <= 0.5) {
                direction = Direction.Down;
            }
            else if (random <= 0.75) {
                direction = Direction.Left;
            }
            else {
                direction = Direction.Right;
            }
            var army = new Game6Army("skin/pig_01.png");
            this.addChild(army);
            army.Init(this.leftBg.x, this.leftBg.y - this.ArmyBgOffset, direction, this.HitHandler, 500, 1);
        };
        Game6.prototype.OnHit = function (army) {
            if (this.CurPlayerDir == army.Direction) {
                this.PlayerPoint += army.Point;
            }
            else {
                this.IsGameOver = true;
            }
        };
        Game6.prototype.OnClickRetryBtn = function () {
            if (this.IsGameOver == false)
                return;
            this.ResetGame();
        };
        Game6.prototype.OnClickCloseBtn = function () {
            if (this.IsGameOver == false)
                return;
            GameUIManager.Instance.removeUI(this, true);
            Laya.timer.clearAll(this);
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
            this.skin = "skin/pig_01.png";
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
        Game6Army.MoveX = 105;
        Game6Army.MoveY = 110;
        return Game6Army;
    }(Laya.Image));
})(view || (view = {}));
//# sourceMappingURL=Game6.js.map