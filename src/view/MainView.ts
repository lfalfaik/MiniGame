/*
* name;
*/
module view {
    export class MainView extends ui.MainViewUI {

     _selectIndex:number = 0;
     _curInfo:ModelInfo = null;
     _MusicIndex:number = -1;
     _Anim: Laya.Animation;
     _list: Array<ModelInfo> = ModelManager.Instance._Infos;
        constructor() {
            super();
            this.lab_score.font = "font_red";
        }

    onShow(id:number) {
        this._selectIndex = -1;
        this._curInfo = null;
        this._list = ModelManager.Instance.GetInfos();
        this.btn_music.on(Laya.Event.CLICK,this,this.OnMusciBtnClick);
        this.btn_shengxiao.on(Laya.Event.CLICK,this,this.OnShengXiaoBtnClick);
        this.btn_rank.on(Laya.Event.CLICK,this,this.OnRankBtnClick);
        this.btn_share.on(Laya.Event.CLICK,this,this.OnShareBtnClick);
        this.btn_shengxiao.visible= false;
        this.btn_left.on(Laya.Event.CLICK,this,this.OnLeftBtnClick);
        this.btn_right.on(Laya.Event.CLICK,this,this.OnRightBtnClick);
        this.btn_gamestart.on(Laya.Event.CLICK,this,this.OnGameStartBtnClick);
        this.btn_tryplay.on(Laya.Event.CLICK,this,this.OnTryPlayBtnClick);
 
        ClientEventManager.Instance.On(ClientEvent.UPDATE_MODELINFO, this, this.OnUpdataItem);
        ClientEventManager.Instance.On(ClientEvent.ON_SETMUSICSUCC, this, this.SetMusic);
        ClientEventManager.Instance.On(ClientEvent.ON_GAME_SHARE_SUCC, this, this.OnGameShareSucc);
        let index:number = ModelManager.Instance.GetIndexById(id);
        if(index <= -1)
            index = 0;
        this.SetIndex(index);
        this.SetMusic();
    }

    public onClosed():void
    {
         ClientEventManager.Instance.Off(ClientEvent.UPDATE_MODELINFO, this, this.OnUpdataItem);
         ClientEventManager.Instance.Off(ClientEvent.ON_SETMUSICSUCC, this, this.SetMusic);
         ClientEventManager.Instance.Off(ClientEvent.ON_GAME_SHARE_SUCC, this, this.OnGameShareSucc);

    }

    SetMusic()
    {
        this._MusicIndex = MusicManager.Instance.GetIndexByMusicName(SetManager.Instance.GetMusicName());
        let musicname:string = SetManager.Instance.GetMusicName();
        let musicopen = true;
        if (musicname == null || musicname == "")
            musicopen = false;
        //UITools.SetActive(this.music_open,musicopen == true);
        UITools.SetActive(this.music_open,false);// 默认只播放一首音乐了。所以不需要显示index了
        UITools.SetActive(this.music_closed,musicopen == false);

        if(musicopen)
        {
            UITools.SetLab(this.music_soundvaluelab,this._MusicIndex);
        }
    }

    OnUpdataItem(id)
    {
        //let index:number  = ModelManager.Instance.GetIndexById(id);// 索引
        //if(this._selectIndex == index)
        {
            this.SetIndex(this._selectIndex);
        }
    }

    onPlayGame(id:number)
    {
        let data:ModelData = ModelManager.Instance.GetDataById(id);
        if (data == null)
            return;
        ModelManager.Instance.SetCurId(data.id);
        ModelManager.Instance._CurScore = 0;

        let isclosed:boolean = true;
        if (data.type == 1)
            GameUIManager.Instance.OpenUIGame1(true);
        else if (data.type  == 2)
            GameUIManager.Instance.OpenUIGame2(true);
        else if (data.type  == 3)
            GameUIManager.Instance.OpenUIGame3(true);
        else if (data.type  == 4)
            GameUIManager.Instance.OpenUIGame4(true); 
        else if (data.type  == 5)
            GameUIManager.Instance.OpenUIGame5(true);       
        else if (data.type  == 6)
            GameUIManager.Instance.OpenUIGame6(true);          
        else if (data.type  == 7)
            GameUIManager.Instance.OpenUIGame7(true);
        else if (data.type  == 8)
            GameUIManager.Instance.OpenUIGame8(true);
        else if (data.type  == 9)
            GameUIManager.Instance.OpenUIGame9(true);
        else
        {
            isclosed = false;
        }
        if (isclosed)
            GameUIManager.Instance.ClosedUIMainView();
    }
    OnGameStartBtnClick(info):void
    {
        if (this._curInfo == null || this._curInfo ._isOpen == false)
            return;
        this.onPlayGame(this._curInfo._id);
    }

    OnTryPlayBtnClick(): void {
        if (this._curInfo == null || this._curInfo ._isOpen == true)
            return;
		GameUIManager.Instance.OpenUITryPlay(this._curInfo);
	}

    OnShengXiaoBtnClick()
    {
        GameUIManager.Instance.openUISkin();
    }

    OnMusciBtnClick()
    {
        let list:Array<MusicData> = MusicManager.Instance._MusicDatas;
        
        if (this._MusicIndex >= 0 && this._MusicIndex <list.length-1)
        {
            this._MusicIndex ++;
        }
        else if (this._MusicIndex == list.length-1)
        {
             this._MusicIndex = 0;
        }
        SetManager.Instance.SetMusic(MusicManager.Instance.GetMusicNameByIndex( this._MusicIndex));
    }

    OnRankBtnClick()
    {
        GameUIManager.Instance.OpenUIRank();
    }

    OnShareBtnClick()
    {
       PlatformManager.Instance.UIShare(1);
    }

    OnLeftBtnClick():void
    {
        this.PLayAnim(true);
    }

    OnRightBtnClick():void
    {
        this.PLayAnim(false);
    }   

    PLayAnim(isleft:boolean)
    {
        if (this._list == null || this._list.length == 0)
        {
            //UITools.SetActive(this.btn_left,false);
            //UITools.SetActive(this.btn_right,false);
            return;
        }
           
        if (isleft)
        {
            if (this._selectIndex <= 0)
               this._selectIndex = this._list.length-1
            else
                this._selectIndex--;
        }
        else
        {
            if (this._selectIndex >= this._list.length-1)
                this._selectIndex = 0; 
            else
                this._selectIndex++;
        }
        this.SetIndex(this._selectIndex);
    }  

    SetIndex(index:number)
    {
        this._selectIndex = index;
        this._curInfo = ModelManager.Instance.GetInfoByIndex(this._selectIndex);
        ModelManager.Instance.SetCurId(this._curInfo._id);
        this.SetData();

        //UITools.SetActive(this.btn_left,this._selectIndex > 0);
        //UITools.SetActive(this.btn_right,this._selectIndex < this._list.length -1);
    }
   
    SetData()
    {
        if (this._curInfo == null)
        {
            Debuger.Log("modele 没有数据啊");
            return;
        }
        if (this.lab_name != null)
        {
            this.lab_name.skin = ClientTools.GetModelNameById(this._curInfo._id);
        }
        if (this._curInfo._score == 0)
        {
            UITools.SetActive(this.lab_score,false);
            UITools.SetActive(this.score_bg,false);
        }
        else
        {
             UITools.SetActive(this.lab_score,true);
             UITools.SetActive(this.score_bg,true);
             UITools.SetLab(this.lab_score,this._curInfo._score);
        }

        UITools.SetActive(this.btn_gamestart,this._curInfo._isOpen);
        UITools.SetActive(this.btn_tryplay,this._curInfo._isOpen == false);
        UITools.SetActive(this.lock,this._curInfo._isOpen== false);
          UITools.SetActive(this.lockTex,this._curInfo._isOpen== false);

        this.onPlayAnim();
    }

    GetAnimPath():any
    {
        return ["tongyong/changjingbg.png", "tongyong/changjingbg.png"];
    }

    onPlayAnim():void{
        
        if (this._Anim != null)
            this._Anim.removeSelf();
        Laya.Animation.createFrames(this.GetAnimPath(), "Anim");
        this._Anim = new Laya.Animation;
        this.animPos .addChild(this._Anim);
        //设置精灵的位置
        this._Anim.pos(0,0);
        this._Anim.interval = 1000;	
        //加载动画图集，加载成功后执行回调方法
        this._Anim.play(0, true, "Anim"); 
        
    }

    OnGameShareSucc(id:number)
    {
        this.onPlayGame(id);
    }
}
}