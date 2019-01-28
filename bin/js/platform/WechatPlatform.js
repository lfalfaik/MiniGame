/*
* 微信平台;
*/
var WechatPlatform = /** @class */ (function () {
    function WechatPlatform() {
        //微信的接口
        this.wx = Laya.Browser.window.wx;
    }
    WechatPlatform.prototype.ChooseImg = function (func) {
        var _this = this;
        if (Laya.Browser.onMiniGame) {
            //回调
            var data = void 0;
            this.wx.chooseImage({
                count: 1,
                success: function (res) {
                    // 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
                    var filePath = res.tempFilePaths[0];
                    var fs = _this.wx.getFileSystemManager();
                    fs.saveFile({
                        tempFilePath: filePath,
                        success: function (res) {
                            _this.picSavePath = res.savedFilePath;
                            if (func != null) {
                                func(res.savedFilePath);
                            }
                        }
                    });
                }
            });
        }
    };
    WechatPlatform.prototype.ReadImg = function (path, func) {
        if (Laya.Browser.onMiniGame) {
            //回调
            var data = void 0;
            var fs = this.wx.getFileSystemManager();
            fs.readFile({
                filePath: path,
                encoding: 'base64',
                success: function (res) {
                    if (func != null) {
                        func("data:image/jpeg;base64," + res.data);
                    }
                }
            });
        }
    };
    //获得图片
    WechatPlatform.prototype.getImageInfo = function (basePath, func) {
        var _this = this;
        if (Laya.Browser.onMiniGame) {
            this.wx.getImageInfo({
                src: basePath,
                success: function (res) {
                    _this.SaveImg(res.path, func);
                }
            });
        }
    };
    ;
    //base64读入缓存并保存到相册
    WechatPlatform.prototype.OnSaveScreenToPhoto = function (witdh, height, offsetX, offsetY, func) {
        var _this = this;
        if (!Laya.Browser.onMiniGame) {
            if (func != null) {
                func();
            }
            return;
        }
        var fileManager = this.wx.getFileSystemManager();
        var timestamp = new Date().getTime();
        //HTMLCanvas 是 Html Canvas 的代理类，封装了 Canvas 的属性和方法。。请不要直接使用 new HTMLCanvas！
        //此处将canvas指定区域进行截屏
        var htmlC = Laya.stage.drawToCanvas(witdh, height, -offsetX, -offsetY);
        var canvas = htmlC.getCanvas();
        var data = canvas.toDataURL("image/png"); //.replace("image/png", "image/octet-stream"); // 获取生成的图片的url  
        var filePath = this.wx.env.USER_DATA_PATH + "/qrcode_" + timestamp + ".png";
        fileManager.writeFile({
            filePath: filePath,
            data: data.substring(data.indexOf(',') + 1),
            encoding: 'base64',
            success: function (res) {
                _this.SaveImg(filePath, func);
            },
            fail: function (res) {
                _this.wx.showToast({
                    title: '保存图片失败！',
                });
            }
        });
    };
    //base64读入缓存并保存到相册
    WechatPlatform.prototype.SaveScreenToPhoto = function (func) {
        this.OnSaveScreenToPhoto(Laya.stage.width, Laya.stage.height, 0, 0, func);
    };
    //保存到相册
    WechatPlatform.prototype.SaveImg = function (path, func) {
        var _this = this;
        if (!Laya.Browser.onMiniGame) {
            if (func != null) {
                func();
            }
            return;
        }
        this.wx.saveImageToPhotosAlbum({
            filePath: path,
            success: function (res) {
                if (func != null) {
                    func();
                }
                _this.wx.showToast({
                    title: '保存图片成功！',
                });
            },
            fail: function (res) {
                if (func != null) {
                    func();
                }
                _this.wx.showToast({
                    title: '保存图片失败！',
                });
            }
        });
    };
    WechatPlatform.prototype.GetShareStr = function () {
        var str = "我已长命百岁，你能坚持多久";
        var list = ClientTools.GetStringList(ConstDataManager.Instance.GetValue("fenxiangstr", "我已长命百岁，你能坚持多久"), ";");
        if (list != null) {
            if (list.length == 1)
                str = list[0];
            else {
                var randomNum = Math.floor(Math.random() * list.length);
                str = list[randomNum];
            }
        }
        return str;
    };
    //2是被动转发,1是主动转发
    WechatPlatform.prototype.UIShare = function (shareType, succfunc, losefunc) {
        var _this = this;
        if (succfunc != null)
            succfunc();
        if (Laya.Browser.onMiniGame) {
            var str_1 = this.GetShareStr();
            if (shareType == 1) {
                this.wx.shareAppMessage({
                    title: str_1,
                    imageUrl: 'res/img/share.jpg',
                    success: function () {
                        if (succfunc != null)
                            succfunc();
                        _this.wx.showToast({
                            title: '分享成功',
                        });
                    },
                    fail: function () {
                        if (losefunc != null)
                            losefunc();
                        _this.wx.showToast({
                            title: '分享失败',
                        });
                    }
                });
            }
            if (shareType == 2) {
                this.wx.showShareMenu({
                    withShareTicket: true
                });
                this.wx.onShareAppMessage(function () {
                    return {
                        title: str_1,
                        imageUrl: 'res/img/share.jpg',
                    };
                });
            }
        }
    };
    return WechatPlatform;
}());
//# sourceMappingURL=WechatPlatform.js.map