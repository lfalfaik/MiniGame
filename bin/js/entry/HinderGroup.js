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
var HinderGroup = /** @class */ (function (_super) {
    __extends(HinderGroup, _super);
    function HinderGroup() {
        var _this = _super.call(this) || this;
        _this.leastHeight = 100;
        return _this;
    }
    HinderGroup.prototype.init = function (isDynamic) {
        this.isDynamic = isDynamic;
        this.isUp = Math.random() <= 0.5 ? true : false;
    };
    return HinderGroup;
}(Laya.Sprite));
//# sourceMappingURL=HinderGroup.js.map