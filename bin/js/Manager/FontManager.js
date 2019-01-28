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
var FontManager = /** @class */ (function (_super) {
    __extends(FontManager, _super);
    function FontManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FontManager, "Instance", {
        //---------------instance begin----------------------------------------------------
        get: function () {
            if (!this._instance) {
                this._instance = new FontManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return FontManager;
}(Singleton));
//# sourceMappingURL=FontManager.js.map