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
    var MainView = /** @class */ (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            var _this = _super.call(this) || this;
            _this._selectIndex = 0;
            _this._curInfo = null;
            _this._MusicIndex = -1;
            _this._list = ModelManager.Instance._Infos;
            _this.lab_score.font = "font_red";
            return _this;
        }
        MainView.prototype.onShow = function (id) {
            this._selectIndex = -1;
            this._curInfo = null;
            this._list = ModelManager.Instance.GetInfos();
            this.btn_music.on(Laya.Event.CLICK, this, this.OnMusciBtnClick);
            this.btn_shengxiao.on(Laya.Event.CLICK, this, this.OnShengXiaoBtnClick);
            this.btn_rank.on(Laya.Event.CLICK, this, this.OnRankBtnClick);
            this.btn_share.on(Laya.Event.CLICK, this, this.OnShareBtnClick);
            this.btn_shengxiao.visible = false;
            this.btn_left.on(Laya.Event.CLICK, this, this.OnLeftBtnClick);
            this.btn_right.on(Laya.Event.CLICK, this, this.OnRightBtnClick);
            this.btn_gamestart.on(Laya.Event.CLICK, this, this.OnGameStartBtnClick);
            this.btn_tryplay.on(Laya.Event.CLICK, this, this.OnTryPlayBtnClick);
            ClientEventManager.Instance.On(ClientEvent.UPDATE_MODELINFO, this, this.OnUpdataItem);
            ClientEventManager.Instance.On(ClientEvent.ON_SETMUSICSUCC, this, this.SetMusic);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_SHARE_SUCC, this, this.OnGameShareSucc);
            var index = ModelManager.Instance.GetIndexById(id);
            if (index <= -1)
                index = 0;
            this.SetIndex(index);
            this.SetMusic();
        };
        MainView.prototype.onClosed = function () {
            ClientEventManager.Instance.Off(ClientEvent.UPDATE_MODELINFO, this, this.OnUpdataItem);
            ClientEventManager.Instance.Off(ClientEvent.ON_SETMUSICSUCC, this, this.SetMusic);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_SHARE_SUCC, this, this.OnGameShareSucc);
        };
        MainView.prototype.SetMusic = function () {
            this._MusicIndex = MusicManager.Instance.GetIndexByMusicName(SetManager.Instance.GetMusicName());
            var musicname = SetManager.Instance.GetMusicName();
            var musicopen = true;
            if (musicname == null || musicname == "")
                musicopen = false;
            //UITools.SetActive(this.music_open,musicopen == true);
            UITools.SetActive(this.music_open, false); // 默认只播放一首音乐了。所以不需要显示index了
            UITools.SetActive(this.music_closed, musicopen == false);
            if (musicopen) {
                UITools.SetLab(this.music_soundvaluelab, this._MusicIndex);
            }
        };
        MainView.prototype.OnUpdataItem = function (id) {
            //let index:number  = ModelManager.Instance.GetIndexById(id);// 索引
            //if(this._selectIndex == index)
            {
                this.SetIndex(this._selectIndex);
            }
        };
        MainView.prototype.onPlayGame = function (id) {
            var data = ModelManager.Instance.GetDataById(id);
            if (data == null)
                return;
            ModelManager.Instance.SetCurId(data.id);
            ModelManager.Instance._CurScore = 0;
            var isclosed = true;
            if (data.type == 1)
                GameUIManager.Instance.OpenUIGame1(true);
            else if (data.type == 2)
                GameUIManager.Instance.OpenUIGame2(true);
            else if (data.type == 3)
                GameUIManager.Instance.OpenUIGame3(true);
            else if (data.type == 4)
                GameUIManager.Instance.OpenUIGame4(true);
            else if (data.type == 5)
                GameUIManager.Instance.OpenUIGame5(true);
            else if (data.type == 6)
                GameUIManager.Instance.OpenUIGame6(true);
            else if (data.type == 7)
                GameUIManager.Instance.OpenUIGame7(true);
            else if (data.type == 8)
                GameUIManager.Instance.OpenUIGame8(true);
            else if (data.type == 9)
                GameUIManager.Instance.OpenUIGame9(true);
            else {
                isclosed = false;
            }
            if (isclosed)
                GameUIManager.Instance.ClosedUIMainView();
        };
        MainView.prototype.OnGameStartBtnClick = function (info) {
            if (this._curInfo == null || this._curInfo._isOpen == false)
                return;
            this.onPlayGame(this._curInfo._id);
        };
        MainView.prototype.OnTryPlayBtnClick = function () {
            if (this._curInfo == null || this._curInfo._isOpen == true)
                return;
            GameUIManager.Instance.OpenUITryPlay(this._curInfo);
        };
        MainView.prototype.OnShengXiaoBtnClick = function () {
            GameUIManager.Instance.openUISkin();
        };
        MainView.prototype.OnMusciBtnClick = function () {
            var list = MusicManager.Instance._MusicDatas;
            if (this._MusicIndex >= 0 && this._MusicIndex < list.length - 1) {
                this._MusicIndex++;
            }
            else if (this._MusicIndex == list.length - 1) {
                this._MusicIndex = 0;
            }
            SetManager.Instance.SetMusic(MusicManager.Instance.GetMusicNameByIndex(this._MusicIndex));
        };
        MainView.prototype.OnRankBtnClick = function () {
            GameUIManager.Instance.OpenUIRank();
        };
        MainView.prototype.OnShareBtnClick = function () {
            PlatformManager.Instance.UIShare(1);
        };
        MainView.prototype.OnLeftBtnClick = function () {
            this.PLayAnim(true);
        };
        MainView.prototype.OnRightBtnClick = function () {
            this.PLayAnim(false);
        };
        MainView.prototype.PLayAnim = function (isleft) {
            if (this._list == null || this._list.length == 0) {
                //UITools.SetActive(this.btn_left,false);
                //UITools.SetActive(this.btn_right,false);
                return;
            }
            if (isleft) {
                if (this._selectIndex <= 0)
                    this._selectIndex = this._list.length - 1;
                else
                    this._selectIndex--;
            }
            else {
                if (this._selectIndex >= this._list.length - 1)
                    this._selectIndex = 0;
                else
                    this._selectIndex++;
            }
            this.SetIndex(this._selectIndex);
        };
        MainView.prototype.SetIndex = function (index) {
            this._selectIndex = index;
            this._curInfo = ModelManager.Instance.GetInfoByIndex(this._selectIndex);
            ModelManager.Instance.SetCurId(this._curInfo._id);
            this.SetData();
            //UITools.SetActive(this.btn_left,this._selectIndex > 0);
            //UITools.SetActive(this.btn_right,this._selectIndex < this._list.length -1);
        };
        MainView.prototype.SetData = function () {
            if (this._curInfo == null) {
                Debuger.Log("modele 没有数据啊");
                return;
            }
            if (this.lab_name != null) {
                this.lab_name.skin = ClientTools.GetModelNameById(this._curInfo._id);
            }
            if (this._curInfo._score == 0) {
                UITools.SetActive(this.lab_score, false);
                UITools.SetActive(this.score_bg, false);
            }
            else {
                UITools.SetActive(this.lab_score, true);
                UITools.SetActive(this.score_bg, true);
                UITools.SetLab(this.lab_score, this._curInfo._score);
            }
            UITools.SetActive(this.btn_gamestart, this._curInfo._isOpen);
            UITools.SetActive(this.btn_tryplay, this._curInfo._isOpen == false);
            UITools.SetActive(this.lock, this._curInfo._isOpen == false);
            UITools.SetActive(this.lockTex, this._curInfo._isOpen == false);
            this.onPlayAnim();
        };
        MainView.prototype.GetAnimPath = function () {
            return ["tongyong/changjingbg.png", "tongyong/changjingbg.png"];
        };
        MainView.prototype.onPlayAnim = function () {
            if (this._Anim != null)
                this._Anim.removeSelf();
            Laya.Animation.createFrames(this.GetAnimPath(), "Anim");
            this._Anim = new Laya.Animation;
            this.animPos.addChild(this._Anim);
            //设置精灵的位置
            this._Anim.pos(0, 0);
            this._Anim.interval = 1000;
            //加载动画图集，加载成功后执行回调方法
            this._Anim.play(0, true, "Anim");
        };
        MainView.prototype.OnGameShareSucc = function (id) {
            this.onPlayGame(id);
        };
        return MainView;
    }(ui.MainViewUI));
    view.MainView = MainView;
})(view || (view = {}));
//# sourceMappingURL=MainView.js.map