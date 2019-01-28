/*
* name;
*/
module view {
    export class Game9 extends ui.Game9UI {
        private GameIsOver: boolean = false;
        private PlayerPoint: number = 0;

        private MinPlayerY: number = 535;
        private MaxPlayerY: number = 700;
        private LeftPlayerX: number = 150;
        private RightPlayerX: number = 570;
        private PlayerShotOffsetX: number = 15;
        private PlayerShotOffsetY: number = 65;
        private IsLeftCusp: boolean = true;
        private LeftIsMoveUp: boolean = true;
        private RightIsMoveUp: boolean = true;
        private MoveSpeedY: number = 3;
        private ShotEndX: number = 281;
        private ShotSpeedX: number = 10;
        private SuccOffset: number = 20;
        private ChangeDirectionFactor: number = 0.1;
        private ChangeDirectionTime: number = 1000;
        private ReviveTimes: number = 0;

        constructor() {
            super();
            UITools.SetActive(this.pointLbl, false);
        }

        // 打开界面
        onShow() {
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickReTryBtn);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        }
        // 关闭界面
        onClosed(): void {
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickReTryBtn);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        }

        Show(): void {
            this.contentSpr.on(Laya.Event.MOUSE_UP, this, this.EnterShotState);
            this.InitGameData();
        }

        InitGameData(): void {
            this.GameIsOver = false;
            this.PlayerPoint = 0;
            this.pointLbl.text = "得分" + this.PlayerPoint;
            this.EnterWaitState();
        }
        EnterWaitState(): void {
            Laya.timer.clearAll(this);
            //重置位置
            var random: number = Math.random();
            this.leftPlayer.x = this.LeftPlayerX;
            this.leftPlayer.y = random * (this.MaxPlayerY - this.MinPlayerY) + this.MinPlayerY;
            this.leftShot.pos(this.LeftPlayerX + this.PlayerShotOffsetX, this.leftPlayer.y + this.PlayerShotOffsetY);
            random = Math.random();
            this.rightPlayer.x = this.RightPlayerX;
            this.rightPlayer.y = random * (this.MaxPlayerY - this.MinPlayerY) + this.MinPlayerY;
            this.rightShot.pos(this.RightPlayerX - this.PlayerShotOffsetX, this.rightPlayer.y + this.PlayerShotOffsetY);
            //哪个猪下面的是尖的
            this.IsLeftCusp = Math.random() < 0.5 ? true : false;
            this.leftShot.skin = this.IsLeftCusp == true ? "Game1/t3.png" : "Game1/t4.png";
            this.rightShot.skin = this.IsLeftCusp == false ? "Game1/t3.png" : "Game1/t4.png";
            this.leftShot.skewY = this.IsLeftCusp == true ? 0 : 180;
            this.rightShot.skewY = this.IsLeftCusp == true ? 0 : 180;
            this.leftPlayer.skin = this.IsLeftCusp == true ? PlayerManager.Instance.GetUsedSkinUrl() : "Game2/hongbao_c.png";
            this.leftPlayer.skewY = this.IsLeftCusp == true ? 180 : 0;
            this.rightPlayer.skin = this.IsLeftCusp == false ? PlayerManager.Instance.GetUsedSkinUrl() : "Game2/hongbao_c.png";
            this.rightPlayer.skewY = this.IsLeftCusp == false ? 0 : 180;
            //初始方向
            this.LeftIsMoveUp = Math.random() < 0.5 ? true : false;
            this.RightIsMoveUp = Math.random() < 0.5 ? true : false;
            Laya.timer.frameLoop(1, this, this.WaitStateLoop);
            Laya.timer.loop(this.ChangeDirectionTime, this, this.ChangeDirection);
        }
        WaitStateLoop(): void {
            if (this.LeftIsMoveUp) {
                if (this.leftPlayer.y < this.MinPlayerY) {
                    this.LeftIsMoveUp = false;
                    return;
                }
                else {
                    this.leftPlayer.y -= this.MoveSpeedY;
                    this.leftShot.y -= this.MoveSpeedY;
                }
            }
            else {
                if (this.leftPlayer.y > this.MaxPlayerY) {
                    this.LeftIsMoveUp = true;
                    return;
                }
                else {
                    this.leftPlayer.y += this.MoveSpeedY;
                    this.leftShot.y += this.MoveSpeedY;
                }
            }
            if (this.RightIsMoveUp) {
                if (this.rightPlayer.y < this.MinPlayerY) {
                    this.RightIsMoveUp = false;
                    return;
                }
                else {
                    this.rightPlayer.y -= this.MoveSpeedY;
                    this.rightShot.y -= this.MoveSpeedY;
                }
            }
            else {
                if (this.rightPlayer.y > this.MaxPlayerY) {
                    this.RightIsMoveUp = true;
                    return;
                }
                else {
                    this.rightPlayer.y += this.MoveSpeedY;
                    this.rightShot.y += this.MoveSpeedY;
                }
            }
        }
        ChangeDirection(): void {
            var random: number = Math.random();
            if (random <= this.ChangeDirectionFactor) {
                this.LeftIsMoveUp = !this.LeftIsMoveUp;
            }
            random = Math.random();
            if (random <= this.ChangeDirectionFactor) {
                this.RightIsMoveUp = !this.RightIsMoveUp;
            }
        }
        EnterShotState(): void {
            MusicManager.Instance.playSound(StringDefine.SOUND_CLICKBTN);
            Laya.timer.clearAll(this);
            if (Math.abs(this.leftPlayer.y - this.rightPlayer.y) < this.SuccOffset) {
                if (this.IsLeftCusp) {
                    this.leftPlayer.y = this.rightPlayer.y;
                    this.leftShot.y = this.rightShot.y;
                }
                else {
                    this.rightPlayer.y = this.leftPlayer.y;
                    this.rightShot.y = this.leftShot.y;
                }
            }
            Laya.timer.frameLoop(1, this, this.ShotStateLoop);
        }
        ShotStateLoop(): void {
            if (this.leftPlayer.x < this.ShotEndX) {
                this.leftPlayer.x += this.ShotSpeedX;
                this.rightPlayer.x -= this.ShotSpeedX;
                this.leftShot.x += this.ShotSpeedX;
                this.rightShot.x -= this.ShotSpeedX;
            }
            else {
                this.EnterShotEndState();
            }
        }
        EnterShotEndState(): void {
            Laya.timer.clearAll(this);
            if (Math.abs(this.leftPlayer.y - this.rightPlayer.y) < this.SuccOffset) {
                this.PlayerPoint += 1;
                ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.PlayerPoint);// 抛出消息：最新分数
                this.pointLbl.text = "得分：" + this.PlayerPoint.toString();
                Laya.timer.loop(500, this, this.EnterWaitState);
            }
            else {
                this.GameIsOver = true;
                this.pointLbl.text = "游戏结束！得分：" + this.PlayerPoint;
                GameUIManager.Instance.OpenUIResult(this.ReviveTimes);// show结算界面
            }
        }
        OnClickCloseBtn(): void {
            if (this.GameIsOver == false) return;
            Laya.timer.clearAll(this);
            GameUIManager.Instance.removeUI(this, true, true);
        }
        OnClickReTryBtn(): void {
            if (this.GameIsOver == false) return;
            this.InitGameData();
        }
        // 继续游戏
        OnGameContinue() {
            if (this.ReviveTimes >= 1) return;
            this.ReviveTimes++;
            this.GameIsOver = false;
            this.EnterWaitState();
        }
    }
    // class Game9Player extends Laya.Image {
    //     private MoneyImage: Laya.Image;
    //     private IsUp: boolean;
    //     private IsLeft: boolean;
    //     private ShotDel: Laya.Handler;
    //     public static minY = 500;
    //     public static maxY = 650;
    //     private static speedY = 1.5;
    //     private static ChangeFactor = 0.2;
    //     private static ChangeTime = 900;
    //     constructor(isLeft: boolean, shotDel: Laya.Handler) {
    //         super();
    //         this.ShotDel = shotDel;
    //         this.skin = "Game1/zhu_c.png"
    //         this.skewY = isLeft == true ? 180 : 0;
    //         this.IsLeft = isLeft;
    //         if (!this.MoneyImage) {
    //             this.MoneyImage = new Laya.Image();
    //             this.addChild(this.MoneyImage);
    //         }
    //     }
    //     public Init(moneyType: number, y: number, isup: boolean) {
    //         Laya.Tween.clearAll(this);
    //         this.MoneyImage.skin = moneyType == 1 ? "time1.png" : "time2.png";
    //         this.MoneyImage.pos(-450, 100);
    //         this.x = this.IsLeft == true ? Laya.stage.width / 2 - 200 : Laya.stage.width / 2 + 200;
    //         this.y = y;
    //         Laya.timer.clearAll(this);
    //         Laya.timer.frameLoop(1, this, this.OnLoop);
    //         Laya.timer.loop(Game9Player.ChangeTime, this, this.ChangeDirection);
    //     }
    //     OnLoop(): void {
    //         if (this.IsUp == true) {
    //             if (this.y < Game9Player.minY) {
    //                 this.IsUp = false;
    //                 return;
    //             }
    //             this.y -= Game9Player.speedY;
    //         }
    //         else {
    //             if (this.y > Game9Player.maxY) {
    //                 this.IsUp = true;
    //                 return;
    //             }
    //             this.y += Game9Player.speedY;
    //         }
    //     }
    //     ChangeDirection(): void {
    //         var random = Math.random();
    //         if (random < Game9Player.ChangeFactor) {
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
}