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
var SaveDataManager = /** @class */ (function (_super) {
    __extends(SaveDataManager, _super);
    function SaveDataManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SaveDataManager, "Instance", {
        //---------------instance begin----------------------------------------------------
        get: function () {
            if (!this._instance) {
                this._instance = new SaveDataManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //---------------instance end----------------------------------------------------
    SaveDataManager.prototype.SaveUserData = function () {
        var storageData = new StorageData;
        storageData.modelDatas = ModelManager.Instance._StorageData;
        storageData.setData = SetManager.Instance.GetSetData();
        storageData.skindata = SkinManager.Instance.GetSetData();
        storageData.playerdata = PlayerManager.Instance.GetSetData();
        ClientTools.LocalSetString(PlayerManager.Instance._PlayerId, ClientTools.ObjToJsonStr(storageData));
    };
    SaveDataManager.prototype.LoadUserData = function () {
        MusicManager.Instance.IntitDatas();
        var str = ClientTools.LocalGetString(PlayerManager.Instance._PlayerId, "");
        var iset = false;
        if (str == "" || str == null) {
            Debuger.Log("读取本地数据 : ......(第一次登录无数据，客户端手动初始化。)");
            ModelManager.Instance.InitFirstSignIn();
            SetManager.Instance.InitFirstSignIn();
            SkinManager.Instance.InitFirstSignIn();
            PlayerManager.Instance.InitFirstSignIn();
            this.SaveUserData();
        }
        else {
            Debuger.Log("读取本地数据：.......(登录过)");
            var storageData = ClientTools.JsonStrToObj(str);
            //各个管理器加载数据
            ModelManager.Instance.InitModelDatas(storageData);
            SetManager.Instance.InitSetData(storageData);
            SkinManager.Instance.InitDatas(storageData);
            PlayerManager.Instance.InitDatas(storageData);
        }
        MusicManager.Instance.playMusic(SetManager.Instance.GetMusicName());
    };
    return SaveDataManager;
}(Singleton));
/*
* 数据存储;
*/
var StorageData = /** @class */ (function () {
    function StorageData() {
        this.modelDatas = new ModelStorageData();
        this.setData = new SetStorageData();
        this.playerdata = new PlayerStorageData();
        this.skindata = new SkinsStorageData();
    }
    return StorageData;
}());
//# sourceMappingURL=SaveDataManager.js.map