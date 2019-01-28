/**
 * 移动区相关处理
 */
var roadWidth = 720;
var roadHeight = 84;
var SKIES;
(function (SKIES) {
    SKIES[SKIES["SK1"] = 1] = "SK1";
    SKIES[SKIES["SK2"] = 2] = "SK2";
    SKIES[SKIES["SK3"] = 3] = "SK3";
})(SKIES || (SKIES = {}));
;
var DynMoveManager = /** @class */ (function () {
    function DynMoveManager(spr) {
        this.sk1Width = 278;
        this.sk1Height = 75;
        this.sk2Width = 367;
        this.sk2Height = 145;
        this.sk3Width = 424;
        this.sk3Height = 147;
        this.road_URL = "Game7/d.png";
        this.skies1_URL = "Game7/y01.png";
        this.skies2_URL = "Game7/y02.png";
        this.skies3_URL = "Game7/y03.png";
        this.spr = spr;
        this.init();
    }
    DynMoveManager.prototype.init = function () {
        this.initRoad();
        this.beginExecute();
    };
    DynMoveManager.prototype.initRoad = function () {
        if (this.spr.numChildren > 1)
            return;
        var road1 = new Laya.Sprite();
        var road2 = new Laya.Sprite();
        road1.name = "road1";
        road2.name = "road2";
        road1.loadImage(this.road_URL);
        road2.loadImage(this.road_URL);
        road1.y = ValueConfig.screenDefaultHeight - roadHeight;
        road2.x = roadWidth;
        road2.y = road1.y;
        this.spr.addChild(road1);
        this.spr.addChild(road2);
    };
    DynMoveManager.prototype.createSkies = function (type) {
        var skiObj = Laya.Pool.getItemByClass("skies", Laya.Sprite);
        var rdX;
        if (type == SKIES.SK1) {
            rdX = Math.random() * this.sk1Width * 1.2;
            skiObj.loadImage(this.skies1_URL);
        }
        else if (type == SKIES.SK2) {
            rdX = Math.random() * this.sk2Width * 1.5;
            skiObj.loadImage(this.skies2_URL);
        }
        else if (type == SKIES.SK3) {
            rdX = Math.random() * this.sk3Width * 1.6;
            skiObj.loadImage(this.skies3_URL);
        }
        skiObj.name = "sk_" + type;
        skiObj.x = ValueConfig.screenDefaultWitdh + rdX;
        skiObj.y = Math.random() * (ValueConfig.screenDefaultHeight / 2);
        this.spr.addChild(skiObj);
    };
    DynMoveManager.prototype.onLoop = function () {
        for (var i = 0; i < this.spr.numChildren; i++) {
            var moveObj = this.spr.getChildAt(i);
            var speedX = view.Game7.playerSpeed;
            var isNeedRm = true;
            if (moveObj.name == "sk_" + SKIES.SK1) {
                speedX = 1.5;
            }
            else if (moveObj.name == "sk_" + SKIES.SK2) {
                speedX = 1.3;
            }
            else if (moveObj.name == "sk_" + SKIES.SK3) {
                speedX = 1.2;
            }
            else if (moveObj.name.indexOf("road") != -1) {
                isNeedRm = false;
            }
            else {
                continue;
            }
            if (moveObj.x + moveObj.width <= 0) {
                if (isNeedRm) {
                    moveObj.removeSelf();
                    moveObj.graphics.clear();
                    Laya.Pool.recover("skies", moveObj);
                }
                else {
                    var serachName = moveObj.name == "road1" ? "road2" : "road1";
                    var roadObj = this.spr.getChildByName(serachName);
                    moveObj.x = roadObj.x + ValueConfig.screenDefaultWitdh;
                }
            }
            moveObj.x -= speedX;
        }
        if (Laya.timer.currFrame * view.Game7.playerSpeed % 60 == 0) {
            this.checkRandomSkies();
        }
    };
    DynMoveManager.prototype.beginExecute = function () {
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    DynMoveManager.prototype.checkRandomSkies = function () {
        var rdCount = 2 - (this.spr.numChildren - 2);
        for (var i = 0; i < rdCount; i++) {
            var rdNum = Math.random();
            var type = rdNum > 0.8 ? SKIES.SK3 : (rdNum > 0.6 ? SKIES.SK2 : SKIES.SK1);
            this.createSkies(type);
        }
    };
    DynMoveManager.prototype.clearTask = function () {
        Laya.timer.clear(this, this.onLoop);
    };
    return DynMoveManager;
}());
//# sourceMappingURL=DynMoveManager.js.map