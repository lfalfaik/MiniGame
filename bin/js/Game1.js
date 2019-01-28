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
    var Game1 = /** @class */ (function (_super) {
        __extends(Game1, _super);
        function Game1() {
            var _this = _super.call(this) || this;
            _this.Pos1 = [215, 1070];
            _this.Pos2 = [500, 1070];
            _this.IsPlayerReverse = false;
            _this.MoneyPos1 = [215, -400];
            _this.MoneyPos2 = [500, -400];
            _this.Point = 0;
            _this.IsGameOver = false;
            _this.NextMoneyTime = 0;
            //复活继续游戏次数
            _this.ReviveTimes = 0;
            _this.PlayerMoveAnim = new Laya.Animation;
            if (_this.player1 != null) {
                _this.player1.addChild(_this.PlayerMoveAnim);
                _this.PlayerMoveAnim.scale(4, 4);
            }
            _this.PlayerMoveAnim.on(Laya.Event.COMPLETE, _this, function () { this.PlayerMoveAnim.visible = false; });
            var info = ModelManager.Instance.GetInfoById(1);
            _this.ModelData = ModelManager.Instance.GetDataById(info._id);
            if (_this.ModelData != null)
                _this.PhaseData = ClientTools.GetGamePhaseDatas(_this.ModelData.phase);
            UITools.SetActive(_this.pointLbl, false);
            return _this;
        }
        // 打开界面
        Game1.prototype.onShow = function () {
            this.player1.skin = PlayerManager.Instance.GetUsedSkinUrl();
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickReTryBtn);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        };
        // 关闭界面
        Game1.prototype.onClosed = function () {
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickReTryBtn);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        };
        Game1.prototype.Show = function () {
            this.contentSpr.on(Laya.Event.MOUSE_UP, this, this.OnChangePos);
            this.InitGameData();
            this.HitHandle = Laya.Handler.create(this, this.OnHit, null, false);
        };
        Game1.prototype.InitGameData = function () {
            Laya.timer.clearAll(this);
            this.CurPhaseIndex = 0;
            this.CurPhaseData = this.PhaseData[this.CurPhaseIndex];
            this.NextPhasePoint = this.PhaseData[this.CurPhaseIndex + 1].Score;
            this.ReviveTimes = 0;
            this.Point = 0;
            this.IsPlayerReverse = false;
            this.IsGameOver = false;
            this.NextMoneyTime = this.CurPhaseData.Time;
            this.pointLbl.text = "得分：" + this.Point;
            this.player1.pos(this.Pos1[0], this.Pos1[1]);
            Laya.timer.loop(100, this, this.CreateMoney);
        };
        Game1.prototype.OnChangePos = function () {
            MusicManager.Instance.playSound(StringDefine.SOUND_CLICKBTN);
            if (this.IsGameOver)
                return;
            this.IsPlayerReverse = !this.IsPlayerReverse;
            this.PlayerMoveAnim.visible = true;
            this.PlayerMoveAnim.play(0, false, "PigBeat");
            if (this.IsPlayerReverse) {
                this.PlayerMoveAnim.pos(140, -90);
                this.PlayerMoveAnim.skewY = 180;
                Laya.Tween.to(this.player1, { x: this.Pos2[0] }, 50);
            }
            else {
                this.PlayerMoveAnim.pos(-40, -90);
                this.PlayerMoveAnim.skewY = 0;
                Laya.Tween.to(this.player1, { x: this.Pos1[0] }, 50);
            }
        };
        Game1.prototype.OnHit = function (money) {
            var lx = this.player1.x - 50;
            var ly = this.player1.y;
            var rx = this.player1.x + 50;
            var ry = this.player1.y;
            var tx = this.player1.x - 50;
            var ty = this.player1.y + 100;
            var bx = this.player1.x + 50;
            var by = this.player1.y + 100;
            if (money.hitTestPoint(lx, ly) || money.hitTestPoint(rx, ry) || money.hitTestPoint(tx, ty) || money.hitTestPoint(bx, by)) {
                if (money.Type == 1) {
                    this.Point += this.ModelData.score;
                    ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.Point); // 抛出消息：最新分数
                    this.pointLbl.text = "得分：" + this.Point.toString();
                    money.Remove();
                    if (this.CurPhaseIndex < this.PhaseData.length - 1) {
                        if (this.Point >= this.NextPhasePoint) {
                            this.CurPhaseIndex++;
                            this.CurPhaseData = this.PhaseData[this.CurPhaseIndex];
                            if (this.CurPhaseIndex < this.PhaseData.length - 1) {
                                this.NextPhasePoint = this.PhaseData[this.CurPhaseIndex + 1].Score;
                            }
                        }
                    }
                }
                else {
                    this.GameOver();
                }
            }
            else {
                if (money.y > 1170) {
                    if (money.Type == 1) {
                        this.GameOver();
                    }
                    else {
                        money.Remove();
                    }
                }
            }
        };
        Game1.prototype.GameOver = function () {
            Laya.timer.clearAll(this);
            for (var i = this.numChildren - 1; i >= 0; i--) {
                var item = this.getChildAt(i);
                if (item.name == "money") {
                    Laya.timer.clearAll(item);
                    item.removeSelf();
                }
            }
            this.pointLbl.text = "游戏结束！得分：" + this.Point;
            GameUIManager.Instance.OpenUIResult(this.ReviveTimes); // show结算界面
            this.IsGameOver = true;
        };
        Game1.prototype.CreateMoney = function () {
            if (this.NextMoneyTime < this.CurPhaseData.Time) {
                this.NextMoneyTime += 100;
                return;
            }
            this.NextMoneyTime = 0;
            var money1 = new Game1Money();
            this.addChild(money1);
            var IsMoneyReverse = Math.random() > 0.5 ? true : false;
            if (IsMoneyReverse) {
                money1.pos(this.MoneyPos2[0], this.MoneyPos2[1]);
            }
            else {
                money1.pos(this.MoneyPos1[0], this.MoneyPos1[1]);
            }
            money1.Init(Math.random() > 0.3 ? 1 : 2, IsMoneyReverse, this.HitHandle, this.CurPhaseData.Speed / 60);
        };
        // 重新玩一次
        Game1.prototype.OnClickReTryBtn = function () {
            if (this.IsGameOver == false)
                return;
            this.IsGameOver = false;
            this.InitGameData();
        };
        // 返回首页
        Game1.prototype.OnClickCloseBtn = function () {
            if (this.IsGameOver == false)
                return;
            Laya.timer.clearAll(this);
            GameUIManager.Instance.removeUI(this, true, true);
        };
        // 继续游戏
        Game1.prototype.OnGameContinue = function () {
            if (this.ReviveTimes >= 1)
                return;
            Laya.timer.clearAll(this);
            this.ReviveTimes++;
            this.NextMoneyTime = this.CurPhaseData.Time;
            this.IsGameOver = false;
            Laya.timer.loop(100, this, this.CreateMoney);
        };
        return Game1;
    }(ui.Game1UI));
    view.Game1 = Game1;
})(view || (view = {}));
var Game1Money = /** @class */ (function (_super) {
    __extends(Game1Money, _super);
    function Game1Money() {
        return _super.call(this) || this;
    }
    Game1Money.prototype.Init = function (type, isReverse, hitDel, speed) {
        this.Type = type;
        this.Isreverse = isReverse;
        this.HitDel = hitDel;
        this.Speed = speed;
        this.name = "money";
        if (this.Type == 1) {
            this.loadImage("Game1/hongbao.png", 0, 0, 227, 325);
        }
        else {
            this.loadImage("Game1/z.png", 0, 0, 227, 325);
        }
        this.pivotX = this.width / 2;
        this.pivotY = this.height;
        this.scale(0.5, 0.5);
        Laya.timer.frameLoop(1, this, this.Move);
    };
    Game1Money.prototype.Move = function () {
        if (this.y >= 1047) {
            if (this.HitDel != null) {
                this.HitDel.runWith(this);
            }
        }
        this.y += this.Speed;
    };
    Game1Money.prototype.Remove = function () {
        Laya.timer.clearAll(this);
        this.removeSelf();
    };
    return Game1Money;
}(Laya.Sprite));
//# sourceMappingURL=Game1.js.map