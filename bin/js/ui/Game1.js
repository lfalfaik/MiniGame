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
var Game1 = /** @class */ (function (_super) {
    __extends(Game1, _super);
    function Game1() {
        var _this = _super.call(this) || this;
        _this.Player1Pos = [175, 1150];
        _this.Player2Pos = [425, 1150];
        _this.IsReverse = false;
        _this.Money1Pos = [215, 0];
        _this.Money2Pos = [475, 0];
        return _this;
    }
    Game1.prototype.Show = function () {
        Laya.stage.on(Laya.Event.CLICK, this, this.OnChangePos);
        this.IsReverse = false;
        this.player1.pos(this.Player1Pos[0], this.Player1Pos[1]);
        this.player2.pos(this.Player2Pos[0], this.Player2Pos[1]);
        Laya.timer.loop(1000, this, this.CreateMoney);
    };
    Game1.prototype.OnChangePos = function () {
        this.IsReverse = !this.IsReverse;
        if (this.IsReverse) {
            this.player1.pos(this.Player2Pos[0], this.Player2Pos[1]);
            this.player2.pos(this.Player1Pos[0], this.Player1Pos[1]);
        }
        else {
            this.player1.pos(this.Player1Pos[0], this.Player1Pos[1]);
            this.player2.pos(this.Player2Pos[0], this.Player2Pos[1]);
        }
    };
    Game1.prototype.CreateMoney = function () {
        var money1 = new Game1Money();
        Laya.stage.addChild(money1);
        money1.pos(this.Money1Pos[0], this.Money1Pos[1]);
        money1.Init(1);
        var money2 = new Game1Money();
        Laya.stage.addChild(money2);
        money2.pos(this.Money2Pos[0], this.Money2Pos[1]);
        money2.Init(2);
    };
    return Game1;
}(ui.Game1UI));
var Game1Money = /** @class */ (function (_super) {
    __extends(Game1Money, _super);
    function Game1Money() {
        return _super.call(this) || this;
    }
    Game1Money.prototype.Init = function (type) {
        this.loadImage("time" + type + ".png");
        this.rotation = 90;
        this.frameLoop(1, this, this.Move);
    };
    Game1Money.prototype.Move = function () {
        this.y += 10;
    };
    return Game1Money;
}(Laya.Sprite));
//# sourceMappingURL=Game1.js.map