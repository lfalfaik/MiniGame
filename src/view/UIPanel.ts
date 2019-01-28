/*
* name;
*/
module view{
export class UIPanel extends ui.UIPanelUI{
    scaleValue:number;
    constructor(){
        super();
        this.ShowUILoadingStar();
        this.ShowStar();
        UITools.SetActive(this.ui,false);
        UITools.SetActive(this.load,false);
    }

    onClear()
    {
        this.scaleValue = 0;
        UITools.SetActive(this.star,false);
    }
    
    onShow(uiname:UIName = UIName.UIOther)
    {
        this.onClear();
        UITools.SetActive(this.huawen,uiname != UIName.UILoading);
        UITools.SetActive(this.ui,uiname == UIName.UIOther);
        UITools.SetActive(this.load,uiname == UIName.UILoading);
    }

    ShowUILoadingStar()
    {
         // 星星类型1 : UILoading/xing1.png  95,95
        // 星星类型2 : UILoading/xing2.png  97,116
        let list:Array<starData> = new Array<starData>();
        list.push(new starData(1,64,188,0.3,10));// 1
        list.push(new starData(1,323,117,1,12));// 2
        list.push(new starData(1,426,118,0.2,10));// 3
        list.push(new starData(1,600,194,1,20));// 4
        list.push(new starData(1,588,375,0.4,10));// 5
        this.CreatItems(this.load,list);
    }

    ShowStar()
    {
        // 星星类型1 : UILoading/xing1.png  95,95
        // 星星类型2 : UILoading/xing2.png  97,116
        let list:Array<starData> = new Array<starData>();
        list.push(new starData(2,85,886,1,15));// 1
        list.push(new starData(1,112,741,0.8,12));// 2
        list.push(new starData(1,124,481,0.4,20));// 3
        list.push(new starData(1,108,216,0.3,20));// 4
        list.push(new starData(1,84,146,1,15));// 5
        list.push(new starData(1,470,145,0.3,20));// 6
        list.push(new starData(1,638,221,1,15));// 7
        list.push(new starData(1,602,314,0.3,20));// 8
        list.push(new starData(1,633,403,0.4,20));// 9
        list.push(new starData(1,606,457,0.5,20));// 10
        list.push(new starData(1,626,848,1,15));// 11
        list.push(new starData(1,433,967,0.4,20));// 12
        this.CreatItems(this.ui,list);
    }

    CreatItems(parent:Laya.Box,list:Array<starData>)
    {
        if (list != null && list.length >0)
        {
            for(var i:number=0;i < list.length;i++)
            {
                let  temp:starData = list[i];
                if (temp == null)
                    continue;
                var itemP: UIStarItem = new UIStarItem();
                parent.addChild(itemP);
                        
                if (temp._mType ==  1)
                {
                    itemP.Show("UILoading/xing1.png",95,95,temp._nposX,temp._nposY,temp._nscale,temp._ndelay);
                } 
                else
                {
                    itemP.Show("UILoading/xing2.png",97,116,temp._nposX,temp._nposY,temp._nscale,temp._ndelay);
                }
            }
        }
        
    }
}
}

class UIStarItem extends Laya.Image {
     _murl: string;
     _mwidth:number;
    _mheight:number;
    _mposX:number;
    _mposY:number;
    _mscale: number;
    _mdelay: number;
    _mscaleValue:number;
    _mImage:Laya.Image;
    _mZheng:boolean= false;// 0-1正      1-0反 默认是反

    constructor() {
        super();
        this._murl = "";
        this._mwidth = 0;
        this._mheight = 0;
        this._mposX = 0;
        this._mposY = 0;
        this._mscale = 0;
        this._mdelay = 0;
        this._mscaleValue = 0;
        this._mZheng = false;
    }

    public Show(url:string,width:number,height:number,x:number,y:number,scale:number,delay:number): void {
        this._murl = url;
        this._mwidth = width;
        this._mheight = height;
        this._mposX = x;
        this._mposY = y;
        this._mscale = scale;
        this._mdelay = delay;
        this._mscaleValue = this._mscale;
        this._mZheng = false;
        
        
        this.loadImage(url, 0, 0, 0,  0) as Laya.Image;
        this.scale(scale, scale);
        this.width = this._mwidth;
        this.height = this._mheight;
        this.pos(this._mposX, this._mposY);
        this.height = this._mheight;
        this.pivot(this._mwidth / 2, this._mheight / 2);
        Laya.timer.frameLoop(this._mdelay, this, this.PlayAnim);
    }
   
    PlayAnim(): void {
        if(this._mZheng)
        {
            this._mscaleValue +=0.1;
            if (this._mscaleValue >= this._mscale)
                this._mZheng = false;
        }
        else
        {
            this._mscaleValue -=0.1;
            if (this._mscaleValue <= 0)
                this._mZheng = true;
        }
        this.scale(this._mscaleValue,this._mscaleValue);
        this.alpha = this._mscaleValue;
    }
}

class starData
{
    public _mType:number;
    public _nposX:number;
    public _nposY:number;
    public _nscale:number;
    public _ndelay:number;
    constructor(t:number, x:number,y:number,s:number,d:number)
    {
        this._mType =t;
        this._nposX = x;
        this._nposY = y;
        this._nscale = s;
        this._ndelay =  d;
    }
}