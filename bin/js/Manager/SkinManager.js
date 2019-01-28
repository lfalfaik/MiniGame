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
var SkinManager = /** @class */ (function (_super) {
    __extends(SkinManager, _super);
    function SkinManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._Infos = new Array();
        //---------------存储本地数据 end----------------------------------------------------
        _this._Datas = new Array();
        return _this;
    }
    Object.defineProperty(SkinManager, "Instance", {
        //---------------instance begin----------------------------------------------------
        get: function () {
            if (!this._instance) {
                this._instance = new SkinManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    SkinManager.prototype.GetSetData = function () {
        return this._StorageData;
    };
    //设置了之后需要更新存储结构
    SkinManager.prototype.SetInfos = function (list) {
        if (this._StorageData == null) {
            Debuger.LogError("playerData is null");
            return;
        }
        this._StorageData._datas = list;
        this._Infos = list;
        SaveDataManager.Instance.SaveUserData();
    };
    SkinManager.prototype.InitDatas = function (storageData) {
        if (storageData == null || storageData.playerdata == null) {
            this._StorageData = new SkinsStorageData();
        }
        else {
            this._StorageData = storageData.skindata;
        }
        this._Infos = this._StorageData._datas;
        this.PrintCurData();
    };
    // 更新一个info
    SkinManager.prototype.OnUpdataInfo = function (id, isopen) {
        var isSave = true;
        if (this._Infos != null && this._Infos.length > 0) {
            for (var i = 0; i < this._Infos.length; i++) {
                var temp = this._Infos[i];
                if (temp == null || temp._IsHave == true)
                    continue;
                if (temp._id == id) {
                    var newInfo = new SkinInfo(id, isopen);
                    this._Infos[i] = newInfo;
                    break;
                }
            }
        }
        this.SetInfos(this._Infos);
        ClientEventManager.Instance.Event(ClientEvent.UPDATE_SKININFO, id);
    };
    //打印当前的数据
    SkinManager.prototype.PrintCurData = function () {
        if (this._StorageData == null || this._StorageData._datas == null || this._StorageData._datas.length == 0)
            return;
        if (this._Infos == null) {
            return;
        }
        var str = "skin数据：";
        for (var i = 0; i < this._Infos.length; i++) {
            var temp = this._Infos[i];
            if (temp == null)
                continue;
            var s = "";
            s += "id:" + temp._id.toString();
            s += " - isOpen:" + temp._IsHave.toString();
            str += " *******   " + s;
        }
        Debuger.Log(str);
    };
    // 第一次登录 - 客户端自己计算infos
    SkinManager.prototype.InitFirstSignIn = function () {
        this._Infos.length = 0;
        if (this._Datas != null && this._Datas.length > 0) {
            for (var i = 0; i < this._Datas.length; i++) {
                var temp = this._Datas[i];
                if (temp == null)
                    continue;
                var isopen = temp.get_type == GetSkinType.Unkonw;
                var newI = new SkinInfo(temp.id, isopen);
                this._Infos.push(newI);
            }
        }
        this._StorageData = new SkinsStorageData();
        this._StorageData._datas = this._Infos;
    };
    SkinManager.prototype.InitConf = function (func) {
        var _this = this;
        ConfigManager.Instance.LoadConf("Skin", function (jsonObj) {
            _this.OnParseConf(jsonObj, func);
            if (func != null) {
                Debuger.Log("3.读取 Skin.json Succ");
                func();
            }
        });
    };
    SkinManager.prototype.OnParseConf = function (jsonObj, func) {
        this._Datas.length = 0;
        for (var index in jsonObj) {
            var data = jsonObj[index];
            this._Datas.push(data);
        }
    };
    SkinManager.prototype.GetDataByID = function (id) {
        if (this._Datas != null && this._Datas.length > 0) {
            for (var i = 0; i < this._Datas.length; i++) {
                var temp = this._Datas[i];
                if (temp == null)
                    continue;
                if (id == temp.id)
                    return temp;
            }
        }
        return null;
    };
    SkinManager.prototype.GetInfoByIndex = function (index) {
        if (this._Infos != null && this._Infos.length > 0) {
            if (index >= 0 && index < this._Infos.length) {
                return this._Infos[index];
            }
        }
        return null;
    };
    return SkinManager;
}(Singleton));
var SkinsStorageData = /** @class */ (function () {
    function SkinsStorageData() {
    }
    SkinsStorageData.prototype.super = function () {
        this._datas = new Array();
    };
    SkinsStorageData.prototype.Init = function (skin) {
        this._datas = skin;
    };
    return SkinsStorageData;
}());
var SkinInfo = /** @class */ (function () {
    function SkinInfo(id, ishave) {
        this._id = id;
        this._IsHave = ishave;
    }
    return SkinInfo;
}());
var SkinData = /** @class */ (function () {
    function SkinData() {
    }
    return SkinData;
}());
//# sourceMappingURL=SkinManager.js.map