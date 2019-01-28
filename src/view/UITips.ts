/*
* name;
*/
module view {
export class UITips extends ui.UITipsUI {

    txt:Laya.Label;
	bg:Laya.Image;
    posX:number;
    posY:number;
    constructor(){
        super();
        this.txt = this.lab;
        this.bg = this.item;
        this.posX = Laya.stage.width * 0.5;
        this.posY = Laya.stage.height *0.5;
    }

    onClosed():void{
        this.txt.text = "";
    }

    public onShow(key:string,delay:number = 1000,color:string)
    {
        var str:string = StringManager.Instance.GetValue(key);
		this.setTips(str, delay, color);
    }

    setTips(str:string,delay:number,color:string):void {
		if(str == null || str == "")
		{
			return;
		}
		Laya.Tween.clearTween(this);
		
		this.txt.text = str;
		this.txt.color = color;
		this.bg.size(this.txt.textField.textWidth + 80, this.txt.textField.textHeight + 40);
		this.pos(this.posX,this.posY);
		this.alpha = 1;
		Laya.Tween.to(this,{y:this.posX - 50},delay,null,Laya.Handler.create(this, this.onclosedthis));
	}

    onclosedthis()
    {
        GameUIManager.Instance.removeUI(this);
    }
}
}