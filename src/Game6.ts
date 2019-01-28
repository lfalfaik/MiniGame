/*
* name;
*/
module view {
    enum Direction {
        Up = 1,
        Down = 2,
        Left = 3,
        Right = 4,
    }
    export class Game6 extends ui.Game6UI {
        private IsGameOver: boolean = false;
        private PhaseData: Array<ModelPhaseData>;
        private CurPhaseIndex: number;
        private CurPhaseData: ModelPhaseData;
        private NextPhasePoint: number;
        private ArmyBgOffset: number = 40;
        private HitHandler: Laya.Handler;
        private PlayerPoint: number = 0;
        private ModelData: ModelData;
        private IsPlayerActioning: boolean = false;
        private PlayerMoveAnim: Laya.Animation;
        private ReviveTimes: number = 0;
        constructor() {
            super();
            this.ModelData = ModelManager.Instance.GetDataById(6);
            if (this.ModelData != null)
                this.PhaseData = ClientTools.GetGamePhaseDatas(this.ModelData.phase);
            this.HitHandler = Laya.Handler.create(this, this.PlayerBeHited, null, false);
            this.PlayerMoveAnim = new Laya.Animation;
            if (this.player != null) {
                this.player.addChild(this.PlayerMoveAnim);
                this.PlayerMoveAnim.scale(4, 4);
            }
            this.PlayerMoveAnim.on(Laya.Event.COMPLETE, this, function () { this.PlayerMoveAnim.visible = false; });
        }
        public onShow(): void {
            this.player.skin = PlayerManager.Instance.GetUsedSkinUrl();
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickRetryBtn);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        }
        Show(): void {
            this.keyUp.on(Laya.Event.CLICK, this, this.PlayHitAction, [Direction.Up]);
            this.keyDown.on(Laya.Event.CLICK, this, this.PlayHitAction, [Direction.Down]);
            this.keyRight.on(Laya.Event.CLICK, this, this.PlayHitAction, [Direction.Right]);
            this.keyLeft.on(Laya.Event.CLICK, this, this.PlayHitAction, [Direction.Left]);
            this.ResetGame();
        }
        // 关闭界面
        onClosed(): void {
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_START, this, this.Show);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_TRYPLAY, this, this.OnClickRetryBtn);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_CONTINUE, this, this.OnGameContinue);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_OVER, this, this.OnClickCloseBtn);
        }
        OnGameContinue(): void {
            if (this.ReviveTimes >= 1) return;
            this.ReviveTimes++;
            Laya.timer.clearAll(this);
            this.IsGameOver = false;
            Laya.timer.loop(this.CurPhaseData.Time, this, this.CreateArmy);
        }
        ResetGame(): void {
            Laya.timer.clearAll(this);
            this.ReviveTimes = 0;
            this.CurPhaseIndex = 0;
            this.CurPhaseData = this.PhaseData[this.CurPhaseIndex];
            this.NextPhasePoint = this.PhaseData[this.CurPhaseIndex + 1].Score;
            this.PlayerPoint = 0;
            this.IsGameOver = false;
            Laya.timer.loop(this.CurPhaseData.Time, this, this.CreateArmy);
        }
        PlayHitAction(direction: Direction): void {
            MusicManager.Instance.playSound(StringDefine.SOUND_CLICKBTN);
            if (this.IsPlayerActioning == true) return;
            this.IsPlayerActioning = true;
            switch (direction) {
                case Direction.Up:
                    this.player.skin = "skin/zhu_01.png";
                    Laya.Tween.to(this.player, { y: this.player.y - Game6Army.MoveY }, 25, null, Laya.Handler.create(this, this.RePosPlayer));
                    break;
                case Direction.Down:
                    this.player.skin = "skin/zhu_01.png";
                    Laya.Tween.to(this.player, { y: this.player.y + Game6Army.MoveY }, 25, null, Laya.Handler.create(this, this.RePosPlayer));
                    break;
                case Direction.Left:
                    this.player.skin = "skin/zhu_02.png";
                    Laya.Tween.to(this.player, { x: this.player.x - Game6Army.MoveX }, 25, null, Laya.Handler.create(this, this.RePosPlayer));
                    break;
                case Direction.Right:
                    this.player.skin = "skin/zhu_02.png";
                    this.player.skewY = 180;
                    Laya.Tween.to(this.player, { x: this.player.x + Game6Army.MoveX }, 25, null, Laya.Handler.create(this, this.RePosPlayer));
                    break;
            }
            this.PlayerHit(direction);
        }
        RePosPlayer(): void {
            Laya.Tween.to(this.player, { x: this.midBg.x, y: this.midBg.y - this.ArmyBgOffset }, 25, null, Laya.Handler.create(this, function () {
                this.IsPlayerActioning = false;
                this.player.skewY = 0;
                this.player.skin = "skin/zhu_01.png";
            }));
        }
        PlayerHit(direction: Direction): void {
            this.PlayerMoveAnim.visible = true;
            this.PlayerMoveAnim.play(0, false, "PigBeat");
            switch (direction) {
                case Direction.Up:
                    this.PlayerMoveAnim.rotation = 90;
                    this.PlayerMoveAnim.pos(190, -100);
                    var army: Game6Army;
                    for (var i: number = this.armyBox.numChildren - 1; i >= 0; i--) {
                        army = this.armyBox.getChildAt(i) as Game6Army;
                        if (army.Direction == Direction.Up && army.y >= Laya.stage.height / 2 - Game6Army.MoveY - this.ArmyBgOffset) {
                            this.PlayerPoint += army.Point;
                            ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.PlayerPoint);// 抛出消息：最新分数
                            army.Remove();
                        }
                    }
                    break;
                case Direction.Down:
                    this.PlayerMoveAnim.rotation = -90;
                    this.PlayerMoveAnim.pos(-60, 200);
                    var army: Game6Army;
                    for (var i: number = this.armyBox.numChildren - 1; i >= 0; i--) {
                        army = this.armyBox.getChildAt(i) as Game6Army;
                        if (army.Direction == Direction.Down && army.y <= Laya.stage.height / 2 + Game6Army.MoveY + this.ArmyBgOffset) {
                            this.PlayerPoint += army.Point;
                            ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.PlayerPoint);// 抛出消息：最新分数
                            army.Remove();
                        }
                    }
                    break;
                case Direction.Left:
                    this.PlayerMoveAnim.rotation = 0;
                    this.PlayerMoveAnim.pos(-60, -70);
                    var army: Game6Army;
                    for (var i: number = this.armyBox.numChildren - 1; i >= 0; i--) {
                        army = this.armyBox.getChildAt(i) as Game6Army;
                        if (army.Direction == Direction.Left && army.x >= Laya.stage.width / 2 - Game6Army.MoveX) {
                            this.PlayerPoint += army.Point;
                            ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.PlayerPoint);// 抛出消息：最新分数
                            army.Remove();
                        }
                    }
                    break;
                case Direction.Right:
                    this.PlayerMoveAnim.rotation = 180;
                    this.PlayerMoveAnim.pos(200, 180);
                    var army: Game6Army;
                    for (var i: number = this.armyBox.numChildren - 1; i >= 0; i--) {
                        army = this.armyBox.getChildAt(i) as Game6Army;
                        if (army.Direction == Direction.Right && army.x <= Laya.stage.width / 2 + Game6Army.MoveX) {
                            this.PlayerPoint += army.Point;
                            ClientEventManager.Instance.Event(ClientEvent.ON_SCORE_UPDATA, this.PlayerPoint);// 抛出消息：最新分数
                            army.Remove();
                        }
                    }
                    break;
            }
            if (this.CurPhaseIndex < this.PhaseData.length - 1) {
                if (this.PlayerPoint >= this.NextPhasePoint) {
                    this.CurPhaseIndex++;
                    this.CurPhaseData = this.PhaseData[this.CurPhaseIndex];
                    if (this.CurPhaseIndex < this.PhaseData.length - 1) {
                        this.NextPhasePoint = this.PhaseData[this.CurPhaseIndex + 1].Score;
                    }
                    Laya.timer.clear(this, this.CreateArmy);
                    Laya.timer.loop(this.CurPhaseData.Time, this, this.CreateArmy);
                }
            }
        }
        CreateArmy(): void {
            var random: number = Math.random();
            var direction: Direction;
            var x: number = 0;
            var y: number = 0;
            var skin: string = "";
            if (random <= 0.25) {
                direction = Direction.Up;
                x = this.topBg.x;
                y = this.topBg.y;
            }
            else if (random <= 0.5) {
                direction = Direction.Down;
                x = this.bottomBg.x;
                y = this.bottomBg.y;
            }
            else if (random <= 0.75) {
                direction = Direction.Left;
                x = this.leftBg.x;
                y = this.leftBg.y;
            }
            else {
                direction = Direction.Right;
                x = this.rightBg.x;
                y = this.rightBg.y;
            }
            var army: Game6Army = new Game6Army("Game1/army_" + direction + ".png");
            this.armyBox.addChild(army);
            army.Init(x, y - this.ArmyBgOffset, direction, this.HitHandler, this.CurPhaseData.Speed, this.ModelData.score);
        }
        PlayerBeHited(): void {
            this.IsGameOver = true;
            Laya.timer.clearAll(this);
            var army: Game6Army;
            for (var i: number = this.armyBox.numChildren - 1; i >= 0; i--) {
                army = this.armyBox.getChildAt(i) as Game6Army;
                army.Remove();
            }
            GameUIManager.Instance.OpenUIResult(this.ReviveTimes);// show结算界面
        }
        OnClickRetryBtn(): void {
            if (this.IsGameOver == false) return;
            this.ResetGame();
        }
        OnClickCloseBtn(): void {
            if (this.IsGameOver == false) return;
            Laya.timer.clearAll(this);
            GameUIManager.Instance.removeUI(this, true, true);
        }
    }
    class Game6Army extends Laya.Image {
        private Del: Laya.Handler;
        public Direction: Direction;
        public Point: number;
        public static MoveX: number = 105;
        public static MoveY: number = 110;
        public Init(x: number, y: number, direction: Direction, del: Laya.Handler, speed: number, point: number): void {
            this.Del = del;
            this.Direction = direction;
            this.Point = point;
            this.size(100, 100);
            this.pivot(this.width / 2, this.height / 2);
            this.pos(x, y);
            Laya.timer.loop(speed, this, this.MoveNext);
        }
        MoveNext(): void {
            if (this.Direction == Direction.Up) {
                if (this.y + Game6Army.MoveY >= Laya.stage.height / 2) {
                    this.OnHit();
                    return;
                }
                this.y += Game6Army.MoveY;
            }
            else if (this.Direction == Direction.Down) {
                if (this.y - Game6Army.MoveY <= Laya.stage.height / 2) {
                    this.OnHit();
                    return;
                }
                this.y -= Game6Army.MoveY;
            }
            else if (this.Direction == Direction.Left) {
                if (this.x + Game6Army.MoveX >= Laya.stage.width / 2) {
                    this.OnHit();
                    return;
                }
                this.x += Game6Army.MoveX;
            }
            else {
                if (this.x - Game6Army.MoveX <= Laya.stage.width / 2) {
                    this.OnHit();
                    return;
                }
                this.x -= Game6Army.MoveX;
            }
        }
        OnHit(): void {
            this.Del.runWith(this);
            Laya.timer.clearAll(this);
        }
        public Remove(): void {
            Laya.timer.clearAll(this);
            this.removeSelf();
        }
    }
}