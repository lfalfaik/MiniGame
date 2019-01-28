/*
* name;
*/
module view {
    export class Game3 extends ui.Game3UI {
        private PosArr: Array<Vector2> = new Array<Vector2>();
        private CurPosIndex: number = 0;
        private HitHandle: Laya.Handler;
        private IsGameOver: boolean;
        private PlayerPoint: number = 0;
        private NextMoneyTime = 0;

        private ModelData: ModelData;
        private PhaseData: Array<ModelPhaseData>;
        private CurPhaseIndex: number;
        private CurPhaseData: ModelPhaseData;
        private NextPhasePoint: number;
        private ReviveTimes: number = 0;
        constructor() {
            super();
            this.PosArr.push(new Vector2(170, 1070), new Vector2(367, 1070), new Vector2(545, 1070));
            var info: ModelInfo = ModelManager.Instance.GetInfoById(3);
            this.ModelData = ModelManager.Instance.GetDataById(info._id);
            if (this.ModelData != null)
                this.PhaseData = ClientTools.GetGamePhaseDatas(this.ModelData.phase);
            if (this.player1 != null) {
                this.player1.skin = PlayerManager.Instance.GetUsedSkinUrl();
            }
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

        public Show(): void {
            this.contentSpr.on(Laya.Event.MOUSE_UP, this, this.OnChangePos);
            this.InitGameData();
            this.HitHandle = Laya.Handler.create(this, this.OnHit, null, false);
        }
        InitGameData(): void {
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
        }
        OnChangePos(): void {
            MusicManager.Instance.playSound(StringDefine.SOUND_CLICKBTN);
            this.CurPosIndex = this.CurPosIndex >= 2 ? 0 : this.CurPosIndex + 1;
            Laya.Tween.to(this.player1, { x: this.PosArr[this.CurPosIndex].x }, 50);
        }
        // 重玩一次
        OnClickReTryBtn(): void {
            if (this.IsGameOver == false) return;
            this.IsGameOver = false;
            this.InitGameData();
        }
        // 继续游戏
        OnGameContinue() {
            if (this.ReviveTimes >= 1) return;
            Laya.timer.clearAll(this);
            this.ReviveTimes++;
            this.IsGameOver = false;
            Laya.timer.loop(100, this, this.CreateMoney);
        }
        // 返回主页
        OnClickCloseBtn(): void {
            if (this.IsGameOver == false) return;
            Laya.timer.clearAll(this);
            GameUIManager.Instance.removeUI(this, true, true);
        }
        OnHit(money: Game3Money): void {
            if (money.PosIndex == this.CurPosIndex && money.Type == 1) {
                this.PlayerPoint += this.ModelData.score;
                ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.PlayerPoint);// 抛出消息：最新分数
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
                for (var i: number = this.numChildren - 1; i >= 0; i--) {
                    var item: Laya.Node = this.getChildAt(i) as Laya.Node;
                    if (item.name == "money") {
                        Laya.timer.clearAll(item);
                        item.removeSelf();
                    }
                }
                this.pointLbl.text = "游戏结束！得分：" + this.PlayerPoint;
                GameUIManager.Instance.OpenUIResult(this.ReviveTimes);// show结算界面
                this.IsGameOver = true;
            }
        }
        CreateMoney(): void {
            if (this.NextMoneyTime < this.CurPhaseData.Time) {
                this.NextMoneyTime += 100;
                return;
            }
            this.NextMoneyTime = 0;
            var money: Game3Money = new Game3Money();
            this.addChild(money);
            var random: number = Math.random();
            var posIndex: number;
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
        }
    }
    class Game3Money extends Laya.Sprite {
        public PosIndex: number;
        private HitDel: Laya.Handler;
        private Speed: number;
        public Type: number;
        constructor() {
            super();
        }
        public Init(type: number, posIndex: number, hitDel: Laya.Handler, speed: number): void {
            this.Type = type;
            this.PosIndex = posIndex;
            this.HitDel = hitDel;
            this.Speed = speed;
            this.name = "money";
            var icon: string = type == 1 ? "Game1/hongbao.png" : "Game1/z.png";
            this.loadImage(icon, 0, 0, 227, 325);
            this.pivotX = this.width / 2;
            this.pivotY = this.height;
            this.scale(0.5, 0.5);
            Laya.timer.frameLoop(1, this, this.Move);
        }
        Move(): void {
            if (this.y >= 1047) {
                if (this.HitDel != null) {
                    this.HitDel.runWith(this);
                }
                Laya.timer.clearAll(this);
                this.removeSelf();
            }
            this.y += this.Speed;
        }
    }
}