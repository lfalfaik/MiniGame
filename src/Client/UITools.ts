/*
* name;
*/
class UITools{
    // 设置obj的显示
     public static SetActive(obj: any, isaicive:boolean): void {
         if (obj == null)
            return;
        obj.visible=isaicive;
    }

    // 设置image   bin下的路径
     public static SetImage(obj: Laya.Image, path:string ): void {
         if (obj == null)
            return;
        obj.skin = path;
    }

    // 添加btn监听事件
    // public static AddOnclick(btn: any, listener: Function, args?: Array<any>): void {
   //      btn.on(Laya.Event.CLICK, this, listener, args);
   // }
    // 添加bab监听事件
    public static AddOnclickTab(btn: Laya.Tab, listener: Function, args?: Array<any>): void {
        if (btn != null) {
            btn.on(Laya.Event.SELECT, this, listener, args);
        }
    }
    // 设置tab的索引
    public static SetTabSelectIndex(btn: Laya.Tab, index:number): void {
        if (btn != null) {
            btn.selectedIndex = index;
        }
    }

    //清空lab
    public static ClearLab(lable:Laya.Label):void{
        if(lable == null)
        return;
        lable.text = "";
    }
    // 设置lab
    public static SetLab(lable:Laya.Label,text:any):void{
        if (lable == null)
        {
             console.log("lable 是null   "+text);
             return;
        }
        if(text == null)
            UITools.ClearLab(lable);
        else
            lable.text = text;
    }
    // 设置 btn的lab
    public static SetLabByButton(btn:Laya.Button,text:string):void{
        if (btn == null)
        {
             console.log("btn 是null   "+text);
             return;
        }
        btn.label = text;
    }
    
    //  设置 tab的lab
    public static SetTabLab(tab:Laya.Tab,text1:string,text2:string,text3?:string):void
    {
        if (tab == null)
        {
             console.log("tab 是null   ");
             return;
        }
        var str:string = text1+","+text2;

        //str = (text3 !== undefined ? str+","+text3:str);三木运算符
        
        if (text3 != undefined)// 未定义参数
        {
            str =str+","+text3;

        }

        tab.labels = str;
    }

    public static SetTransfromPos(obj:Laya.Image,x:number,y:number):void{
       if (obj == null)
            return;
        obj.pos(x,y);
    }

    // 1,2,3,4,5,6  返回值 21
    public static addNum(a:number,b:number,...rest:number[]):number{
        var total=a+b;
        for(var i=0;i<rest.length;i++){
            total+=rest[i];
        }
        return total;
    }
}