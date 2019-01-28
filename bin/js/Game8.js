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
    var Game8 = /** @class */ (function (_super) {
        __extends(Game8, _super);
        function Game8() {
            var _this = _super.call(this) || this;
            _this.GameIsOver = false;
            _this.PlayerPoint = 0;
            _this.MinPlayerY = 435;
            _this.MaxPlayerY = 800;
            _this.LeftPlayerX = 150;
            _this.RightPlayerX = 570;
            _this.PlayerShotOffsetX = 15;
            _this.PlayerShotOffsetY = 65;
            _this.IsLeftMove = true;
            _this.IsMoveUp = true;
            _this.MoveSpeedY = 3;
            _this.ShotEndX = 281;
            _this.ShotSpeedX = 10;
            _this.SuccOffset = 15;
            _this.ReviveTimes = 0;
            UITools.SetActive(_this.pointLbl, false);
            return _this;
        }
        Game8.prototype.Show = function () {
            this.contentSpr.on(Laya.Event.MOUSE_UP, this, this.EnterShotState);
            this.InitGameData();
        };
        // 打开界面
        Game8.prototype.onShow = function () {
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickReTryBtn);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        };
        // 关闭界面
        Game8.prototype.onClosed = function () {
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickReTryBtn);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        };
        Game8.prototype.InitGameData = function () {
            this.GameIsOver = false;
            this.PlayerPoint = 0;
            this.pointLbl.text = "得分" + this.PlayerPoint;
            this.EnterWaitState();
        };
        Game8.prototype.EnterWaitState = function () {
            Laya.timer.clearAll(this);
            //重置位置
            var random = Math.random();
            this.leftPlayer.x = this.LeftPlayerX;
            this.leftPlayer.y = random * (this.MaxPlayerY - this.MinPlayerY) + this.MinPlayerY;
            this.leftShot.pos(this.LeftPlayerX + this.PlayerShotOffsetX, this.leftPlayer.y + this.PlayerShotOffsetY);
            random = Math.random();
            this.rightPlayer.x = this.RightPlayerX;
            this.rightPlayer.y = random * (this.MaxPlayerY - this.MinPlayerY) + this.MinPlayerY;
            this.rightShot.pos(this.RightPlayerX - this.PlayerShotOffsetX, this.rightPlayer.y + this.PlayerShotOffsetY);
            //哪边是猪
            this.IsLeftMove = Math.random() < 0.5 ? true : false;
            this.leftShot.skin = this.IsLeftMove == true ? "Game1/t3.png" : "Game1/t4.png";
            this.rightShot.skin = this.IsLeftMove == false ? "Game1/t3.png" : "Game1/t4.png";
            this.leftShot.skewY = this.IsLeftMove == true ? 0 : 180;
            this.rightShot.skewY = this.IsLeftMove == true ? 0 : 180;
            this.leftPlayer.skin = this.IsLeftMove == true ? PlayerManager.Instance.GetUsedSkinUrl() : "Game2/hongbao_c.png";
            this.leftPlayer.skewY = this.IsLeftMove == true ? 180 : 0;
            this.rightPlayer.skin = this.IsLeftMove == false ? PlayerManager.Instance.GetUsedSkinUrl() : "Game2/hongbao_c.png";
            this.rightPlayer.skewY = this.IsLeftMove == false ? 0 : 180;
            //初始方向
            this.IsMoveUp = Math.random() < 0.5 ? true : false;
            Laya.timer.frameLoop(1, this, this.WaitStateLoop);
        };
        Game8.prototype.WaitStateLoop = function () {
            if (this.IsLeftMove == true) {
                if (this.IsMoveUp) {
                    if (this.leftPlayer.y < this.MinPlayerY) {
                        this.IsMoveUp = false;
                        return;
                    }
                    else {
                        this.leftPlayer.y -= this.MoveSpeedY;
                        this.leftShot.y -= this.MoveSpeedY;
                    }
                }
                else {
                    if (this.leftPlayer.y > this.MaxPlayerY) {
                        this.IsMoveUp = true;
                        return;
                    }
                    else {
                        this.leftPlayer.y += this.MoveSpeedY;
                        this.leftShot.y += this.MoveSpeedY;
                    }
                }
            }
            else {
                if (this.IsMoveUp) {
                    if (this.rightPlayer.y < this.MinPlayerY) {
                        this.IsMoveUp = false;
                        return;
                    }
                    else {
                        this.rightPlayer.y -= this.MoveSpeedY;
                        this.rightShot.y -= this.MoveSpeedY;
                    }
                }
                else {
                    if (this.rightPlayer.y > this.MaxPlayerY) {
                        this.IsMoveUp = true;
                        return;
                    }
                    else {
                        this.rightPlayer.y += this.MoveSpeedY;
                        this.rightShot.y += this.MoveSpeedY;
                    }
                }
            }
        };
        Game8.prototype.EnterShotState = function () {
            MusicManager.Instance.playSound(StringDefine.SOUND_CLICKBTN);
            Laya.timer.clearAll(this);
            if (Math.abs(this.leftPlayer.y - this.rightPlayer.y) < this.SuccOffset) {
                if (this.IsLeftMove) {
                    this.leftPlayer.y = this.rightPlayer.y;
                    this.leftShot.y = this.rightShot.y;
                }
                else {
                    this.rightPlayer.y = this.leftPlayer.y;
                    this.rightShot.y = this.leftShot.y;
                }
            }
            Laya.timer.frameLoop(1, this, this.ShotStateLoop);
        };
        Game8.prototype.ShotStateLoop = function () {
            if (this.leftPlayer.x < this.ShotEndX) {
                this.leftPlayer.x += this.ShotSpeedX;
                this.rightPlayer.x -= this.ShotSpeedX;
                this.leftShot.x += this.ShotSpeedX;
                this.rightShot.x -= this.ShotSpeedX;
            }
            else {
                this.EnterShotEndState();
            }
        };
        Game8.prototype.EnterShotEndState = function () {
            Laya.timer.clearAll(this);
            if (Math.abs(this.leftPlayer.y - this.rightPlayer.y) < this.SuccOffset) {
                this.PlayerPoint += 1;
                this.pointLbl.text = "得分：" + this.PlayerPoint.toString();
                ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.PlayerPoint); // 抛出消息：最新分数
                Laya.timer.loop(500, this, this.EnterWaitState);
            }
            else {
                this.GameIsOver = true;
                this.pointLbl.text = "游戏结束！得分：" + this.PlayerPoint;
                GameUIManager.Instance.OpenUIResult(this.ReviveTimes); // show结算界面
            }
        };
        // 返回首页
        Game8.prototype.OnClickCloseBtn = function () {
            if (this.GameIsOver == false)
                return;
            Laya.timer.clearAll(this);
            GameUIManager.Instance.removeUI(this, true, true);
        };
        // 重玩
        Game8.prototype.OnClickReTryBtn = function () {
            if (this.GameIsOver == false)
                return;
            this.InitGameData();
        };
        // 继续游戏
        Game8.prototype.OnGameContinue = function () {
            if (this.ReviveTimes >= 1)
                return;
            this.GameIsOver = false;
            this.ReviveTimes++;
            this.EnterWaitState();
        };
        return Game8;
    }(ui.Game8UI));
    view.Game8 = Game8;
    // class Game8Player extends Laya.Image {
    //     private MoneyImage: Laya.Image;
    //     private IsUp: boolean;
    //     private IsLeft: boolean;
    //     private ShotDel: Laya.Handler;
    //     public static minY = 500;
    //     public static maxY = 650;
    //     private static speedY = 3;
    //     private static ChangeFactor = 0.2;
    //     private static ChangeTime = 900;
    //     constructor(isLeft: boolean, shotDel: Laya.Handler) {
    //         super();
    //         this.ShotDel = shotDel;
    //         this.IsLeft = isLeft;
    //         this.skin = "Game1/zhu_c.png";
    //         this.size(200, 200);
    //         this.pivot(this.width / 2, this.height / 2);
    //         this.scale(0.5, 0.5);
    //         this.skewY = isLeft == true ? 180 : 0;
    //         if (!this.MoneyImage) {
    //             this.MoneyImage = new Laya.Image();
    //             this.addChild(this.MoneyImage);
    //             this.MoneyImage.skewY = 180;
    //         }
    //     }
    //     public Init(moneyType: number, y: number, isup: boolean, isMove: boolean) {
    //         Laya.Tween.clearAll(this);
    //         Laya.timer.clearAll(this);
    //         this.MoneyImage.skin = moneyType == 1 ? "Game1/t3.png" : "Game1/t4.png";
    //         this.MoneyImage.pos(200, 200);
    //         this.x = this.IsLeft == true ? Laya.stage.width / 2 - 200 : Laya.stage.width / 2 + 200;
    //         this.y = y;
    //         if (isMove == true) {
    //             Laya.timer.frameLoop(1, this, this.OnLoop);
    //             // Laya.timer.loop(Game8Player.ChangeTime, this, this.ChangeDirection);
    //         }
    //     }
    //     OnLoop(): void {
    //         if (this.IsUp == true) {
    //             if (this.y < Game8Player.minY) {
    //                 this.IsUp = false;
    //                 return;
    //             }
    //             this.y -= Game8Player.speedY;
    //         }
    //         else {
    //             if (this.y > Game8Player.maxY) {
    //                 this.IsUp = true;
    //                 return;
    //             }
    //             this.y += Game8Player.speedY;
    //         }
    //     }
    //     ChangeDirection(): void {
    //         var random = Math.random();
    //         if (random < Game8Player.ChangeFactor) {
    //             this.IsUp = !this.IsUp;
    //         }
    //     }
    //     public Shot(): void {
    //         Laya.timer.clearAll(this);
    //         if (this.IsLeft == true) {
    //             Laya.Tween.to(this, { x: Laya.stage.width / 2 - 80 }, 150, null, this.ShotDel);
    //         }
    //         else {
    //             Laya.Tween.to(this, { x: Laya.stage.width / 2 + 80 }, 150);
    //         }
    //     }
    // }
})(view || (view = {}));
//# sourceMappingURL=Game8.js.map