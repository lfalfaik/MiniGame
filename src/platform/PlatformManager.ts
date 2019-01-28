/*
* 平台管理器;
*/
class PlatformManager extends Singleton {
    //---------------instance begin----------------------------------------------------
    public static get Instance(): PlatformManager {
        if (!this._instance) {
            this._instance = new PlatformManager();
        }
        return this._instance as PlatformManager;
    }
    private static _instance: PlatformManager;
    //---------------instance end----------------------------------------------------

    private _curPlatform: PlatformBase = null;

    public InitPlatform() {
        //需要根据配置加载对应的平台
        let initData: PingTaiData =  new PingTaiData(ConstDataManager.Instance.GetValue("pingtai","wechat"));
        let str: string = "";
        if (initData != null)  {
            str = initData.name;
        }

        switch (str)  {
            case "wechat":
                {
                    this._curPlatform = new WechatPlatform();
                }
                break;
            case "web":
            default:
                {
                    this._curPlatform = new WebPlatform();
                }
                break;

        }

    }

    //---------------相册 begin----------------------------------------------------
    public ChooseImg(func: Function) {
        if (this._curPlatform != null) {
            this._curPlatform.ChooseImg(func);
        }
    }

    public ReadImg(path: string, func: Function) {
        if (this._curPlatform != null) {
            this._curPlatform.ReadImg(path, func);
        }
    }
    //---------------相册 end----------------------------------------------------

    //截屏
    public SaveScreenToPhoto(func : Function)
    {
        if (this._curPlatform != null) {
            this._curPlatform.SaveScreenToPhoto(func);
        }
    }

    public OnSaveScreenToPhoto(witdh: number, height: number, offsetX: number, offsetY: number, func: Function) 
    {
        if (this._curPlatform != null) {
            this._curPlatform.OnSaveScreenToPhoto(witdh,height,offsetX,offsetY,func);
        }
    }

    //分享
    public UIShare(shareType : number,succfunc:Function = null,losefunc:Function = null){
        if (this._curPlatform != null) {
            this._curPlatform.UIShare(shareType,succfunc,losefunc);
        }
     }
}

class PingTaiData
{
    public name : string;
    constructor(str:string)
    {
        this.name =str;
    }
}