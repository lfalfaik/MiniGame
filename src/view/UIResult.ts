/*
* name;
*/
module view{
export class UIResult extends ui.UIResultUI{
    _scoreLab:Laya.Label;
    _playerNameLab:Laya.Label;
    _playerScoreLab:Laya.Label;
    _playerHeadIamg:Laya.Image;
     _playBox:Laya.Box;
    _Info:ModelInfo;

    constructor(){
        super();
    }

    onShow(id:number,score:number,reviveTimes:number)
    {
         MusicManager.Instance.playSound(StringDefine.SOUND_GAMEOVER);
        ClientEventManager.Instance.Event(ClientEvent.ON_GAME_PAUSE);
        let info:ModelInfo = ModelManager.Instance.GetInfoById(id);
        if (info != null && info._isOpen == true)
            ModelManager.Instance.OnUpdataInfo(id,info._isOpen,score);
        this._Info = new ModelInfo (id,true,score);
        this._scoreLab = this.lab_score;
        this._playerNameLab = this.player_lab;
        this._playerScoreLab = this.player_score;
        this._playerHeadIamg = this.player_tex;
        this._playBox =this.friend;

        this.btn_replay.on(Laya.Event.CLICK,this,this.OnTryPlayBtnClick);
        this.btn_return.on(Laya.Event.CLICK,this,this.OnReturnBtnClick);
        this.btn_watchvideo.on(Laya.Event.CLICK,this,this.OnWhatTVBtnClick);
        this.SetData();
        this.btn_watchvideo.visible = reviveTimes<1?true:false;
    }

     // 关闭界面
    onClosed():void{
         
    }

    SetData()
    {
        if (this._Info == null)
            return;
        UITools.SetLab(this._scoreLab,this._Info._score);

        let friend:FriendInfo  = ModelManager.Instance.GetNearFriendInfo();
        UITools.SetActive(this._playBox,friend!= null);
        if (friend != null)
        {
            UITools.SetLab(this._playerNameLab,friend._name);
             UITools.SetLab(this._playerScoreLab,friend._score); if (this._playerHeadIamg != null)
                this._playerHeadIamg.skin = "headIcon/"+friend._tex+".png";
        }
    }

    OnReturnBtnClick()
    {
        GameUIManager.Instance.removeUI(this);
        ClientEventManager.Instance.Event(ClientEvent.ON_GAME_OVER);
    }

    OnTryPlayBtnClick()
    {
        GameUIManager.Instance.removeUI(this);
        ClientEventManager.Instance.Event(ClientEvent.ON_GAME_TRYPLAY);
    }

    OnWhatTVBtnClick()
    {
         GameUIManager.Instance.removeUI(this);
         ClientEventManager.Instance.Event(ClientEvent.ON_GAME_CONTINUE);
    }

}
}