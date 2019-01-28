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
    var UILoading = /** @class */ (function (_super) {
        __extends(UILoading, _super);
        function UILoading() {
            var _this = _super.call(this) || this;
            _this._maxWidth = 504;
            _this._oneValue = 0;
            _this.onShow();
            UITools.SetActive(_this.star, false);
            return _this;
        }
        UILoading.prototype.onShow = function () {
            this._maxWidth = 504;
            this._slider = this.slider;
            this._lab = this.lab_value;
            this._oneValue = this._maxWidth / 100; // 一份有多少
        };
        UILoading.prototype.setProgress = function (value) {
            this._lab.text = "Loading " + Math.floor(value * 100) + "%";
            if (this._slider != null) {
                var w = this._oneValue * Math.floor(value * 100);
                this._slider.width = w;
                if (this._slider.width >= this._maxWidth) {
                    this._slider.width = this._maxWidth;
                }
            }
        };
        return UILoading;
    }(ui.UILoadingUI));
    view.UILoading = UILoading;
})(view || (view = {}));
//# sourceMappingURL=UILoading.js.map