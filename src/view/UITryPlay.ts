/*
* name;
*/
module view{
    export class UITryPlay extends ui.UITryPlayUI{
        _DescLab:Laya.Label;
        _Info:ModelInfo;

    constructor() {
        super();
        this._DescLab = this.lab_desc;
        this.btn_share.on(Laya.Event.CLICK,this,this.OnShareBtnClick);
        this.btn_ad.on(Laya.Event.CLICK,this,this.OnAdBtnClick);
        this.btn_closed.on(Laya.Event.CLICK,this,this.OnClosedBtnClick);
    }
    // 关闭界面
    onClosed():void{
        
    }
    // 打开界面-初始化
    public onShow(info:ModelInfo): void {
        this._Info = info;
        this.SetData();
    }

    SetData()
    {
        UITools.SetLab(this._DescLab,ModelManager.Instance.GetJieSuoTiaoJian(this._Info));
    }

    OnShareBtnClick()
    {
         if (this._Info == null)
                return;
        PlatformManager.Instance.UIShare(1,this.onShareSucc);
    }

    onShareSucc()
    {
        if (GameUIManager.Instance.uiTryPlay != null && GameUIManager.Instance.uiTryPlay.visible == true)
        {
             if (GameUIManager.Instance.uiTryPlay._Info == null)
                return;
            ClientEventManager.Instance.Event(ClientEvent.ON_GAME_SHARE_SUCC,GameUIManager.Instance.uiTryPlay._Info._id);
            GameUIManager.Instance.removeUI(GameUIManager.Instance.uiTryPlay);
        }
       
    }

    OnAdBtnClick()
    {
        if (this._Info == null || this._Info._isOpen == true)
            return;
        ModelManager.Instance.OnUpdataInfo(this._Info._id,true,0);
        GameUIManager.Instance.removeUI(this);
    }

    OnClosedBtnClick()
    {
        GameUIManager.Instance.removeUI(this);
    }
}

}