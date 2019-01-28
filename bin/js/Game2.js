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
    var Game2 = /** @class */ (function (_super) {
        __extends(Game2, _super);
        function Game2() {
            var _this = _super.call(this) || this;
            _this.IsLeftDown = false;
            _this.PlayerPos = [974, 863];
            _this.Point = 0;
            _this.IsGameOver = false;
            _this.ReviveTimes = 0;
            var info = ModelManager.Instance.GetInfoById(2);
            _this.ModelData = ModelManager.Instance.GetDataById(info._id);
            if (_this.ModelData != null)
                _this.PhaseData = ClientTools.GetGamePhaseDatas(_this.ModelData.phase);
            if (_this.player1 != null) {
                _this.player1.skin = PlayerManager.Instance.GetUsedSkinUrl();
            }
            if (_this.player2 != null) {
                _this.player2.skin = PlayerManager.Instance.GetUsedSkinUrl();
            }
            UITools.SetActive(_this.pointLbl, false);
            return _this;
        }
        // 打开界面
        Game2.prototype.onShow = function () {
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickRetryBtn);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        };
        // 关闭界面
        Game2.prototype.onClosed = function () {
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickRetryBtn);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        };
        Game2.prototype.Show = function () {
            this.contentSpr.on(Laya.Event.CLICK, this, this.ChangeReverse);
            this.HitHandler = Laya.Handler.create(this, this.OnHit, null, false);
            this.InitGameData();
            this.CreateMoney();
        };
        // 返回首页
        Game2.prototype.OnClickCloseBtn = function () {
            if (this.IsGameOver == false)
                return;
            Laya.timer.clearAll(this);
            GameUIManager.Instance.removeUI(this, true, true);
        };
        // 重玩一次
        Game2.prototype.OnClickRetryBtn = function () {
            if (this.IsGameOver == false)
                return;
            this.InitGameData();
            this.CreateMoney();
        };
        // 继续游戏
        Game2.prototype.OnGameContinue = function () {
            if (this.ReviveTimes >= 1)
                return;
            this.IsGameOver = false;
            this.ReviveTimes++;
            this.CreateMoney();
        };
        Game2.prototype.InitGameData = function () {
            this.IsGameOver = false;
            this.IsLeftDown = Math.random() > 0.5 ? true : false;
            this.Point = 0;
            this.pointLbl.text = "得分：" + this.Point;
            this.player1.y = this.IsLeftDown == true ? this.PlayerPos[0] : this.PlayerPos[1];
            this.player2.y = this.IsLeftDown == false ? this.PlayerPos[0] : this.PlayerPos[1];
            this.column1.scaleY = this.IsLeftDown == true ? 1 : 2;
            this.column2.scaleY = this.IsLeftDown == false ? 1 : 2;
            this.CurPhaseIndex = 0;
            this.CurPhaseData = this.PhaseData[this.CurPhaseIndex];
            this.NextPhasePoint = this.PhaseData[this.CurPhaseIndex + 1].Score;
        };
        Game2.prototype.ChangeReverse = function () {
            MusicManager.Instance.playSound(StringDefine.SOUND_CLICKBTN);
            if (this.IsGameOver == true)
                return;
            this.IsLeftDown = !this.IsLeftDown;
            if (this.IsLeftDown) {
                Laya.Tween.to(this.player1, { y: this.PlayerPos[0] }, 50);
                Laya.Tween.to(this.column1, { scaleY: 1 }, 50);
                Laya.Tween.to(this.player2, { y: this.PlayerPos[1] }, 50);
                Laya.Tween.to(this.column2, { scaleY: 2 }, 50);
            }
            else {
                Laya.Tween.to(this.player1, { y: this.PlayerPos[1] }, 50);
                Laya.Tween.to(this.column1, { scaleY: 2 }, 50);
                Laya.Tween.to(this.player2, { y: this.PlayerPos[0] }, 50);
                Laya.Tween.to(this.column2, { scaleY: 1 }, 50);
            }
        };
        Game2.prototype.OnHit = function (money) {
            if (money.UpOrDown != this.IsLeftDown) {
                this.Point += this.ModelData.score;
                ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.Point); // 抛出消息：最新分数
                this.pointLbl.text = "得分:" + this.Point;
                if (this.CurPhaseIndex < this.PhaseData.length - 1) {
                    if (this.Point >= this.NextPhasePoint) {
                        this.CurPhaseIndex++;
                        this.CurPhaseData = this.PhaseData[this.CurPhaseIndex];
                        if (this.CurPhaseIndex < this.PhaseData.length - 1) {
                            this.NextPhasePoint = this.PhaseData[this.CurPhaseIndex + 1].Score;
                        }
                    }
                }
                for (var i = this.numChildren - 1; i >= 0; i--) {
                    var money = this.getChildByName("money");
                    if (money) {
                        money.Remove();
                    }
                }
                this.CreateMoney();
            }
            else {
                this.IsGameOver = true;
                this.pointLbl.text = "游戏结束！得分：" + this.Point;
                GameUIManager.Instance.OpenUIResult(this.ReviveTimes); // show结算界面
                Laya.timer.clearAll(this);
            }
        };
        Game2.prototype.CreateMoney = function () {
            var LeftUpOrDown = Math.random() > 0.5 ? true : false;
            var money1 = new Game2Money();
            this.addChild(money1);
            money1.Init(1, LeftUpOrDown, this.HitHandler, this.CurPhaseData.Speed / 60);
            var money2 = new Game2Money();
            this.addChild(money2);
            money2.Init(2, !LeftUpOrDown, this.HitHandler, this.CurPhaseData.Speed / 60);
        };
        return Game2;
    }(ui.Game2UI));
    view.Game2 = Game2;
})(view || (view = {}));
var Game2Money = /** @class */ (function (_super) {
    __extends(Game2Money, _super);
    function Game2Money() {
        var _this = _super.call(this) || this;
        _this.name = "money";
        return _this;
    }
    Game2Money.prototype.Init = function (leftOrRight, upOrDown, hitDel, speed) {
        this.LeftOrRight = leftOrRight;
        this.UpOrDown = upOrDown;
        this.HitDel = hitDel;
        this.Speed = speed;
        this.skin = "Game2/hongbao_c.png";
        this.x = leftOrRight == 1 ? -this.width / 4 : Laya.stage.width + this.width / 4;
        this.y = upOrDown == true ? 803 : 928;
        this.size(325, 227);
        this.pivot(this.width / 2, this.height / 2);
        this.scale(0.5, 0.5);
        this.skewY = this.LeftOrRight == 1 ? 0 : 180;
        Laya.timer.frameLoop(1, this, this.OnLoop);
    };
    Game2Money.prototype.OnLoop = function () {
        if (this.LeftOrRight == 1) {
            if (this.x >= 130) {
                if (this.HitDel != null) {
                    this.HitDel.runWith(this);
                }
                this.Remove();
            }
            this.x += this.Speed;
        }
        else if (this.LeftOrRight == 2) {
            if (this.x <= 590) {
                // if (this.HitDel != null) {
                //     this.HitDel.runWith(this);
                // }
                this.Remove();
            }
            this.x -= this.Speed;
        }
    };
    Game2Money.prototype.Remove = function () {
        Laya.timer.clearAll(this);
        this.removeSelf();
    };
    return Game2Money;
}(Laya.Image));
//# sourceMappingURL=Game2.js.map