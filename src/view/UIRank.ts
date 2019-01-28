/*
* name;
*/
module view{
export class UIRank extends ui.UIRankUI{

    _scrollview:Laya.List;
    _leftscrollview:Laya.List;
    _topTab:Laya.Box;
    _leftType:number;
    _FriendOrWorldType:number;
    _colorHei:string = "#000000";
    _colorBai:string = "#ffffff";

     constructor() {
        super();
    }
    // 关闭界面
    onClosed():void{
        
    }
    onClear()
    {
        this._colorHei =  "#000000";
        this._colorBai =  "#ffffff";
        this._leftType = 0;
        this._FriendOrWorldType = RankType.Friend;
    }
    // 打开界面-初始化
    onShow(ranktype:number = RankType.Friend,type:number = 1): void {
        this.onClear();
        this._topTab =  this.topBtns;

        this._scrollview = this.scollview;
        this._leftscrollview = this.leftbtns;
        
        this.btn_friend.on(Laya.Event.CLICK,this,this.OnFriendBtnClick);
        this.btn_world.on(Laya.Event.CLICK,this,this.OnWorldBtnClick);

        this.btn_return.on(Laya.Event.CLICK,this,this.OnClosedBtnClick);
        this.InitLeftBtns();
        this.SetTopType(ranktype,false);
        this.SetType(type,false);
        this.PlayLeftAnim();
        this.PlayTopAnim();
        this.SetItems();
    }

    InitLeftBtns()
    {
        let list:Array<ModelInfo> = ModelManager.Instance._Infos;
        if (this._leftscrollview == null) 
            return;

        this._leftscrollview.repeatX = 1;
		this._leftscrollview.repeatY = 10;
        this._leftscrollview.spaceY = 10;
        this._leftscrollview.selectEnable = true;
        this._leftscrollview.vScrollBarSkin = "";// 使用但隐藏滚动条
		
		this._leftscrollview.array = list;
		this._leftscrollview.renderHandler = new Laya.Handler(this, this.onLetBtnsRender);
       //监听列表 
		this._leftscrollview.selectEnable = true; 
		this._leftscrollview.selectHandler = Laya.Handler.create(this, this.onSelect, null,false);

        this._leftscrollview.scrollTo(0);
    }
    onSelect(index: number)
    {
        MusicManager.Instance.playSound(StringDefine.SOUND_CLICKBTN);
        var info: ModelInfo = ModelManager.Instance.GetInfoByIndex(index);
		if (info == null )
			return;
         let tempData:ModelData = ModelManager.Instance.GetDataById(info._id);
        if (tempData == null)
            return;
        this.SetType(tempData.type);
    }
     onLetBtnsRender(cell: Laya.Box, index: number): void {
		var info: ModelInfo = ModelManager.Instance.GetInfoByIndex(index);
		if (info == null )
			return;
        let tempData:ModelData = ModelManager.Instance.GetDataById(info._id);
        if (tempData == null)
            return;
       // cell.on(laya.events.Event.CLICK, this,
       // function(){
        //      this.SetType(tempData.type);   
       // }    
       // );
        
        var click: Laya.Image = cell.getChildByName("click_bg") as Laya.Image;     
		var Lab1: Laya.Image = cell.getChildByName("lab_normal") as Laya.Image;
        var clicklab: Laya.Image = cell.getChildByName("click_lab") as Laya.Image;
        
         let isclick:boolean = index == this._leftType -1;
               
        if (isclick)
        {
            UITools.SetActive(click,true);
            UITools.SetActive(clicklab,true);
            UITools.SetActive(Lab1,false);
        }
        else
        {
            UITools.SetActive(click,false);
            UITools.SetActive(clicklab,false);
            UITools.SetActive(Lab1,true);
        }
        UITools.SetImage(Lab1,ClientTools.GetModelNameById(info._id));
        UITools.SetImage(clicklab,ClientTools.GetModelNameById(info._id,true));
	}

    SetItems()
    {
        if (this._scrollview == null) 
            return;
        let list:Array<RankInfo> = new  Array<RankInfo>();
        let rankinfos:RankInfos =  RankManager.Instance.GetRankInfosByType(this._FriendOrWorldType,this._leftType);
        if (rankinfos != null && rankinfos._list != null )
            list = rankinfos._list;

        if (rankinfos == null )
       // this._scrollview.repeatX = 1;
		//this._scrollview.repeatY = 13;
        this._scrollview.selectEnable = true;
        this._scrollview.vScrollBarSkin = "";// 使用但隐藏滚动条
		
		this._scrollview.array = list;
		this._scrollview.renderHandler = new Laya.Handler(this, this.onListRender);
        this._scrollview.scrollTo(0);

        let myInfo:RankInfo =  null;
        if (rankinfos != null && rankinfos._myRank != null)
            myInfo = rankinfos._myRank;
        UITools.SetActive(this.myRank,myInfo!= null);
        if (myInfo != null)
        {
            UITools.SetLab(this.lab_myname,myInfo._playerName);
            UITools.SetLab(this.lab_myrank,myInfo._rank);
            UITools.SetLab(this.lab_myscore,myInfo._score);
        }
    }

    onListRender(cell: Laya.Box, index: number): void {
		var info: RankInfo = RankManager.Instance.GetRankInfoByTypeAndIndex(this._FriendOrWorldType,this._leftType,index);
		if (info == null)
			return;
      
        var bg1: Laya.Image = cell.getChildByName("1") as Laya.Image;   
        var bgme: Laya.Image = cell.getChildByName("me") as Laya.Image; 

		var rankLab: Laya.Label = cell.getChildByName("lab_rank") as Laya.Label;
		var nameLab: Laya.Label = cell.getChildByName("lab_name") as Laya.Label;
        var scoreLab: Laya.Label = cell.getChildByName("lab_score") as Laya.Label;
        
        UITools.SetLab(rankLab,info._rank);
        UITools.SetLab(nameLab,info._playerName);
        UITools.SetLab(scoreLab,info._score);

        let e:number = index % 2;
       
        if (info.IsMe())
        {
             UITools.SetActive(bg1,false);
             UITools.SetActive(bgme,true);
        }
        else
        {
             UITools.SetActive(bg1,e == 0);
             UITools.SetActive(bgme,false);
        }

        if (info.IsMe())
        {
            rankLab.color = this._colorHei;
            nameLab.color = this._colorHei;
            scoreLab.color = this._colorHei;
        }
        else
        {
            rankLab.color = this._colorBai;
            nameLab.color =this._colorBai;
            scoreLab.color = this._colorBai;
        }  
	}

    SetTopType(type:number,ispushui:boolean = true)
    {
        if(this._FriendOrWorldType == type)
            return;
        this._FriendOrWorldType = type;
        if (ispushui)
        {
            this.PlayTopAnim();
            this.SetItems();
        }  
    }

    // 10个游戏类型
    SetType(type:number,ispushui:boolean = true)
    {
        if (this._leftType == type)
            return;
        this._leftType = type;
        if (ispushui)
        {
            this.PlayLeftAnim();
            this.SetItems();
        }
            
    }

    PlayTopAnim()
    {
        if (this._topTab != null)
        {
            for(var i:number = 0;i<this._topTab._childs.length;i++){
                if(i == this._FriendOrWorldType -1)
                    this._topTab._childs[i].skin = "tongyong/anniu_1.png";
                else
                     this._topTab._childs[i].skin = "tongyong/anniu_1_select.png";
            }
        }
    }

    PlayLeftAnim()
    {
        if (this._leftscrollview != null)
        {
            for(var i:number = 0;i<this._leftscrollview.cells.length;i++){
                var click: Laya.Image = this._leftscrollview.cells[i].getChildByName("click_bg") as Laya.Image;  
                var clicklab: Laya.Label = this._leftscrollview.cells[i].getChildByName("click_lab") as Laya.Label;  
                var normal: Laya.Label = this._leftscrollview.cells[i].getChildByName("lab_normal") as Laya.Label;   

                let isclick:boolean = i == this._leftType -1;
               
                if (isclick)
                {
                    UITools.SetActive(click,true);
                    UITools.SetActive(clicklab,true);
                    UITools.SetActive(normal,false);
                }
                else
                {
                     UITools.SetActive(click,false);
                      UITools.SetActive(clicklab,false);
                     UITools.SetActive(normal,true);
                }
            }
        }
    }

    OnFriendBtnClick()
    {
         this.SetTopType(RankType.Friend);
    }

    OnWorldBtnClick()
    {
         this.SetTopType(RankType.World);
    }

     OnClosedBtnClick()
    {
        GameUIManager.Instance.removeUI(this,true);
    }
}
}