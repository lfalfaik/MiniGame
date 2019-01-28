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
var ConfigManager = /** @class */ (function (_super) {
    __extends(ConfigManager, _super);
    function ConfigManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //---------------instance end----------------------------------------------------
        _this._loadNum = 0;
        _this._totalNum = 0;
        _this._loadFunc = null;
        return _this;
    }
    Object.defineProperty(ConfigManager, "Instance", {
        //---------------instance begin----------------------------------------------------
        get: function () {
            if (!this._instance) {
                this._instance = new ConfigManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ConfigManager.prototype.InitConfig = function (func) {
        var _this = this;
        this._loadFunc = func;
        this._loadNum = 0;
        this._totalNum = 5; //所有的配置文件数量
        {
            ConstDataManager.Instance.InitConf(function () {
                _this.OnLoadOnConf();
            });
            StringManager.Instance.InitConf(function () {
                _this.OnLoadOnConf();
            });
            SkinManager.Instance.InitConf(function () {
                _this.OnLoadOnConf();
            });
            ModelManager.Instance.InitConf(function () {
                _this.OnLoadOnConf();
            });
            NameManager.Instance.InitConf(function () {
                _this.OnLoadOnConf();
            });
        }
    };
    ConfigManager.prototype.OnLoadOnConf = function () {
        this._loadNum = this._loadNum + 1;
        var loadFinish = this._loadNum >= this._totalNum;
        if (loadFinish) {
            if (this._loadFunc != null) {
                this._loadFunc();
                this._loadFunc = null;
            }
        }
    };
    ConfigManager.prototype.GetConfigBasePath = function () {
        return "res/conf/";
    };
    ConfigManager.prototype.LoadConf = function (path, func) {
        if (func == null) {
            return;
        }
        var finalPath = this.GetConfigBasePath() + path + ".json";
        //验证是否有
        //加载
        Laya.loader.load(finalPath, Laya.Handler.create(this, function () {
            var json = Laya.loader.getRes(finalPath);
            if (json == null) {
                Debuger.LogError("config:" + path + "is null");
                return;
            }
            if (func != null) {
                func(json);
            }
        }));
    };
    return ConfigManager;
}(Singleton));
//# sourceMappingURL=ConfigManager.js.map