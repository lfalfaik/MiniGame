var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameUIManager = /** @class */ (function (_super) {
    __extends(GameUIManager, _super);
    function GameUIManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GameUIManager, "Instance", {
        //---------------instance begin----------------------------------------------------
        get: function () {
            if (!this._instance) {
                this._instance = new GameUIManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameUIManager.prototype.openUIPanel = function (name) {
        if (name === void 0) { name = UIName.UIOther; }
        if (this.uiPanel == null) {
            this.uiPanel = new view.UIPanel();
        }
        else {
            this.uiPanel.visible = true;
        }
        this.uiPanel.onShow(name);
        Laya.stage.addChild(this.uiPanel);
    };
    GameUIManager.prototype.openUILoading = function () {
        GameUIManager.Instance.openUIPanel(UIName.UILoading);
        if (this.uiLoading == null) {
            this.uiLoading = new view.UILoading();
            GameConfig.uiResize(this.uiLoading.ui_bottom);
            GameConfig.uiResize(this.uiLoading.ui_top);
        }
        else {
            this.uiLoading.visible = true;
        }
        this.uiLoading.onShow();
        Laya.stage.addChild(this.uiLoading);
    };
    GameUIManager.prototype.isUILoading = function () {
        return this.uiLoading != null && this.uiLoading.visible;
    };
    GameUIManager.prototype.setUILoadingProgress = function (value) {
        if (this.uiLoading != null) {
            this.uiLoading.setProgress(value);
        }
    };
    GameUIManager.prototype.OpenUIMainView = function (id) {
        if (id === void 0) { id = 0; }
        GameUIManager.Instance.openUIPanel(UIName.UIOther);
        if (this.uiMainView == null) {
            this.uiMainView = new view.MainView();
            GameConfig.uiResize(this.uiMainView.ui_top);
            GameConfig.uiResize(this.uiMainView.ui_left);
            GameConfig.uiResize(this.uiMainView.ui_right);
            GameConfig.uiResize(this.uiMainView.ui_bottom);
        }
        else {
            this.uiMainView.visible = true;
        }
        this.uiMainView.onShow(id);
        Laya.stage.addChild(this.uiMainView);
    };
    // 关闭主界面
    GameUIManager.prototype.ClosedUIMainView = function () {
        GameUIManager.Instance.removeUI(this.uiMainView);
        GameUIManager.Instance.removeUI(this.uiPanel);
    };
    // 关闭主界面
    GameUIManager.prototype.ClosedUILaodidng = function () {
        GameUIManager.Instance.removeUI(this.uiLoading);
        GameUIManager.Instance.removeUI(this.uiPanel);
    };
    GameUIManager.prototype.OpenUIGame1 = function (isclosedUIMain) {
        if (isclosedUIMain === void 0) { isclosedUIMain = false; }
        if (this.uiGame1 == null) {
            this.uiGame1 = new view.Game1();
        }
        else {
            this.uiGame1.visible = true;
        }
        this.uiGame1.onShow();
        Laya.stage.addChild(this.uiGame1);
        GameUIManager.Instance.openUIBattle();
        if (isclosedUIMain)
            this.ClosedUIMainView();
    };
    GameUIManager.prototype.OpenUIGame2 = function (isclosedUIMain) {
        if (isclosedUIMain === void 0) { isclosedUIMain = false; }
        if (this.uiGame2 == null) {
            this.uiGame2 = new view.Game2();
        }
        else {
            this.uiGame2.visible = true;
        }
        this.uiGame2.onShow();
        Laya.stage.addChild(this.uiGame2);
        GameUIManager.Instance.openUIBattle();
        if (isclosedUIMain)
            this.ClosedUIMainView();
    };
    GameUIManager.prototype.OpenUIGame3 = function (isclosedUIMain) {
        if (isclosedUIMain === void 0) { isclosedUIMain = false; }
        if (this.uiGame3 == null) {
            this.uiGame3 = new view.Game3();
        }
        else {
            this.uiGame3.visible = true;
        }
        this.uiGame3.onShow();
        Laya.stage.addChild(this.uiGame3);
        GameUIManager.Instance.openUIBattle();
        if (isclosedUIMain)
            this.ClosedUIMainView();
    };
    GameUIManager.prototype.OpenUIGame4 = function (isclosedUIMain) {
        if (isclosedUIMain === void 0) { isclosedUIMain = false; }
        if (this.uiGame4 == null) {
            this.uiGame4 = new view.Game4();
        }
        else {
            this.uiGame4.visible = true;
        }
        this.uiGame4.onShow();
        Laya.stage.addChild(this.uiGame4);
        GameUIManager.Instance.openUIBattle();
        if (isclosedUIMain)
            this.ClosedUIMainView();
    };
    GameUIManager.prototype.OpenUIGame5 = function (isclosedUIMain) {
        if (isclosedUIMain === void 0) { isclosedUIMain = false; }
        if (this.uiGame5 == null) {
            this.uiGame5 = new view.Game5();
        }
        else {
            this.uiGame5.visible = true;
        }
        this.uiGame5.onShow();
        Laya.stage.addChild(this.uiGame5);
        GameUIManager.Instance.openUIBattle();
        if (isclosedUIMain)
            this.ClosedUIMainView();
    };
    GameUIManager.prototype.OpenUIGame6 = function (isclosedUIMain) {
        if (isclosedUIMain === void 0) { isclosedUIMain = false; }
        if (this.uiGame6 == null) {
            this.uiGame6 = new view.Game6();
        }
        else {
            this.uiGame6.visible = true;
        }
        this.uiGame6.onShow();
        Laya.stage.addChild(this.uiGame6);
        GameUIManager.Instance.openUIBattle();
        if (isclosedUIMain)
            this.ClosedUIMainView();
    };
    // 永往直前
    GameUIManager.prototype.OpenUIGame7 = function (isclosedUIMain) {
        if (isclosedUIMain === void 0) { isclosedUIMain = false; }
        if (this.uiGame7 == null) {
            this.uiGame7 = new view.Game7();
        }
        else {
            this.uiGame7.visible = true;
        }
        this.uiGame7.onShow();
        Laya.stage.addChild(this.uiGame7);
        GameUIManager.Instance.openUIBattle();
        if (isclosedUIMain)
            this.ClosedUIMainView();
    };
    GameUIManager.prototype.OpenUIGame8 = function (isclosedUIMain) {
        if (isclosedUIMain === void 0) { isclosedUIMain = false; }
        if (this.uiGame8 == null) {
            this.uiGame8 = new view.Game8();
        }
        else {
            this.uiGame8.visible = true;
        }
        this.uiGame8.onShow();
        Laya.stage.addChild(this.uiGame8);
        GameUIManager.Instance.openUIBattle();
        if (isclosedUIMain)
            this.ClosedUIMainView();
    };
    GameUIManager.prototype.OpenUIGame9 = function (isclosedUIMain) {
        if (isclosedUIMain === void 0) { isclosedUIMain = false; }
        if (this.uiGame9 == null) {
            this.uiGame9 = new view.Game9();
        }
        else {
            this.uiGame9.visible = true;
        }
        this.uiGame9.onShow();
        Laya.stage.addChild(this.uiGame9);
        GameUIManager.Instance.openUIBattle();
        if (isclosedUIMain)
            this.ClosedUIMainView();
    };
    GameUIManager.prototype.OpenUITips = function (key, delay, color) {
        if (delay === void 0) { delay = 1000; }
        if (color === void 0) { color = "##000000"; }
        if (this.uiTips == null) {
            this.uiTips = new view.UITips();
        }
        else {
            this.uiTips.visible = true;
        }
        this.uiTips.onShow(key, delay, color);
        Laya.stage.addChild(this.uiTips);
    };
    GameUIManager.prototype.OpenUITryPlay = function (info) {
        if (this.uiTryPlay == null) {
            this.uiTryPlay = new view.UITryPlay();
            GameConfig.uiResize(this.uiTryPlay.ui_top);
        }
        else {
            this.uiTryPlay.visible = true;
        }
        this.uiTryPlay.onShow(info);
        Laya.stage.addChild(this.uiTryPlay);
    };
    GameUIManager.prototype.OpenUIRank = function (ranktype, type) {
        if (ranktype === void 0) { ranktype = RankType.Friend; }
        if (type === void 0) { type = 1; }
        GameUIManager.Instance.openUIPanel(UIName.UIRank);
        RankManager.Instance.OnGetRankInfosSucc();
        if (this.uiRank == null) {
            this.uiRank = new view.UIRank();
            GameConfig.uiResize(this.uiRank.ui_bottom);
            GameConfig.uiResize(this.uiRank.ui_top);
            GameConfig.uiResize(this.uiRank.ui_topleft);
        }
        else {
            this.uiRank.visible = true;
        }
        this.uiRank.onShow(ranktype, type);
        Laya.stage.addChild(this.uiRank);
    };
    GameUIManager.prototype.OpenUIResult = function (reviveTimes) {
        var id = ModelManager.Instance._CurId;
        var score = ModelManager.Instance._CurScore;
        if (this.uiResult == null) {
            this.uiResult = new view.UIResult();
            GameConfig.uiResize(this.uiResult.ui_bottom);
            GameConfig.uiResize(this.uiResult.ui_top);
        }
        else {
            this.uiResult.visible = true;
        }
        this.uiResult.onShow(id, score, reviveTimes);
        Laya.stage.addChild(this.uiResult);
    };
    GameUIManager.prototype.openUIBattle = function () {
        if (this.uiBattle == null) {
            this.uiBattle = new view.UIBattle();
            GameConfig.uiResize(this.uiBattle.ui_top);
            GameConfig.uiResize(this.uiBattle.ui_topleft);
        }
        else {
            this.uiBattle.visible = true;
        }
        this.uiBattle.onShow();
        Laya.stage.addChild(this.uiBattle);
    };
    GameUIManager.prototype.openUISkin = function () {
        GameUIManager.Instance.openUIPanel(UIName.UISkin);
        if (this.uiSkin == null) {
            this.uiSkin = new view.UISkin();
            GameConfig.uiResize(this.uiSkin.ui_bottom);
            GameConfig.uiResize(this.uiSkin.ui_top);
            GameConfig.uiResize(this.uiSkin.ui_top_left);
        }
        else {
            this.uiSkin.visible = true;
        }
        this.uiSkin.onShow();
        Laya.stage.addChild(this.uiSkin);
    };
    GameUIManager.prototype.removeUI = function (view, isOpenUIMain, isgameui) {
        if (isOpenUIMain === void 0) { isOpenUIMain = false; }
        if (isgameui === void 0) { isgameui = false; }
        if (isOpenUIMain) {
            this.OpenUIMainView(ModelManager.Instance._CurId);
        }
        if (view != null) {
            if (view == this.uiTryPlay) {
                this.uiTryPlay.onClosed();
            }
            else if (view == this.uiBattle) {
                this.uiBattle.onClosed();
            }
            else if (view == this.uiMainView) {
                this.uiMainView.onClosed();
            }
            else if (view == this.uiRank) {
                this.uiRank.onClosed();
            }
            else if (view == this.uiSkin) {
                this.uiSkin.onClosed();
            }
            else if (view == this.uiResult) {
                this.uiResult.onClosed();
            }
            view.visible = false;
            Laya.stage.removeChild(view);
            if (isgameui) // 避免game初始化了，所以直接销毁吧
             {
                view.destroy(true);
                if (view == this.uiGame1) {
                    this.uiGame1.onClosed();
                    this.uiGame1 = null;
                }
                else if (view == this.uiGame2) {
                    this.uiGame2.onClosed();
                    this.uiGame2 = null;
                }
                else if (view == this.uiGame3) {
                    this.uiGame3.onClosed();
                    this.uiGame3 = null;
                }
                else if (view == this.uiGame4) {
                    this.uiGame4.onClosed();
                    this.uiGame4 = null;
                }
                else if (view == this.uiGame5) {
                    this.uiGame5.onClosed();
                    this.uiGame5 = null;
                }
                else if (view == this.uiGame6) {
                    this.uiGame6.onClosed();
                }
                else if (view == this.uiGame7) {
                    this.uiGame7.onClosed();
                    this.uiGame7 = null;
                }
                else if (view == this.uiGame8) {
                    this.uiGame8.onClosed();
                    this.uiGame8 = null;
                }
                else if (view == this.uiGame9) {
                    this.uiGame9.onClosed();
                    this.uiGame9 = null;
                }
            }
        }
    };
    return GameUIManager;
}(Singleton));
//# sourceMappingURL=GameUIManager.js.map