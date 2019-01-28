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
var ConstDataManager = /** @class */ (function (_super) {
    __extends(ConstDataManager, _super);
    function ConstDataManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //---------------instance end---------------------------------------------------
        _this._ConstDatas = new Dictionary();
        return _this;
    }
    Object.defineProperty(ConstDataManager, "Instance", {
        //---------------instance begin----------------------------------------------------
        get: function () {
            if (!this._instance) {
                this._instance = new ConstDataManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ConstDataManager.prototype.InitConf = function (func) {
        var _this = this;
        ConfigManager.Instance.LoadConf("Const", function (jsonObj) {
            _this.OnParseConf(jsonObj, func);
            if (func != null) {
                Debuger.Log("1.读取 Const.json Succ");
                func();
            }
        });
    };
    ConstDataManager.prototype.OnParseConf = function (jsonObj, func) {
        this._ConstDatas.Clear();
        for (var index in jsonObj) {
            var data = jsonObj[index];
            this._ConstDatas.Add(data.key, data);
        }
    };
    ConstDataManager.prototype.GetIntValue = function (key, v) {
        var data = this._ConstDatas.TryGetValue(key);
        if (data != null) {
            return ClientTools.StrToInt(data.value);
        }
        return v;
    };
    ConstDataManager.prototype.GetFloatValue = function (key, v) {
        var data = this._ConstDatas.TryGetValue(key);
        if (data != null) {
            return ClientTools.StrToFloat(data.value);
        }
        return v;
    };
    ConstDataManager.prototype.GetValue = function (key, v) {
        var data = this._ConstDatas.TryGetValue(key);
        if (data != null)
            return data.value;
        return v;
    };
    return ConstDataManager;
}(Singleton));
var ConstData = /** @class */ (function () {
    function ConstData() {
    }
    return ConstData;
}());
//# sourceMappingURL=ConstDataManager.js.map