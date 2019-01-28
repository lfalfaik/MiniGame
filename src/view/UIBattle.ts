/*
* name;
*/
module view {
export class UIBattle extends ui.UIBattleUI {
    _score:number;
    _allcount: number = 3;
    constructor(){
         super();
         this.lab_number.font = StringDefine.FONT_BAI;
    }
    onShow() {
        this._score = 0;
       this._allcount = ConstDataManager.Instance.GetIntValue("txt_daojishitime",3);
       UITools.SetActive(this.defen,false);
       this.SetScore(0);
       UITools.SetActive(this.cd,true);

       UITools.SetLab(this.lab_number,this._allcount);
       Laya.timer.loop(1000, this, this.PlayCD);
       ClientEventManager.Instance.On(ClientEvent.ON_SCORE_UPDATA, this, this.SetScore);
       ClientEventManager.Instance.On(ClientEvent.ON_GAME_TRYPLAY, this, this.OnGameTryPlay);
    }

    public onClosed():void
    {
         ClientEventManager.Instance.Off(ClientEvent.ON_SCORE_UPDATA, this, this.SetScore);
         ClientEventManager.Instance.Off(ClientEvent.ON_GAME_TRYPLAY, this, this.OnGameTryPlay);
    }

    OnGameTryPlay()
    {
        this.SetScore(0);
    }

    SetScore(num)
    {
        this._score = num;
        if (this.lab_score != null)
            UITools.SetLab(this.lab_score,num);
        ModelManager.Instance._CurScore = this._score;
        if (this._score > 0)
            MusicManager.Instance.playSound(StringDefine.SOUND_ADDSCORE);
    }

    PlayCD()
    {
        UITools.SetLab(this.lab_number,this._allcount-1);
        if (this._allcount > 0)
        {
            this._allcount-=1;
            if (this._allcount == 0)
            {
                UITools.SetActive(this.cd,false);
                UITools.SetActive(this.defen,true);
                ClientEventManager.Instance.Event(ClientEvent.ON_GAME_START);
                Laya.timer.clear(this, this.PlayCD);
            }
        }
        
    }
}
}