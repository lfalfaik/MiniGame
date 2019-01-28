/*
* name;
*/
module view {
    export class Game1 extends ui.Game1UI {
        private Pos1: Array<number> = [215, 1070];
        private Pos2: Array<number> = [500, 1070];
        private IsPlayerReverse: boolean = false;
        private MoneyPos1: Array<number> = [215, -400];
        private MoneyPos2: Array<number> = [500, -400];
        private HitHandle: Laya.Handler;
        private Point: number = 0;
        private IsGameOver: boolean = false;
        private NextMoneyTime: number = 0;
        private PlayerMoveAnim: Laya.Animation;
        private ModelData: ModelData;
        private PhaseData: Array<ModelPhaseData>;
        private CurPhaseIndex: number;
        private CurPhaseData: ModelPhaseData;
        private NextPhasePoint: number;
        //复活继续游戏次数
        private ReviveTimes: number = 0;
        constructor() {
            super();
            this.PlayerMoveAnim = new Laya.Animation;
            if (this.player1 != null) {
                this.player1.addChild(this.PlayerMoveAnim);
                this.PlayerMoveAnim.scale(4, 4);
            }
            this.PlayerMoveAnim.on(Laya.Event.COMPLETE, this, function () { this.PlayerMoveAnim.visible = false; });
            var info: ModelInfo = ModelManager.Instance.GetInfoById(1);
            this.ModelData = ModelManager.Instance.GetDataById(info._id);
            if (this.ModelData != null)
                this.PhaseData = ClientTools.GetGamePhaseDatas(this.ModelData.phase);
            UITools.SetActive(this.pointLbl, false);
        }
        // 打开界面
        onShow() {
            this.player1.skin = PlayerManager.Instance.GetUsedSkinUrl();
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
        }
        OnChangePos(): void {
            MusicManager.Instance.playSound(StringDefine.SOUND_CLICKBTN);
            if (this.IsGameOver) return;
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
        }
        private OnHit(money: Game1Money): void {
            var lx = this.player1.x - 50; var ly = this.player1.y;
            var rx = this.player1.x + 50; var ry = this.player1.y;
            var tx = this.player1.x - 50; var ty = this.player1.y + 100;
            var bx = this.player1.x + 50; var by = this.player1.y + 100;
            if (money.hitTestPoint(lx, ly) || money.hitTestPoint(rx, ry) || money.hitTestPoint(tx, ty) || money.hitTestPoint(bx, by)) {
                if (money.Type == 1) {
                    this.Point += this.ModelData.score;
                    ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.Point);// 抛出消息：最新分数
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
        }
        GameOver(): void {
            Laya.timer.clearAll(this);
            for (var i: number = this.numChildren - 1; i >= 0; i--) {
                var item: Laya.Node = this.getChildAt(i) as Laya.Node;
                if (item.name == "money") {
                    Laya.timer.clearAll(item);
                    item.removeSelf();
                }
            }
            this.pointLbl.text = "游戏结束！得分：" + this.Point;
            GameUIManager.Instance.OpenUIResult(this.ReviveTimes);// show结算界面
            this.IsGameOver = true;
        }
        CreateMoney(): void {
            if (this.NextMoneyTime < this.CurPhaseData.Time) {
                this.NextMoneyTime += 100;
                return;
            }
            this.NextMoneyTime = 0;
            var money1: Game1Money = new Game1Money();
            this.addChild(money1);
            var IsMoneyReverse: boolean = Math.random() > 0.5 ? true : false;
            if (IsMoneyReverse) {
                money1.pos(this.MoneyPos2[0], this.MoneyPos2[1]);
            }
            else {
                money1.pos(this.MoneyPos1[0], this.MoneyPos1[1]);
            }
            money1.Init(Math.random() > 0.3 ? 1 : 2, IsMoneyReverse, this.HitHandle, this.CurPhaseData.Speed / 60);
        }
        // 重新玩一次
        OnClickReTryBtn(): void {
            if (this.IsGameOver == false) return;
            this.IsGameOver = false;
            this.InitGameData();
        }
        // 返回首页
        OnClickCloseBtn(): void {
            if (this.IsGameOver == false) return;
            Laya.timer.clearAll(this);
            GameUIManager.Instance.removeUI(this, true, true);
        }
        // 继续游戏
        OnGameContinue() {
            if (this.ReviveTimes >= 1) return;
            Laya.timer.clearAll(this);
            this.ReviveTimes++;
            this.NextMoneyTime = this.CurPhaseData.Time;
            this.IsGameOver = false;
            Laya.timer.loop(100, this, this.CreateMoney);
        }
    }
}
class Game1Money extends Laya.Sprite {
    public Type: number;
    public Isreverse: boolean;
    private HitDel: Laya.Handler;
    private Speed: number;
    constructor() {
        super();
    }
    public Init(type: number, isReverse: boolean, hitDel: Laya.Handler, speed: number): void {
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
    }
    Move(): void {
        if (this.y >= 1047) {
            if (this.HitDel != null) {
                this.HitDel.runWith(this);
            }
        }
        this.y += this.Speed;
    }
    public Remove(): void {
        Laya.timer.clearAll(this);
        this.removeSelf();
    }
}