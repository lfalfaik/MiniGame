
class GameUIManager extends Singleton {

    //---------------instance begin----------------------------------------------------
    public static get Instance(): GameUIManager  {
        if (!this._instance)  {
            this._instance = new GameUIManager();
        }
        return this._instance as GameUIManager;
    }
    private static _instance: GameUIManager;
    //---------------instance end----------------------------------------------------

    public uiMainView: view.MainView;
    //public uiTips: view.UITips;
    public uiTryPlay: view.UITryPlay;
    public uiGame1: view.Game1;
    public uiGame2: view.Game2;
    public uiGame3: view.Game3;
    public uiGame4: view.Game4;
    public uiGame5: view.Game5;
    public uiGame6: view.Game6;
    public uiGame7: view.Game7;
    public uiGame8: view.Game8;
    public uiGame9: view.Game9;
    public uiLoading: view.UILoading;
    public uiRank: view.UIRank;
    public uiResult: view.UIResult;
    public uiBattle: view.UIBattle;
    public uiSkin: view.UISkin;
    public uiPanel: view.UIPanel;
    public uiTips:view.UITips;

    openUIPanel(name:UIName = UIName.UIOther): void {
        if (this.uiPanel == null) {
            this.uiPanel = new view.UIPanel();
        } else {
            this.uiPanel.visible = true;
        }
        this.uiPanel.onShow(name);
        Laya.stage.addChild(this.uiPanel);
    }

    openUILoading(): void {
        GameUIManager.Instance.openUIPanel(UIName.UILoading);
        if (this.uiLoading == null) {
            this.uiLoading = new view.UILoading();
        } else {
            this.uiLoading.visible = true;
        }
        this.uiLoading.onShow();
        Laya.stage.addChild(this.uiLoading);
    }

    isUILoading(): boolean {
        return this.uiLoading != null && this.uiLoading.visible;
    }

    setUILoadingProgress(value: number): void {
        if (this.uiLoading != null) {
            this.uiLoading.setProgress(value);
        }
    }

    OpenUIMainView(id: number = 0): void  {
         GameUIManager.Instance.openUIPanel(UIName.UIOther);
        if (this.uiMainView == null) {
            this.uiMainView = new view.MainView();
            GameConfig.uiResize(this.uiMainView.ui_top);
            GameConfig.uiResize(this.uiMainView.ui_left);
            GameConfig.uiResize(this.uiMainView.ui_right);
            GameConfig.uiResize(this.uiMainView.ui_bottom);
        } else {
            this.uiMainView.visible = true;
        }
        this.uiMainView.onShow(id);
        Laya.stage.addChild(this.uiMainView);
    }
    // 关闭主界面
    ClosedUIMainView(): void  {
        GameUIManager.Instance.removeUI(this.uiMainView);
        GameUIManager.Instance.removeUI(this.uiPanel);
    }

    // 关闭主界面
    ClosedUILaodidng(): void  {
        GameUIManager.Instance.removeUI(this.uiLoading);
        GameUIManager.Instance.removeUI(this.uiPanel);
    }

    OpenUIGame1(isclosedUIMain: boolean = false): void  {
        if (this.uiGame1 == null) {
            this.uiGame1 = new view.Game1();
        } else {
            this.uiGame1.visible = true;
        }
         this.uiGame1.onShow();
        Laya.stage.addChild(this.uiGame1);

        GameUIManager.Instance.openUIBattle();

        if (isclosedUIMain)
            this.ClosedUIMainView();
    }

    OpenUIGame2(isclosedUIMain: boolean = false): void  {
        if (this.uiGame2 == null) {
            this.uiGame2 = new view.Game2();
        } else {
            this.uiGame2.visible = true;
        }
        this.uiGame2.onShow();
        Laya.stage.addChild(this.uiGame2);

        GameUIManager.Instance.openUIBattle();

        if (isclosedUIMain)
            this.ClosedUIMainView();
    }
    OpenUIGame3(isclosedUIMain: boolean = false): void  {
        if (this.uiGame3 == null) {
            this.uiGame3 = new view.Game3();
        } else {
            this.uiGame3.visible = true;
        }
        this.uiGame3.onShow();
        Laya.stage.addChild(this.uiGame3);

        GameUIManager.Instance.openUIBattle();

        if (isclosedUIMain)
            this.ClosedUIMainView();
    }
    OpenUIGame4(isclosedUIMain: boolean = false): void  {
        if (this.uiGame4 == null) {
            this.uiGame4 = new view.Game4();
        } else {
            this.uiGame4.visible = true;
        }
        this.uiGame4.onShow();
        Laya.stage.addChild(this.uiGame4);

        GameUIManager.Instance.openUIBattle();

        if (isclosedUIMain)
            this.ClosedUIMainView();
    }
    OpenUIGame5(isclosedUIMain: boolean = false): void  {
        if (this.uiGame5 == null) {
            this.uiGame5 = new view.Game5();
        } else {
            this.uiGame5.visible = true;
        }
        this.uiGame5.onShow();
        Laya.stage.addChild(this.uiGame5);

        GameUIManager.Instance.openUIBattle();

        if (isclosedUIMain)
            this.ClosedUIMainView();
    }
    OpenUIGame6(isclosedUIMain: boolean = false): void  {
        if (this.uiGame6 == null) {
            this.uiGame6 = new view.Game6();
        } else {
            this.uiGame6.visible = true;
        }
        this.uiGame6.onShow();
        Laya.stage.addChild(this.uiGame6);

        GameUIManager.Instance.openUIBattle();

        if (isclosedUIMain)
            this.ClosedUIMainView();
    }
    // 永往直前
    OpenUIGame7(isclosedUIMain: boolean = false): void  {
        if (this.uiGame7 == null) {
            this.uiGame7 = new view.Game7();
        } else {
            this.uiGame7.visible = true;
        }
        this.uiGame7.onShow();
        Laya.stage.addChild(this.uiGame7);

        GameUIManager.Instance.openUIBattle();

        if (isclosedUIMain)
            this.ClosedUIMainView();
    }

    OpenUIGame8(isclosedUIMain: boolean = false): void  {
        if (this.uiGame8 == null) {
            this.uiGame8 = new view.Game8();
        } else {
            this.uiGame8.visible = true;
        }
        this.uiGame8.onShow();
        Laya.stage.addChild(this.uiGame8);
        GameUIManager.Instance.openUIBattle();
        if (isclosedUIMain)
            this.ClosedUIMainView();
    }
    OpenUIGame9(isclosedUIMain: boolean = false): void  {
        if (this.uiGame9 == null) {
            this.uiGame9 = new view.Game9();
        } else {
            this.uiGame9.visible = true;
        }
        this.uiGame9.onShow();
        Laya.stage.addChild(this.uiGame9);
        GameUIManager.Instance.openUIBattle();
        if (isclosedUIMain)
            this.ClosedUIMainView();
    }
   OpenUITips(key:string,delay:number = 1000,color:string = "##000000"): void  {
        
        if (this.uiTips == null) {
            this.uiTips = new view.UITips();
        } else {
            this.uiTips.visible = true;
        }
        this.uiTips.onShow(key,delay,color);
        Laya.stage.addChild(this.uiTips);
    }

    OpenUITryPlay(info: ModelInfo): void  {
        
        if (this.uiTryPlay == null) {
            this.uiTryPlay = new view.UITryPlay();
        } else {
            this.uiTryPlay.visible = true;
        }
        this.uiTryPlay.onShow(info);
        Laya.stage.addChild(this.uiTryPlay);
    }

    OpenUIRank(ranktype: number = RankType.Friend, type: number = 1): void  {
        GameUIManager.Instance.openUIPanel(UIName.UIRank);
        RankManager.Instance.OnGetRankInfosSucc();
        if (this.uiRank == null) {
            this.uiRank = new view.UIRank();
        } else {
            this.uiRank.visible = true;
        }
        this.uiRank.onShow(ranktype, type);
        Laya.stage.addChild(this.uiRank);
    }

    OpenUIResult(reviveTimes:number): void  {
        let id: number = ModelManager.Instance._CurId;
        let score: number = ModelManager.Instance._CurScore;
        if (this.uiResult == null) {
            this.uiResult = new view.UIResult();
        } else {
            this.uiResult.visible = true;
        }
        this.uiResult.onShow(id, score,reviveTimes);
        Laya.stage.addChild(this.uiResult);
    }

    openUIBattle(): void {
        if (this.uiBattle == null) {
            this.uiBattle = new view.UIBattle();
        } else {
            this.uiBattle.visible = true;
        }
        this.uiBattle.onShow();
        Laya.stage.addChild(this.uiBattle);
    }

    openUISkin(): void {
        GameUIManager.Instance.openUIPanel(UIName.UISkin);
        if (this.uiSkin == null) {
            this.uiSkin = new view.UISkin();
        } else {
            this.uiSkin.visible = true;
        }
        this.uiSkin.onShow();
        Laya.stage.addChild(this.uiSkin);
    }

    public removeUI(view: View, isOpenUIMain: boolean = false,isgameui:boolean = false): void {

        if (isOpenUIMain)
        {
             this.OpenUIMainView(ModelManager.Instance._CurId);
        }
            
        if (view != null) 
        {
             if (view == this.uiTryPlay) {
                this.uiTryPlay.onClosed();
            } else if (view == this.uiBattle) {
                this.uiBattle.onClosed();
            } else if (view == this.uiMainView) {
                this.uiMainView.onClosed();
            } else if (view == this.uiRank) {
                this.uiRank.onClosed();
            }else if (view == this.uiSkin) {
                this.uiSkin.onClosed();
            }else if (view == this.uiResult) {
                this.uiResult.onClosed();
            }
           
            view.visible = false;
            Laya.stage.removeChild(view);
            if (isgameui)   // 避免game初始化了，所以直接销毁吧
            {   
                view.destroy(true);
                if (view == this.uiGame1) 
                {
                    this.uiGame1.onClosed();
                    this.uiGame1 = null;
                }
                else if (view == this.uiGame2) 
                {
                    this.uiGame2.onClosed();
                    this.uiGame2 = null;
                }
                else if (view == this.uiGame3) 
                {
                     this.uiGame3.onClosed();
                     this.uiGame3 = null;
                }
                else if (view == this.uiGame4) 
                {
                    this.uiGame4.onClosed();
                    this.uiGame4 = null;
                }   
                 else if (view == this.uiGame5) 
                {
                    this.uiGame5.onClosed();
                    this.uiGame5 = null;
                } 
                else if(view == this.uiGame6){
                    this.uiGame6.onClosed();
                }
                else if (view == this.uiGame7) 
                {
                    this.uiGame7.onClosed();
                    this.uiGame7 = null;
                }  
                else if (view == this.uiGame8) 
                {
                    this.uiGame8.onClosed();
                    this.uiGame8 = null;
                }
                else if (view == this.uiGame9) 
                {
                    this.uiGame9.onClosed();
                    this.uiGame9 = null;
                }
            }  
        }
    }
}