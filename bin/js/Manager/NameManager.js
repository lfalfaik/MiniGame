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
var NameManager = /** @class */ (function (_super) {
    __extends(NameManager, _super);
    function NameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //---------------instance end----------------------------------------------------
        _this._configs = new Dictionary();
        return _this;
    }
    Object.defineProperty(NameManager, "Instance", {
        //---------------instance begin----------------------------------------------------
        get: function () {
            if (!this._instance) {
                this._instance = new NameManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    NameManager.prototype.InitConf = function (func) {
        var _this = this;
        ConfigManager.Instance.LoadConf("name", function (jsonObj) {
            _this.OnParseConf(jsonObj, func);
            if (func != null) {
                Debuger.Log("2.读取 name.json Succ");
                func();
            }
        });
    };
    NameManager.prototype.OnParseConf = function (jsonObj, func) {
        this._configs.Clear();
        for (var index in jsonObj) {
            var data = jsonObj[index];
            this._configs.Add(data.id, data);
        }
    };
    NameManager.prototype.GetValue = function (id) {
        return this._configs.TryGetValue(id);
    };
    return NameManager;
}(Singleton));
var NameData = /** @class */ (function () {
    function NameData() {
    }
    return NameData;
}());
//# sourceMappingURL=NameManager.js.map