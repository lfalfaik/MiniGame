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
    var UIResult = /** @class */ (function (_super) {
        __extends(UIResult, _super);
        function UIResult() {
            return _super.call(this) || this;
        }
        UIResult.prototype.onShow = function (id, score, reviveTimes) {
            MusicManager.Instance.playSound(StringDefine.SOUND_GAMEOVER);
            ClientEventManager.Instance.Event(ClientEvent.ON_GAME_PAUSE);
            var info = ModelManager.Instance.GetInfoById(id);
            if (info != null && info._isOpen == true)
                ModelManager.Instance.OnUpdataInfo(id, info._isOpen, score);
            this._Info = new ModelInfo(id, true, score);
            this._scoreLab = this.lab_score;
            this._playerNameLab = this.player_lab;
            this._playerScoreLab = this.player_score;
            this._playerHeadIamg = this.player_tex;
            this._playBox = this.friend;
            this.btn_replay.on(Laya.Event.CLICK, this, this.OnTryPlayBtnClick);
            this.btn_return.on(Laya.Event.CLICK, this, this.OnReturnBtnClick);
            this.btn_watchvideo.on(Laya.Event.CLICK, this, this.OnWhatTVBtnClick);
            this.SetData();
            this.btn_watchvideo.visible = reviveTimes < 1 ? true : false;
        };
        // 关闭界面
        UIResult.prototype.onClosed = function () {
        };
        UIResult.prototype.SetData = function () {
            if (this._Info == null)
                return;
            UITools.SetLab(this._scoreLab, this._Info._score);
            var friend = ModelManager.Instance.GetNearFriendInfo();
            UITools.SetActive(this._playBox, friend != null);
            if (friend != null) {
                UITools.SetLab(this._playerNameLab, friend._name);
                UITools.SetLab(this._playerScoreLab, friend._score);
                if (this._playerHeadIamg != null)
                    this._playerHeadIamg.skin = "headIcon/" + friend._tex + ".png";
            }
        };
        UIResult.prototype.OnReturnBtnClick = function () {
            GameUIManager.Instance.removeUI(this);
            ClientEventManager.Instance.Event(ClientEvent.ON_GAME_OVER);
        };
        UIResult.prototype.OnTryPlayBtnClick = function () {
            GameUIManager.Instance.removeUI(this);
            ClientEventManager.Instance.Event(ClientEvent.ON_GAME_TRYPLAY);
        };
        UIResult.prototype.OnWhatTVBtnClick = function () {
            GameUIManager.Instance.removeUI(this);
            ClientEventManager.Instance.Event(ClientEvent.ON_GAME_CONTINUE);
        };
        return UIResult;
    }(ui.UIResultUI));
    view.UIResult = UIResult;
})(view || (view = {}));
//# sourceMappingURL=UIResult.js.map