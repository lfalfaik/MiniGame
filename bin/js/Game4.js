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
    var Game4 = /** @class */ (function (_super) {
        __extends(Game4, _super);
        function Game4() {
            var _this = _super.call(this) || this;
            _this.ScaleArr = [1, 2, 3];
            _this.MoneyPos = [875, 765, 655];
            _this.CurScaleIndex = 0;
            _this.PlayerPoint = 0;
            _this.IsGameOver = false;
            _this.ReviveTimes = 0;
            var info = ModelManager.Instance.GetInfoById(4);
            _this.ModelData = ModelManager.Instance.GetDataById(info._id);
            if (_this.ModelData != null)
                _this.PhaseData = ClientTools.GetGamePhaseDatas(_this.ModelData.phase);
            if (_this.player != null) {
                _this.player.skin = PlayerManager.Instance.GetUsedSkinUrl();
            }
            UITools.SetActive(_this.pointLbl, false);
            return _this;
        }
        // 打开界面
        Game4.prototype.onShow = function () {
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickRetryBtn);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        };
        // 关闭界面
        Game4.prototype.onClosed = function () {
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickRetryBtn);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        };
        Game4.prototype.Show = function () {
            this.contentSpr.on(Laya.Event.CLICK, this, this.ChangeScale);
            this.HitHandler = Laya.Handler.create(this, this.OnHit, null, false);
            this.InitGameData();
            this.CreateMoney();
        };
        // 返回主页
        Game4.prototype.OnClickCloseBtn = function () {
            if (this.IsGameOver == false)
                return;
            Laya.timer.clearAll(this);
            GameUIManager.Instance.removeUI(this, true, true);
        };
        // 重玩
        Game4.prototype.OnClickRetryBtn = function () {
            if (this.IsGameOver == false)
                return;
            this.InitGameData();
            this.CreateMoney();
        };
        // 继续游戏
        Game4.prototype.OnGameContinue = function () {
            if (this.ReviveTimes >= 1)
                return;
            this.IsGameOver = false;
            this.ReviveTimes++;
            this.CreateMoney();
        };
        Game4.prototype.InitGameData = function () {
            this.CurPhaseIndex = 0;
            this.CurPhaseData = this.PhaseData[this.CurPhaseIndex];
            this.NextPhasePoint = this.PhaseData[this.CurPhaseIndex + 1].Score;
            this.IsGameOver = false;
            this.CurScaleIndex = this.RandomPos();
            this.PlayerPoint = 0;
            this.pointLbl.text = "得分：" + this.PlayerPoint;
            this.player.y = this.MoneyPos[this.CurScaleIndex];
            this.column.scaleY = this.ScaleArr[this.CurScaleIndex];
        };
        Game4.prototype.RandomPos = function () {
            var random = Math.random();
            if (random <= 0.33) {
                return 0;
            }
            else if (random <= 0.66)
                return 1;
            else
                return 2;
        };
        Game4.prototype.ChangeScale = function () {
            MusicManager.Instance.playSound(StringDefine.SOUND_CLICKBTN);
            this.CurScaleIndex = this.CurScaleIndex >= 2 ? 0 : this.CurScaleIndex + 1;
            Laya.Tween.to(this.player, { y: this.MoneyPos[this.CurScaleIndex] }, 50);
            Laya.Tween.to(this.column, { scaleY: this.ScaleArr[this.CurScaleIndex] }, 50);
        };
        Game4.prototype.OnHit = function (money) {
            if (money.PosIndex == this.CurScaleIndex) {
                this.PlayerPoint += this.ModelData.score;
                this.pointLbl.text = "得分:" + this.PlayerPoint;
                ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.PlayerPoint); // 抛出消息：最新分数
                if (this.CurPhaseIndex < this.PhaseData.length - 1) {
                    if (this.PlayerPoint >= this.NextPhasePoint) {
                        this.CurPhaseIndex++;
                        this.CurPhaseData = this.PhaseData[this.CurPhaseIndex];
                        if (this.CurPhaseIndex < this.PhaseData.length - 1) {
                            this.NextPhasePoint = this.PhaseData[this.CurPhaseIndex + 1].Score;
                        }
                    }
                }
                this.CreateMoney();
            }
            else {
                this.IsGameOver = true;
                this.pointLbl.text = "游戏结束！得分：" + this.PlayerPoint;
                GameUIManager.Instance.OpenUIResult(this.ReviveTimes); // show结算界面
                Laya.timer.clearAll(this);
            }
        };
        Game4.prototype.CreateMoney = function () {
            var posIndex = this.RandomPos();
            var LeftOrRight = Math.random() > 0.5 ? true : false;
            var money = new Game4Money();
            this.addChild(money);
            money.Init(this.MoneyPos[posIndex] + 50, LeftOrRight, posIndex, this.HitHandler, this.CurPhaseData.Speed / 60);
        };
        return Game4;
    }(ui.Game4UI));
    view.Game4 = Game4;
    var Game4Money = /** @class */ (function (_super) {
        __extends(Game4Money, _super);
        function Game4Money() {
            var _this = _super.call(this) || this;
            _this.name = "money";
            return _this;
        }
        Game4Money.prototype.Init = function (y, leftOrRight, posIndex, hitDel, speed) {
            this.LeftOrRight = leftOrRight;
            this.PosIndex = posIndex;
            this.HitDel = hitDel;
            this.Speed = speed;
            this.skin = "Game2/hongbao_c.png";
            this.x = leftOrRight == true ? -this.width / 4 : Laya.stage.width + this.width / 4;
            this.y = y;
            this.size(325, 227);
            this.pivot(this.width / 2, this.height / 2);
            this.scale(0.5, 0.5);
            this.skewY = leftOrRight == true ? 0 : 180;
            Laya.timer.frameLoop(1, this, this.OnLoop);
        };
        Game4Money.prototype.OnLoop = function () {
            if (this.LeftOrRight == true) {
                if (this.x >= 225) {
                    if (this.HitDel != null) {
                        this.HitDel.runWith(this);
                    }
                    Laya.timer.clearAll(this);
                    this.removeSelf();
                }
                this.x += this.Speed;
            }
            else if (this.LeftOrRight == false) {
                if (this.x <= 490) {
                    if (this.HitDel != null) {
                        this.HitDel.runWith(this);
                    }
                    Laya.timer.clearAll(this);
                    this.removeSelf();
                }
                this.x -= this.Speed;
            }
        };
        return Game4Money;
    }(Laya.Image));
})(view || (view = {}));
//# sourceMappingURL=Game4.js.map