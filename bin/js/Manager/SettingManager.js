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
* 数据存储;
*/
var SetStorageData = /** @class */ (function () {
    function SetStorageData() {
        this.language = LanguageType.Chinese;
        this.music = "";
    }
    return SetStorageData;
}());
var SetManager = /** @class */ (function (_super) {
    __extends(SetManager, _super);
    function SetManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //缓存
        _this._curSetData = null;
        return _this;
        //---------------instance end----------------------------------------------------
    }
    //---------------storage begin----------------------------------------------------
    SetManager.prototype.GetSetData = function () {
        return this._curSetData;
    };
    SetManager.prototype.InitSetData = function (storageData) {
        if (storageData == null || storageData.setData == null) {
            this._curSetData = new SetStorageData();
        }
        else {
            this._curSetData = storageData.setData;
        }
        this.PrintCurData();
    };
    SetManager.prototype.InitFirstSignIn = function () {
        this._curSetData = new SetStorageData();
        this._curSetData.language = LanguageType.Chinese;
        this._curSetData.music = MusicManager.Instance.GetDefaultMusicName();
    };
    //---------------storage end----------------------------------------------------
    //---------------language begin----------------------------------------------------
    SetManager.prototype.GetLanguage = function () {
        if (this._curSetData == null) {
            Debuger.LogError("setData is null");
            return;
        }
        return this._curSetData.language;
    };
    //设置了之后需要更新存储结构
    SetManager.prototype.SetLanguage = function (language) {
        if (this._curSetData == null) {
            Debuger.LogError("setData is null");
            return;
        }
        this._curSetData.language = language;
        SaveDataManager.Instance.SaveUserData();
    };
    //---------------language end----------------------------------------------------
    //---------------music begin----------------------------------------------------
    SetManager.prototype.GetMusicName = function () {
        if (this._curSetData == null) {
            Debuger.LogError("setData is null");
            return;
        }
        return this._curSetData.music;
    };
    //设置了之后需要更新存储结构
    SetManager.prototype.SetMusic = function (music) {
        if (this._curSetData == null) {
            Debuger.Log("setData is null");
            return;
        }
        var open = true;
        if (music == "" || music == null)
            open = false;
        this._curSetData.music = music;
        SaveDataManager.Instance.SaveUserData();
        ClientEventManager.Instance.Event(ClientEvent.ON_SETMUSICSUCC);
        MusicManager.Instance.playMusic(this._curSetData.music);
    };
    //---------------music end----------------------------------------------------
    //打印当前的数据
    SetManager.prototype.PrintCurData = function () {
        if (this._curSetData == null) {
            return;
        }
        var str = "";
        str += "language:" + this._curSetData.language;
        str += "    -   musicOpen:" + this._curSetData.music.toString();
        Debuger.LogError(str);
    };
    Object.defineProperty(SetManager, "Instance", {
        //---------------instance begin----------------------------------------------------
        get: function () {
            if (!this._instance) {
                this._instance = new SetManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return SetManager;
}(Singleton));
//# sourceMappingURL=SettingManager.js.map