var hinder1_Width = 116;
var hinder1_Height = 470;
var initGapHeight = 320;
var HinderManager = /** @class */ (function () {
    function HinderManager(spr) {
        this.hinder1_URL = "Game7/t1.png";
        this.moveApart = 0;
        this.spr = spr;
        this.init();
    }
    HinderManager.prototype.getSpr = function () {
        return this.spr;
    };
    HinderManager.prototype.init = function () {
        this.beginExecute();
    };
    HinderManager.prototype.createDuadHinder = function () {
        var topObj = Laya.Pool.getItemByClass("hinderTop", Hinder);
        topObj.name = "hinderTop";
        var bottomObj = Laya.Pool.getItemByClass("hinderBottom", Hinder);
        bottomObj.name = "hinderBottom";
        var isDynamic = HinderManager.dynamicChance > 0 ? (Math.random() < HinderManager.dynamicChance ? true : false) : false;
        var group = Laya.Pool.getItemByClass("hinderGroup", HinderGroup);
        group.name = "hinderGroup";
        group.init(isDynamic);
        var rdHeight = Math.random() * ValueConfig.screenDefaultHeight / 2 + 60;
        topObj.width = hinder1_Width;
        topObj.height = rdHeight;
        topObj.skin = this.hinder1_URL;
        topObj.sizeGrid = "60,0,20,0,0";
        topObj.pivot(hinder1_Width, rdHeight);
        topObj.rotation = 180;
        topObj.x = ValueConfig.screenDefaultWitdh + hinder1_Width;
        topObj.y = 0;
        group.addChild(topObj);
        var botHeight = (ValueConfig.screenDefaultHeight - rdHeight - roadHeight - HinderManager.gapHeight);
        bottomObj.width = hinder1_Width;
        bottomObj.height = botHeight;
        bottomObj.skin = this.hinder1_URL;
        bottomObj.sizeGrid = "60,0,20,0,0";
        bottomObj.x = topObj.x;
        bottomObj.y = rdHeight + HinderManager.gapHeight;
        group.addChild(bottomObj);
        this.spr.addChild(group);
    };
    HinderManager.prototype.beginExecute = function () {
        Laya.timer.frameLoop(1, this, this.onLoop);
    };
    HinderManager.prototype.hinderVertical = function (hinGroup) {
        if (hinGroup.isDynamic) {
            var vVal = 1;
            var hinTop = hinGroup.getChildByName("hinderTop");
            var hinBottom = hinGroup.getChildByName("hinderBottom");
            if (!hinGroup.isUp) {
                if (hinBottom.height - vVal >= hinGroup.leastHeight) {
                    hinTop.height += vVal;
                    hinTop.y += vVal;
                    hinBottom.height -= vVal;
                    hinBottom.y += vVal;
                }
                else {
                    hinGroup.isUp = true;
                }
            }
            else {
                if (hinTop.height - vVal >= hinGroup.leastHeight) {
                    hinTop.height -= vVal;
                    hinTop.y -= vVal;
                    hinBottom.height += vVal;
                    hinBottom.y -= vVal;
                }
                else {
                    hinGroup.isUp = false;
                }
            }
        }
    };
    HinderManager.prototype.onLoop = function () {
        for (var i = 0; i < this.spr.numChildren; i++) {
            var hinderGroup = this.spr.getChildAt(i);
            if (hinderGroup.name == "hinderGroup") {
                for (var j = 0; j < hinderGroup.numChildren; j++) {
                    var hinObj = hinderGroup.getChildAt(j);
                    hinObj.x -= view.Game7.playerSpeed;
                    if (hinObj.x + hinObj.width < -ValueConfig.screenDefaultWitdh) {
                        hinObj.removeSelf();
                        hinObj.graphics.clear();
                        Laya.Pool.recover(hinObj.name, hinObj);
                    }
                }
                if (hinderGroup.numChildren == 0) {
                    hinderGroup.removeSelf();
                    Laya.Pool.recover(hinderGroup.name, hinderGroup);
                }
                else if (hinderGroup.numChildren == 2) {
                    this.hinderVertical(hinderGroup);
                }
            }
        }
        if ((this.moveApart += view.Game7.playerSpeed) > 500) {
            this.moveApart = 0;
            this.createDuadHinder();
        }
    };
    HinderManager.prototype.clearTask = function () {
        Laya.timer.clear(this, this.onLoop);
    };
    HinderManager.gapHeight = initGapHeight;
    HinderManager.dynamicChance = 0; //动态概率
    return HinderManager;
}());
//# sourceMappingURL=HinderManager.js.map