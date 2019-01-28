/**
 * 移动区相关处理
 */
const roadWidth: number = 720;
const roadHeight: number = 84;
enum SKIES { SK1 = 1, SK2 = 2, SK3 };
class DynMoveManager {
    private sk1Width: number = 278;
    private sk1Height: number = 75;

    private sk2Width: number = 367;
    private sk2Height: number = 145;

    private sk3Width: number = 424;
    private sk3Height: number = 147;

    private road_URL: string = "Game7/d.png";
    private skies1_URL: string = "Game7/y01.png";
    private skies2_URL: string = "Game7/y02.png";
    private skies3_URL: string = "Game7/y03.png";

    private spr: Laya.Sprite;
    constructor(spr: Laya.Sprite) {
        this.spr = spr;
        this.init();
    }
    private init() {
        this.initRoad();
        this.beginExecute();
    }
    private initRoad(): void {
        if (this.spr.numChildren > 1) return;

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
    }
    private createSkies(type: SKIES) {
        var skiObj = Laya.Pool.getItemByClass("skies", Laya.Sprite);
        var rdX: number;
        if (type == SKIES.SK1) {
            rdX = Math.random() * this.sk1Width * 1.2;
            skiObj.loadImage(this.skies1_URL);
        } else if (type == SKIES.SK2) {
            rdX = Math.random() * this.sk2Width * 1.5;
            skiObj.loadImage(this.skies2_URL);
        } else if (type == SKIES.SK3) {
            rdX = Math.random() * this.sk3Width * 1.6;
            skiObj.loadImage(this.skies3_URL);
        }
        skiObj.name = "sk_" + type;
        skiObj.x = ValueConfig.screenDefaultWitdh + rdX;
        skiObj.y = Math.random() * (ValueConfig.screenDefaultHeight / 2);
        this.spr.addChild(skiObj);
    }
    private onLoop() {
        for (var i = 0; i < this.spr.numChildren; i++) {
            var moveObj: Laya.Sprite = this.spr.getChildAt(i) as Laya.Sprite;
            var speedX = view.Game7.playerSpeed;
            var isNeedRm = true;
            if (moveObj.name == "sk_" + SKIES.SK1) {
                speedX = 1.5;
            } else if (moveObj.name == "sk_" + SKIES.SK2) {
                speedX = 1.3;
            } else if (moveObj.name == "sk_" + SKIES.SK3) {
                speedX = 1.2;
            } else if (moveObj.name.indexOf("road") != -1) {
                isNeedRm = false;
            } else {
                continue;
            }
            if (moveObj.x + moveObj.width <= 0) {
                if (isNeedRm) {
                    moveObj.removeSelf();
                    moveObj.graphics.clear();
                    Laya.Pool.recover("skies", moveObj);
                } else {
                    var serachName = moveObj.name == "road1"?"road2":"road1";
                    var roadObj:Laya.Sprite = this.spr.getChildByName(serachName) as Laya.Sprite;
                    moveObj.x = roadObj.x + ValueConfig.screenDefaultWitdh;
                }
            }
            moveObj.x -= speedX;
        }
        if (Laya.timer.currFrame * view.Game7.playerSpeed % 60 == 0) {
            this.checkRandomSkies();
        }
    }
    private beginExecute(): void {
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    private checkRandomSkies() {
        var rdCount = 2 - (this.spr.numChildren - 2);
        for (var i = 0; i < rdCount; i++) {
            var rdNum: number = Math.random();
            var type: SKIES = rdNum > 0.8 ? SKIES.SK3 : (rdNum > 0.6 ? SKIES.SK2 : SKIES.SK1);
            this.createSkies(type);
        }
    }
    public clearTask() {
        Laya.timer.clear(this, this.onLoop);
    }
}