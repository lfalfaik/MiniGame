/*
* 网页平台;
*/
var WebPlatform = /** @class */ (function () {
    function WebPlatform() {
        this._curstomImg = "";
    }
    WebPlatform.prototype.ChooseImg = function (func) {
        //回调
        if (func != null) {
            func("trail_a.png");
        }
    };
    WebPlatform.prototype.ReadImg = function (path, func) {
        Laya.loader.load(path, Laya.Handler.create(this, function () {
            //回调
            if (func != null) {
                func(path);
            }
        }));
    };
    WebPlatform.prototype.SaveScreenToPhoto = function (func) {
        if (func != null) {
            func();
        }
    };
    WebPlatform.prototype.UIShare = function (shareType, succfunc, losefunc) {
    };
    WebPlatform.prototype.OnSaveScreenToPhoto = function (witdh, height, offsetX, offsetY, func) {
        if (func != null) {
            func();
        }
    };
    return WebPlatform;
}());
//# sourceMappingURL=WebPlatform.js.map