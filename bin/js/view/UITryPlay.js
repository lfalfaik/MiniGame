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
    var UITryPlay = /** @class */ (function (_super) {
        __extends(UITryPlay, _super);
        function UITryPlay() {
            var _this = _super.call(this) || this;
            _this._DescLab = _this.lab_desc;
            _this.btn_share.on(Laya.Event.CLICK, _this, _this.OnShareBtnClick);
            _this.btn_ad.on(Laya.Event.CLICK, _this, _this.OnAdBtnClick);
            _this.btn_closed.on(Laya.Event.CLICK, _this, _this.OnClosedBtnClick);
            return _this;
        }
        // 关闭界面
        UITryPlay.prototype.onClosed = function () {
        };
        // 打开界面-初始化
        UITryPlay.prototype.onShow = function (info) {
            this._Info = info;
            this.SetData();
        };
        UITryPlay.prototype.SetData = function () {
            UITools.SetLab(this._DescLab, ModelManager.Instance.GetJieSuoTiaoJian(this._Info));
        };
        UITryPlay.prototype.OnShareBtnClick = function () {
            if (this._Info == null)
                return;
            PlatformManager.Instance.UIShare(1, this.onShareSucc);
        };
        UITryPlay.prototype.onShareSucc = function () {
            if (GameUIManager.Instance.uiTryPlay != null && GameUIManager.Instance.uiTryPlay.visible == true) {
                if (GameUIManager.Instance.uiTryPlay._Info == null)
                    return;
                ClientEventManager.Instance.Event(ClientEvent.ON_GAME_SHARE_SUCC, GameUIManager.Instance.uiTryPlay._Info._id);
                GameUIManager.Instance.removeUI(GameUIManager.Instance.uiTryPlay);
            }
        };
        UITryPlay.prototype.OnAdBtnClick = function () {
            if (this._Info == null || this._Info._isOpen == true)
                return;
            ModelManager.Instance.OnUpdataInfo(this._Info._id, true, 0);
            GameUIManager.Instance.removeUI(this);
        };
        UITryPlay.prototype.OnClosedBtnClick = function () {
            GameUIManager.Instance.removeUI(this);
        };
        return UITryPlay;
    }(ui.UITryPlayUI));
    view.UITryPlay = UITryPlay;
})(view || (view = {}));
//# sourceMappingURL=UITryPlay.js.map