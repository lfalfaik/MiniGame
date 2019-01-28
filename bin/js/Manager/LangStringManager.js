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
var StringManager = /** @class */ (function (_super) {
    __extends(StringManager, _super);
    function StringManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //---------------instance end----------------------------------------------------
        _this._configs = new Dictionary();
        return _this;
    }
    Object.defineProperty(StringManager, "Instance", {
        //---------------instance begin----------------------------------------------------
        get: function () {
            if (!this._instance) {
                this._instance = new StringManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    StringManager.prototype.InitConf = function (func) {
        var _this = this;
        ConfigManager.Instance.LoadConf("LangString", function (jsonObj) {
            _this.OnParseConf(jsonObj, func);
            if (func != null) {
                Debuger.Log("2.读取 LangString.json Succ");
                func();
            }
        });
    };
    StringManager.prototype.OnParseConf = function (jsonObj, func) {
        this._configs.Clear();
        for (var index in jsonObj) {
            var data = jsonObj[index];
            this._configs.Add(data.id, data);
        }
    };
    StringManager.prototype.GetValue = function (key) {
        var data = this._configs.TryGetValue(key);
        if (data != null)
            return data.chinese;
        return key;
    };
    return StringManager;
}(Singleton));
var LangStringData = /** @class */ (function () {
    function LangStringData() {
    }
    return LangStringData;
}());
//# sourceMappingURL=LangStringManager.js.map