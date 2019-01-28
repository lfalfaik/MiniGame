/*
* name;
*/
module view {
    export class Game2 extends ui.Game2UI {
        private IsLeftDown: boolean = false;
        private PlayerPos: Array<number> = [974, 863];
        private HitHandler: Laya.Handler;
        private Point: number = 0;
        private IsGameOver: boolean = false;
        private PhaseData: Array<ModelPhaseData>;
        private CurPhaseIndex: number;
        private CurPhaseData: ModelPhaseData;
        private NextPhasePoint: number;
        private ModelData: ModelData;
        private ReviveTimes: number = 0;
        constructor() {
            super();
            var info: ModelInfo = ModelManager.Instance.GetInfoById(2);

            this.ModelData = ModelManager.Instance.GetDataById(info._id);
            if (this.ModelData != null)
                this.PhaseData = ClientTools.GetGamePhaseDatas(this.ModelData.phase);

            if (this.player1 != null) {
                this.player1.skin = PlayerManager.Instance.GetUsedSkinUrl();
            }
            if (this.player2 != null) {
                this.player2.skin = PlayerManager.Instance.GetUsedSkinUrl();
            }
            UITools.SetActive(this.pointLbl, false);
        }
        // 打开界面
        onShow() {
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickRetryBtn);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        }
        // 关闭界面
        onClosed(): void {
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickRetryBtn);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        }

        Show(): void {
            this.contentSpr.on(Laya.Event.CLICK, this, this.ChangeReverse);
            this.HitHandler = Laya.Handler.create(this, this.OnHit, null, false);
            this.InitGameData();
            this.CreateMoney();
        }
        // 返回首页
        OnClickCloseBtn(): void {
            if (this.IsGameOver == false) return;
            Laya.timer.clearAll(this);
            GameUIManager.Instance.removeUI(this, true, true);
        }
        // 重玩一次
        OnClickRetryBtn(): void {
            if (this.IsGameOver == false) return;
            this.InitGameData();
            this.CreateMoney();
        }
        // 继续游戏
        OnGameContinue() {
            if (this.ReviveTimes >= 1) return;
            this.IsGameOver = false;
            this.ReviveTimes++;
            this.CreateMoney();
        }
        InitGameData(): void {
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
        }
        ChangeReverse(): void {
             MusicManager.Instance.playSound(StringDefine.SOUND_CLICKBTN);
            if (this.IsGameOver == true) return;
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
        }
        OnHit(money: Game2Money): void {
            if (money.UpOrDown != this.IsLeftDown) {
                this.Point += this.ModelData.score;
                ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.Point);// 抛出消息：最新分数
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
                for (var i: number = this.numChildren - 1; i >= 0; i--) {
                    var money: Game2Money = this.getChildByName("money") as Game2Money;
                    if (money) {
                        money.Remove();
                    }
                }
                this.CreateMoney();
            }
            else {
                this.IsGameOver = true;
                this.pointLbl.text = "游戏结束！得分：" + this.Point;
                GameUIManager.Instance.OpenUIResult(this.ReviveTimes);// show结算界面
                Laya.timer.clearAll(this);
            }
        }
        CreateMoney(): void {
            var LeftUpOrDown: boolean = Math.random() > 0.5 ? true : false;
            var money1: Game2Money = new Game2Money();
            this.addChild(money1);
            money1.Init(1, LeftUpOrDown, this.HitHandler, this.CurPhaseData.Speed / 60);
            var money2: Game2Money = new Game2Money();
            this.addChild(money2);
            money2.Init(2, !LeftUpOrDown, this.HitHandler, this.CurPhaseData.Speed / 60);
        }
    }
}
class Game2Money extends Laya.Image {
    private LeftOrRight: number;
    public UpOrDown: boolean;
    private HitDel: Laya.Handler;
    private Speed: number;
    constructor() {
        super();
        this.name = "money";
    }
    public Init(leftOrRight: number, upOrDown: boolean, hitDel: Laya.Handler, speed: number): void {
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
    }
    OnLoop(): void {
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
    }
    public Remove(): void {
        Laya.timer.clearAll(this);
        this.removeSelf();
    }
}