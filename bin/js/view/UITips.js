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
    var UITips = /** @class */ (function (_super) {
        __extends(UITips, _super);
        function UITips() {
            var _this = _super.call(this) || this;
            _this.txt = _this.lab;
            _this.bg = _this.item;
            _this.posX = Laya.stage.width * 0.5;
            _this.posY = Laya.stage.height * 0.5;
            return _this;
        }
        UITips.prototype.onClosed = function () {
            this.txt.text = "";
        };
        UITips.prototype.onShow = function (key, delay, color) {
            if (delay === void 0) { delay = 1000; }
            var str = StringManager.Instance.GetValue(key);
            this.setTips(str, delay, color);
        };
        UITips.prototype.setTips = function (str, delay, color) {
            if (str == null || str == "") {
                return;
            }
            Laya.Tween.clearTween(this);
            this.txt.text = str;
            this.txt.color = color;
            this.bg.size(this.txt.textField.textWidth + 80, this.txt.textField.textHeight + 40);
            this.pos(this.posX, this.posY);
            this.alpha = 1;
            Laya.Tween.to(this, { y: this.posX - 50 }, delay, null, Laya.Handler.create(this, this.onclosedthis));
        };
        UITips.prototype.onclosedthis = function () {
            GameUIManager.Instance.removeUI(this);
        };
        return UITips;
    }(ui.UITipsUI));
    view.UITips = UITips;
})(view || (view = {}));
//# sourceMappingURL=UITips.js.map