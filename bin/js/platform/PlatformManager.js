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
* 平台管理器;
*/
var PlatformManager = /** @class */ (function (_super) {
    __extends(PlatformManager, _super);
    function PlatformManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //---------------instance end----------------------------------------------------
        _this._curPlatform = null;
        return _this;
    }
    Object.defineProperty(PlatformManager, "Instance", {
        //---------------instance begin----------------------------------------------------
        get: function () {
            if (!this._instance) {
                this._instance = new PlatformManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    PlatformManager.prototype.InitPlatform = function () {
        //需要根据配置加载对应的平台
        var initData = new PingTaiData(ConstDataManager.Instance.GetValue("pingtai", "wechat"));
        var str = "";
        if (initData != null) {
            str = initData.name;
        }
        switch (str) {
            case "wechat":
                {
                    this._curPlatform = new WechatPlatform();
                }
                break;
            case "web":
            default:
                {
                    this._curPlatform = new WebPlatform();
                }
                break;
        }
    };
    //---------------相册 begin----------------------------------------------------
    PlatformManager.prototype.ChooseImg = function (func) {
        if (this._curPlatform != null) {
            this._curPlatform.ChooseImg(func);
        }
    };
    PlatformManager.prototype.ReadImg = function (path, func) {
        if (this._curPlatform != null) {
            this._curPlatform.ReadImg(path, func);
        }
    };
    //---------------相册 end----------------------------------------------------
    //截屏
    PlatformManager.prototype.SaveScreenToPhoto = function (func) {
        if (this._curPlatform != null) {
            this._curPlatform.SaveScreenToPhoto(func);
        }
    };
    PlatformManager.prototype.OnSaveScreenToPhoto = function (witdh, height, offsetX, offsetY, func) {
        if (this._curPlatform != null) {
            this._curPlatform.OnSaveScreenToPhoto(witdh, height, offsetX, offsetY, func);
        }
    };
    //分享
    PlatformManager.prototype.UIShare = function (shareType, succfunc, losefunc) {
        if (succfunc === void 0) { succfunc = null; }
        if (losefunc === void 0) { losefunc = null; }
        if (this._curPlatform != null) {
            this._curPlatform.UIShare(shareType, succfunc, losefunc);
        }
    };
    return PlatformManager;
}(Singleton));
var PingTaiData = /** @class */ (function () {
    function PingTaiData(str) {
        this.name = str;
    }
    return PingTaiData;
}());
//# sourceMappingURL=PlatformManager.js.map