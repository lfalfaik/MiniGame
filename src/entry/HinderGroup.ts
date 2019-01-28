class HinderGroup extends Laya.Sprite{
     leastHeight:number = 100;
     isDynamic:boolean;
     isUp:boolean;
     constructor(){
         super();
     }
     init(isDynamic:boolean){
        this.isDynamic = isDynamic;
        this.isUp = Math.random()<=0.5?true:false;
     }
}