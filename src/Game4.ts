/*
* name;
*/
module view {
    export class Game4 extends ui.Game4UI {
        private ScaleArr: Array<number> = [1, 2, 3];
        private MoneyPos: Array<number> = [1070, 960, 850]
        private CurScaleIndex: number = 0;
        private HitHandler: Laya.Handler;
        private PlayerPoint: number = 0;
        private IsGameOver: boolean = false;
        private PhaseData: Array<ModelPhaseData>;
        private CurPhaseIndex: number;
        private CurPhaseData: ModelPhaseData;
        private NextPhasePoint: number;
        private ModelData: ModelData;
        private ReviveTimes: number = 0;
        constructor() {
            super();
            var info: ModelInfo = ModelManager.Instance.GetInfoById(3);
            this.ModelData = ModelManager.Instance.GetDataById(info._id);
            if (this.ModelData != null)
                this.PhaseData = ClientTools.GetGamePhaseDatas(this.ModelData.phase);
            if (this.player != null) {
                this.player.skin = PlayerManager.Instance.GetUsedSkinUrl();
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
            this.contentSpr.on(Laya.Event.CLICK, this, this.ChangeScale);
            this.HitHandler = Laya.Handler.create(this, this.OnHit, null, false);
            this.InitGameData();
            this.CreateMoney();
        }
        // 返回主页
        OnClickCloseBtn(): void {
            if (this.IsGameOver == false) return;
            Laya.timer.clearAll(this);
            GameUIManager.Instance.removeUI(this, true, true);
        }
        // 重玩
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
            this.CurPhaseIndex = 0;
            this.CurPhaseData = this.PhaseData[this.CurPhaseIndex];
            this.NextPhasePoint = this.PhaseData[this.CurPhaseIndex + 1].Score;
            this.IsGameOver = false;
            this.CurScaleIndex = this.RandomPos()
            this.PlayerPoint = 0;
            this.pointLbl.text = "得分：" + this.PlayerPoint;
            this.player.y = this.MoneyPos[this.CurScaleIndex]
            this.column.scaleY = this.ScaleArr[this.CurScaleIndex];
        }
        RandomPos(): number {
            var random: number = Math.random();
            if (random <= 0.33) {
                return 0;
            }
            else if (random <= 0.66) return 1;
            else return 2;
        }
        ChangeScale(): void {
            MusicManager.Instance.playSound(StringDefine.SOUND_CLICKBTN);
            this.CurScaleIndex = this.CurScaleIndex >= 2 ? 0 : this.CurScaleIndex + 1;
            Laya.Tween.to(this.player, { y: this.MoneyPos[this.CurScaleIndex] }, 50);
            Laya.Tween.to(this.column, { scaleY: this.ScaleArr[this.CurScaleIndex] }, 50);
        }
        OnHit(money: Game4Money): void {
            if (money.PosIndex == this.CurScaleIndex) {
                this.PlayerPoint += this.ModelData.score;
                this.pointLbl.text = "得分:" + this.PlayerPoint;
                ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.PlayerPoint);// 抛出消息：最新分数
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
                GameUIManager.Instance.OpenUIResult(this.ReviveTimes);// show结算界面
                Laya.timer.clearAll(this);
            }
        }
        CreateMoney(): void {
            var posIndex: number = this.RandomPos();
            var LeftOrRight: boolean = Math.random() > 0.5 ? true : false;
            var money: Game4Money = new Game4Money();
            this.addChild(money);
            money.Init(this.MoneyPos[posIndex] + 50, LeftOrRight, posIndex, this.HitHandler, this.CurPhaseData.Speed / 60);
        }
    }
    class Game4Money extends Laya.Image {
        private LeftOrRight: boolean;
        public PosIndex: number;
        private HitDel: Laya.Handler;
        private Speed: number;
        constructor() {
            super();
            this.name = "money";
        }
        public Init(y: number, leftOrRight: boolean, posIndex: number, hitDel: Laya.Handler, speed: number): void {
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
        }
        OnLoop(): void {
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
        }
    }
}