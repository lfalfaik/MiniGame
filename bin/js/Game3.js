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
    var Game3 = /** @class */ (function (_super) {
        __extends(Game3, _super);
        function Game3() {
            var _this = _super.call(this) || this;
            _this.PosArr = new Array();
            _this.CurPosIndex = 0;
            _this.PlayerPoint = 0;
            _this.NextMoneyTime = 0;
            _this.ReviveTimes = 0;
            _this.PosArr.push(new Vector2(170, 985), new Vector2(367, 985), new Vector2(545, 985));
            var info = ModelManager.Instance.GetInfoById(3);
            _this.ModelData = ModelManager.Instance.GetDataById(info._id);
            if (_this.ModelData != null)
                _this.PhaseData = ClientTools.GetGamePhaseDatas(_this.ModelData.phase);
            if (_this.player1 != null) {
                _this.player1.skin = PlayerManager.Instance.GetUsedSkinUrl();
            }
            UITools.SetActive(_this.pointLbl, false);
            return _this;
        }
        // 打开界面
        Game3.prototype.onShow = function () {
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickReTryBtn);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        };
        // 关闭界面
        Game3.prototype.onClosed = function () {
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickReTryBtn);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        };
        Game3.prototype.Show = function () {
            this.contentSpr.on(Laya.Event.MOUSE_UP, this, this.OnChangePos);
            this.InitGameData();
            this.HitHandle = Laya.Handler.create(this, this.OnHit, null, false);
        };
        Game3.prototype.InitGameData = function () {
            Laya.timer.clearAll(this);
            this.ReviveTimes = 0;
            this.CurPhaseIndex = 0;
            this.CurPhaseData = this.PhaseData[this.CurPhaseIndex];
            this.NextPhasePoint = this.PhaseData[this.CurPhaseIndex + 1].Score;
            this.PlayerPoint = 0;
            this.IsGameOver = false;
            this.CurPosIndex = 0;
            this.NextMoneyTime = this.CurPhaseData.Time;
            this.pointLbl.text = "得分：" + this.PlayerPoint;
            this.player1.pos(this.PosArr[this.CurPosIndex].x, this.PosArr[this.CurPosIndex].y);
            Laya.timer.loop(100, this, this.CreateMoney);
        };
        Game3.prototype.OnChangePos = function () {
            MusicManager.Instance.playSound(StringDefine.SOUND_CLICKBTN);
            this.CurPosIndex = this.CurPosIndex >= 2 ? 0 : this.CurPosIndex + 1;
            Laya.Tween.to(this.player1, { x: this.PosArr[this.CurPosIndex].x }, 50);
        };
        // 重玩一次
        Game3.prototype.OnClickReTryBtn = function () {
            if (this.IsGameOver == false)
                return;
            this.IsGameOver = false;
            this.InitGameData();
        };
        // 继续游戏
        Game3.prototype.OnGameContinue = function () {
            if (this.ReviveTimes >= 1)
                return;
            Laya.timer.clearAll(this);
            this.ReviveTimes++;
            this.IsGameOver = false;
            Laya.timer.loop(100, this, this.CreateMoney);
        };
        // 返回主页
        Game3.prototype.OnClickCloseBtn = function () {
            if (this.IsGameOver == false)
                return;
            Laya.timer.clearAll(this);
            GameUIManager.Instance.removeUI(this, true, true);
        };
        Game3.prototype.OnHit = function (money) {
            if (money.PosIndex == this.CurPosIndex && money.Type == 1) {
                this.PlayerPoint += this.ModelData.score;
                ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.PlayerPoint); // 抛出消息：最新分数
                this.pointLbl.text = "得分：" + this.PlayerPoint.toString();
                if (this.CurPhaseIndex < this.PhaseData.length - 1) {
                    if (this.PlayerPoint >= this.NextPhasePoint) {
                        this.CurPhaseIndex++;
                        this.CurPhaseData = this.PhaseData[this.CurPhaseIndex];
                        if (this.CurPhaseIndex < this.PhaseData.length - 1) {
                            this.NextPhasePoint = this.PhaseData[this.CurPhaseIndex + 1].Score;
                        }
                    }
                }
            }
            else if ((money.Type == 2 && money.PosIndex == this.CurPosIndex) || (money.Type == 1 && money.PosIndex != this.CurPosIndex)) {
                Laya.timer.clearAll(this);
                for (var i = this.numChildren - 1; i >= 0; i--) {
                    var item = this.getChildAt(i);
                    if (item.name == "money") {
                        Laya.timer.clearAll(item);
                        item.removeSelf();
                    }
                }
                this.pointLbl.text = "游戏结束！得分：" + this.PlayerPoint;
                GameUIManager.Instance.OpenUIResult(this.ReviveTimes); // show结算界面
                this.IsGameOver = true;
            }
        };
        Game3.prototype.CreateMoney = function () {
            if (this.NextMoneyTime < this.CurPhaseData.Time) {
                this.NextMoneyTime += 100;
                return;
            }
            this.NextMoneyTime = 0;
            var money = new Game3Money();
            this.addChild(money);
            var random = Math.random();
            var posIndex;
            if (random <= 0.33) {
                posIndex = 0;
            }
            else if (random < 0.66) {
                posIndex = 1;
            }
            else {
                posIndex = 2;
            }
            money.pos(this.PosArr[posIndex].x, 0);
            random = Math.random();
            var type = random >= 0.2 ? 1 : 2;
            money.Init(type, posIndex, this.HitHandle, this.CurPhaseData.Speed / 60);
        };
        return Game3;
    }(ui.Game3UI));
    view.Game3 = Game3;
    var Game3Money = /** @class */ (function (_super) {
        __extends(Game3Money, _super);
        function Game3Money() {
            return _super.call(this) || this;
        }
        Game3Money.prototype.Init = function (type, posIndex, hitDel, speed) {
            this.Type = type;
            this.PosIndex = posIndex;
            this.HitDel = hitDel;
            this.Speed = speed;
            this.name = "money";
            var icon = type == 1 ? "Game1/hongbao.png" : "Game1/z.png";
            this.loadImage(icon, 0, 0, 227, 325);
            this.pivotX = this.width / 2;
            this.pivotY = this.height;
            this.scale(0.5, 0.5);
            Laya.timer.frameLoop(1, this, this.Move);
        };
        Game3Money.prototype.Move = function () {
            if (this.y >= 985) {
                if (this.HitDel != null) {
                    this.HitDel.runWith(this);
                }
                Laya.timer.clearAll(this);
                this.removeSelf();
            }
            this.y += this.Speed;
        };
        return Game3Money;
    }(Laya.Sprite));
})(view || (view = {}));
//# sourceMappingURL=Game3.js.map