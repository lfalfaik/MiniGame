const hinder1_Width: number = 116;
const hinder1_Height: number = 470;
const initGapHeight: number = 320;
class HinderManager {

    private hinder1_URL: string = "Game7/t1.png";
    private spr: Laya.Sprite;
    private moveApart: number = 0;
    static gapHeight: number = initGapHeight;
    static dynamicChance:number = 0;//动态概率
    public getSpr(): Laya.Sprite {
        return this.spr;
    }
    constructor(spr: Laya.Sprite) {
        this.spr = spr;
        this.init();
    }
    private init() {
        this.beginExecute();
    }
    private createDuadHinder() {
        var topObj: Hinder = Laya.Pool.getItemByClass("hinderTop", Hinder);
        topObj.name = "hinderTop";
        var bottomObj: Hinder = Laya.Pool.getItemByClass("hinderBottom", Hinder);
        bottomObj.name = "hinderBottom";

        var isDynamic:boolean = HinderManager.dynamicChance>0?(Math.random()<HinderManager.dynamicChance?true:false):false;

        var group:HinderGroup = Laya.Pool.getItemByClass("hinderGroup", HinderGroup);
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

        var botHeight: number = (ValueConfig.screenDefaultHeight - rdHeight - roadHeight - HinderManager.gapHeight);
        bottomObj.width = hinder1_Width;
        bottomObj.height = botHeight;
        bottomObj.skin = this.hinder1_URL;
        bottomObj.sizeGrid = "60,0,20,0,0";
        bottomObj.x = topObj.x;
        bottomObj.y = rdHeight + HinderManager.gapHeight;
        group.addChild(bottomObj);
        this.spr.addChild(group);
    }
    private beginExecute(): void {
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    private hinderVertical(hinGroup:HinderGroup):void{
        if (hinGroup.isDynamic) {
            var vVal: number = 1;
            var hinTop: Hinder = hinGroup.getChildByName("hinderTop") as Hinder;
            var hinBottom: Hinder = hinGroup.getChildByName("hinderBottom") as Hinder;
            if (!hinGroup.isUp) {
                if(hinBottom.height-vVal>=hinGroup.leastHeight){
                    hinTop.height += vVal;
                    hinTop.y += vVal;
                    hinBottom.height -= vVal;
                    hinBottom.y += vVal;
                }else{
                    hinGroup.isUp=true;
                }
            }else{
                if(hinTop.height-vVal>=hinGroup.leastHeight){
                    hinTop.height -= vVal;
                    hinTop.y -= vVal;
                    hinBottom.height += vVal;
                    hinBottom.y -= vVal;
                }else{
                    hinGroup.isUp=false;
                }
            }
        }
    }
    private onLoop() {
        for (var i = 0; i < this.spr.numChildren; i++) {
            var hinderGroup:HinderGroup = this.spr.getChildAt(i) as HinderGroup;
            if(hinderGroup.name=="hinderGroup"){
                for(var j=0;j<hinderGroup.numChildren;j++){
                    var hinObj: Hinder = hinderGroup.getChildAt(j) as Hinder;
                    hinObj.x -= view.Game7.playerSpeed;
                    if (hinObj.x+hinObj.width < -ValueConfig.screenDefaultWitdh) {
                        hinObj.removeSelf();
                        hinObj.graphics.clear();
                        Laya.Pool.recover(hinObj.name, hinObj);
                    }
                }
                if(hinderGroup.numChildren==0){
                    hinderGroup.removeSelf();
                    Laya.Pool.recover(hinderGroup.name, hinderGroup);
                }else if(hinderGroup.numChildren==2){
                    this.hinderVertical(hinderGroup);
                }
            }
        }
        if ((this.moveApart += view.Game7.playerSpeed) > 500) {
            this.moveApart = 0;
            this.createDuadHinder();
        }
    }
    public clearTask() {
        Laya.timer.clear(this, this.onLoop);
    }
}