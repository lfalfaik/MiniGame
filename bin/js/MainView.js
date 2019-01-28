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
(function (view_1) {
    var MainView = /** @class */ (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            var _this = _super.call(this) || this;
            _this.game1.once(Laya.Event.CLICK, _this, _this.ShowGame1);
            _this.game2.once(Laya.Event.CLICK, _this, _this.ShowGame2);
            return _this;
        }
        MainView.prototype.Show = function () {
        };
        MainView.prototype.ShowGame1 = function () {
            var view = new view_1.Game1();
            Laya.stage.addChild(view);
            view.Show();
            this.removeSelf();
        };
        MainView.prototype.ShowGame2 = function () {
            var info = new ModelInfo(1, false, 1);
            GameUIManager.Instance.OpenUITryPlay(info);
        };
        return MainView;
    }(ui.MainViewUI));
    view_1.MainView = MainView;
})(view || (view = {}));
//# sourceMappingURL=MainView.js.map