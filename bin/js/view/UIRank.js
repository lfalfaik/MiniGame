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
/*
* name;
*/
var view;
(function (view) {
    var UIRank = /** @class */ (function (_super) {
        __extends(UIRank, _super);
        function UIRank() {
            var _this = _super.call(this) || this;
            _this._colorHei = "#000000";
            _this._colorBai = "#ffffff";
            return _this;
        }
        // 关闭界面
        UIRank.prototype.onClosed = function () {
        };
        UIRank.prototype.onClear = function () {
            this._colorHei = "#000000";
            this._colorBai = "#ffffff";
            this._leftType = 0;
            this._FriendOrWorldType = RankType.Friend;
        };
        // 打开界面-初始化
        UIRank.prototype.onShow = function (ranktype, type) {
            if (ranktype === void 0) { ranktype = RankType.Friend; }
            if (type === void 0) { type = 1; }
            this.onClear();
            this._topTab = this.topBtns;
            this._scrollview = this.scollview;
            this._leftscrollview = this.leftbtns;
            this.btn_friend.on(Laya.Event.CLICK, this, this.OnFriendBtnClick);
            this.btn_world.on(Laya.Event.CLICK, this, this.OnWorldBtnClick);
            this.btn_return.on(Laya.Event.CLICK, this, this.OnClosedBtnClick);
            this.InitLeftBtns();
            this.SetTopType(ranktype, false);
            this.SetType(type, false);
            this.PlayLeftAnim();
            this.PlayTopAnim();
            this.SetItems();
        };
        UIRank.prototype.InitLeftBtns = function () {
            var list = ModelManager.Instance._Infos;
            if (this._leftscrollview == null)
                return;
            this._leftscrollview.repeatX = 1;
            this._leftscrollview.repeatY = 10;
            this._leftscrollview.spaceY = 10;
            this._leftscrollview.selectEnable = true;
            this._leftscrollview.vScrollBarSkin = ""; // 使用但隐藏滚动条
            this._leftscrollview.array = list;
            this._leftscrollview.renderHandler = new Laya.Handler(this, this.onLetBtnsRender);
            //监听列表 
            this._leftscrollview.selectEnable = true;
            this._leftscrollview.selectHandler = Laya.Handler.create(this, this.onSelect, null, false);
            this._leftscrollview.scrollTo(0);
        };
        UIRank.prototype.onSelect = function (index) {
            MusicManager.Instance.playSound(StringDefine.SOUND_CLICKBTN);
            var info = ModelManager.Instance.GetInfoByIndex(index);
            if (info == null)
                return;
            var tempData = ModelManager.Instance.GetDataById(info._id);
            if (tempData == null)
                return;
            this.SetType(tempData.type);
        };
        UIRank.prototype.onLetBtnsRender = function (cell, index) {
            var info = ModelManager.Instance.GetInfoByIndex(index);
            if (info == null)
                return;
            var tempData = ModelManager.Instance.GetDataById(info._id);
            if (tempData == null)
                return;
            // cell.on(laya.events.Event.CLICK, this,
            // function(){
            //      this.SetType(tempData.type);   
            // }    
            // );
            var click = cell.getChildByName("click_bg");
            var Lab1 = cell.getChildByName("lab_normal");
            var clicklab = cell.getChildByName("click_lab");
            var isclick = index == this._leftType - 1;
            if (isclick) {
                UITools.SetActive(click, true);
                UITools.SetActive(clicklab, true);
                UITools.SetActive(Lab1, false);
            }
            else {
                UITools.SetActive(click, false);
                UITools.SetActive(clicklab, false);
                UITools.SetActive(Lab1, true);
            }
            UITools.SetImage(Lab1, ClientTools.GetModelNameById(info._id));
            UITools.SetImage(clicklab, ClientTools.GetModelNameById(info._id, true));
        };
        UIRank.prototype.SetItems = function () {
            if (this._scrollview == null)
                return;
            var list = new Array();
            var rankinfos = RankManager.Instance.GetRankInfosByType(this._FriendOrWorldType, this._leftType);
            if (rankinfos != null && rankinfos._list != null)
                list = rankinfos._list;
            if (rankinfos == null)
                // this._scrollview.repeatX = 1;
                //this._scrollview.repeatY = 13;
                this._scrollview.selectEnable = true;
            this._scrollview.vScrollBarSkin = ""; // 使用但隐藏滚动条
            this._scrollview.array = list;
            this._scrollview.renderHandler = new Laya.Handler(this, this.onListRender);
            this._scrollview.scrollTo(0);
            var myInfo = null;
            if (rankinfos != null && rankinfos._myRank != null)
                myInfo = rankinfos._myRank;
            UITools.SetActive(this.myRank, myInfo != null);
            if (myInfo != null) {
                UITools.SetLab(this.lab_myname, myInfo._playerName);
                UITools.SetLab(this.lab_myrank, myInfo._rank);
                UITools.SetLab(this.lab_myscore, myInfo._score);
            }
        };
        UIRank.prototype.onListRender = function (cell, index) {
            var info = RankManager.Instance.GetRankInfoByTypeAndIndex(this._FriendOrWorldType, this._leftType, index);
            if (info == null)
                return;
            var bg1 = cell.getChildByName("1");
            var bgme = cell.getChildByName("me");
            var rankLab = cell.getChildByName("lab_rank");
            var nameLab = cell.getChildByName("lab_name");
            var scoreLab = cell.getChildByName("lab_score");
            UITools.SetLab(rankLab, info._rank);
            UITools.SetLab(nameLab, info._playerName);
            UITools.SetLab(scoreLab, info._score);
            var e = index % 2;
            if (info.IsMe()) {
                UITools.SetActive(bg1, false);
                UITools.SetActive(bgme, true);
            }
            else {
                UITools.SetActive(bg1, e == 0);
                UITools.SetActive(bgme, false);
            }
            if (info.IsMe()) {
                rankLab.color = this._colorHei;
                nameLab.color = this._colorHei;
                scoreLab.color = this._colorHei;
            }
            else {
                rankLab.color = this._colorBai;
                nameLab.color = this._colorBai;
                scoreLab.color = this._colorBai;
            }
        };
        UIRank.prototype.SetTopType = function (type, ispushui) {
            if (ispushui === void 0) { ispushui = true; }
            if (this._FriendOrWorldType == type)
                return;
            this._FriendOrWorldType = type;
            if (ispushui) {
                this.PlayTopAnim();
                this.SetItems();
            }
        };
        // 10个游戏类型
        UIRank.prototype.SetType = function (type, ispushui) {
            if (ispushui === void 0) { ispushui = true; }
            if (this._leftType == type)
                return;
            this._leftType = type;
            if (ispushui) {
                this.PlayLeftAnim();
                this.SetItems();
            }
        };
        UIRank.prototype.PlayTopAnim = function () {
            if (this._topTab != null) {
                for (var i = 0; i < this._topTab._childs.length; i++) {
                    if (i == this._FriendOrWorldType - 1)
                        this._topTab._childs[i].skin = "tongyong/anniu_1.png";
                    else
                        this._topTab._childs[i].skin = "tongyong/anniu_1_select.png";
                }
            }
        };
        UIRank.prototype.PlayLeftAnim = function () {
            if (this._leftscrollview != null) {
                for (var i = 0; i < this._leftscrollview.cells.length; i++) {
                    var click = this._leftscrollview.cells[i].getChildByName("click_bg");
                    var clicklab = this._leftscrollview.cells[i].getChildByName("click_lab");
                    var normal = this._leftscrollview.cells[i].getChildByName("lab_normal");
                    var isclick = i == this._leftType - 1;
                    if (isclick) {
                        UITools.SetActive(click, true);
                        UITools.SetActive(clicklab, true);
                        UITools.SetActive(normal, false);
                    }
                    else {
                        UITools.SetActive(click, false);
                        UITools.SetActive(clicklab, false);
                        UITools.SetActive(normal, true);
                    }
                }
            }
        };
        UIRank.prototype.OnFriendBtnClick = function () {
            this.SetTopType(RankType.Friend);
        };
        UIRank.prototype.OnWorldBtnClick = function () {
            this.SetTopType(RankType.World);
        };
        UIRank.prototype.OnClosedBtnClick = function () {
            GameUIManager.Instance.removeUI(this, true);
        };
        return UIRank;
    }(ui.UIRankUI));
    view.UIRank = UIRank;
})(view || (view = {}));
//# sourceMappingURL=UIRank.js.map