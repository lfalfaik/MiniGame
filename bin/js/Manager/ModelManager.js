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
var ModelManager = /** @class */ (function (_super) {
    __extends(ModelManager, _super);
    function ModelManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //---------------存储本地数据 begin----------------------------------------------------
        _this._StorageData = null; // 保存数据的格式
        _this._Infos = new Array();
        //---------------存储本地数据 end----------------------------------------------------
        _this._CurId = 0; // 当前完的关卡
        _this._CurScore = 0; // 当前关卡的分数
        _this._Datas = new Array();
        return _this;
        //---------------instance end----------------------------------------------------
    }
    //设置了之后需要更新存储结构
    ModelManager.prototype.SetInfos = function (list) {
        if (this._StorageData == null) {
            Debuger.LogError("playerData is null");
            return;
        }
        this._StorageData.datas = list;
        this._Infos = list;
        SaveDataManager.Instance.SaveUserData();
    };
    ModelManager.prototype.InitModelDatas = function (storageData) {
        if (storageData == null || storageData.modelDatas == null) {
            this._StorageData = new ModelStorageData();
        }
        else {
            this._StorageData = storageData.modelDatas;
        }
        this._Infos = this._StorageData.datas;
        this.PrintCurData();
    };
    // 保存一堆空data
    ModelManager.prototype.InitFirstSignIn = function () {
        var list = new Array();
        for (var i = 0; i < this._Datas.length; i++) {
            var temp = this._Datas[i];
            if (temp == null)
                continue;
            var kv = ClientTools.GetKeyValueOneData(temp.open);
            var isopen = false;
            if (kv == null || kv._id == 0 || kv._value == 0)
                isopen = true;
            var info = new ModelInfo(temp.id, isopen, 0);
            list.push(info);
        }
        this._StorageData = new ModelStorageData();
        this._StorageData.datas = list;
        this._Infos = list;
    };
    // 更新一个info
    ModelManager.prototype.OnUpdataInfo = function (id, isopen, score) {
        var isSave = false;
        if (this._Infos != null && this._Infos.length > 0) {
            for (var i = 0; i < this._Infos.length; i++) {
                var temp = this._Infos[i];
                if (temp == null)
                    continue;
                if (temp._id == id) {
                    if (temp._isOpen) {
                        if (score > temp._score) {
                            isSave = true;
                        }
                    }
                    else {
                        isSave = true;
                    }
                    if (isSave) {
                        var newInfo = new ModelInfo(id, isopen, score);
                        this._Infos[i] = newInfo;
                        break;
                    }
                }
            }
        }
        // 开启
        {
            if (this._Infos != null && this._Infos.length > 0) {
                for (var i = 0; i < this._Infos.length; i++) {
                    var temp = this._Infos[i];
                    if (temp == null || temp._isOpen == true)
                        continue;
                    var ddata = ModelManager.Instance.GetDataById(temp._id);
                    if (ddata == null)
                        continue;
                    var data = ClientTools.GetKeyValueOneData(ddata.open);
                    if (data != null) {
                        var checkid = data._id;
                        if (checkid == id) {
                            if (score >= data._value) {
                                var newInfo = new ModelInfo(temp._id, true, 0);
                                this._Infos[i] = newInfo;
                            }
                        }
                    }
                }
            }
        }
        if (isSave) {
            this.SetInfos(this._Infos);
            ClientEventManager.Instance.Event(ClientEvent.UPDATE_MODELINFO, id);
        }
    };
    //打印当前的数据
    ModelManager.prototype.PrintCurData = function () {
        //if (this._ModelStorageData == null || this._ModelStorageData.datas == null || this._ModelStorageData .datas.length == 0)
        //   return;
        if (this._Infos == null) {
            return;
        }
        var str = "游戏模式数据：";
        for (var i = 0; i < this._Infos.length; i++) {
            var temp = this._Infos[i];
            if (temp == null)
                continue;
            var s = "";
            s += "id:" + temp._id.toString();
            s += " - isOpen:" + temp._isOpen.toString();
            s += " - score:" + temp._score.toString();
            str += " *******   " + s;
        }
        Debuger.Log(str);
    };
    ModelManager.prototype.GetCurId = function () {
        return this._CurId;
    };
    ModelManager.prototype.SetCurId = function (id) {
        this._CurId = id;
    };
    ModelManager.prototype.GetInfoById = function (id) {
        var list = this.GetInfos();
        if (list != null && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                var temp = list[i];
                if (temp == null)
                    continue;
                if (temp._id == id) {
                    return temp;
                }
            }
        }
        return null;
    };
    ModelManager.prototype.GetInfoByIndex = function (index) {
        var list = this.GetInfos();
        if (list != null && list.length > 0) {
            if (index >= 0 && index < list.length) {
                return list[index];
            }
        }
        return null;
    };
    ModelManager.prototype.GetIndexById = function (id) {
        var list = this.GetInfos();
        if (list != null && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                var temp = list[i];
                if (temp == null)
                    continue;
                if (temp._id == id) {
                    return i;
                }
            }
        }
        return -1;
    };
    ModelManager.prototype.GetInfos = function () {
        return this._Infos;
        /*
        if (this._ModelStorageData != null)
        {
            let list:Array<ModelInfo>  =new Array<ModelInfo>();
            list = this._ModelStorageData.datas;
            return  list;
        }
        return null;*/
    };
    ModelManager.prototype.InitConf = function (func) {
        var _this = this;
        ConfigManager.Instance.LoadConf("Model", function (jsonObj) {
            _this.OnParseConf(jsonObj, func);
            if (func != null) {
                Debuger.Log("4.读取 Model.json Succ");
                func();
            }
        });
    };
    ModelManager.prototype.OnParseConf = function (jsonObj, func) {
        this._Datas.length = 0;
        for (var index in jsonObj) {
            var data = jsonObj[index];
            this._Datas.push(data);
        }
    };
    ModelManager.prototype.GetGamePhaseById = function (id) {
        var data = ModelManager.Instance.GetDataById(id);
        if (data != null)
            return data.phase;
        return "";
    };
    ModelManager.prototype.GetDataById = function (id) {
        if (this._Datas != null && this._Datas.length > 0) {
            for (var i = 0; i < this._Datas.length; i++) {
                var temp = this._Datas[i];
                if (temp == null)
                    continue;
                if (temp.id == id) {
                    return temp;
                }
            }
        }
        return null;
    };
    ModelManager.prototype.GetNameById = function (id) {
        var data = this.GetDataById(id);
        if (data != null) {
            return ClientTools.GetNameByIndex(data.type);
            ;
        }
        return "";
    };
    ModelManager.prototype.GetTexNameById = function (id) {
        //let  data:ModelData = this.GetDataById(id);
        //if (data != null)
        //{
        //    return  ClientTools.GetNameByIndex(data.type);;
        //}
        return "pig_1";
    };
    ModelManager.prototype.GetJieSuoTiaoJian = function (info) {
        if (info != null) {
            var temp = ModelManager.Instance.GetDataById(info._id);
            if (temp != null) {
                var str = temp.open;
                var data = ClientTools.GetKeyValueOneData(str);
                if (data != null) {
                    var n = ModelManager.Instance.GetNameById(data._id);
                    return data._value.toString();
                }
            }
        }
        return "";
    };
    ModelManager.prototype.GetNearFriendInfo = function () {
        var info = new FriendInfo("id", "测试玩家一", "head_1", 1000);
        return info;
    };
    Object.defineProperty(ModelManager, "Instance", {
        //---------------instance begin----------------------------------------------------
        get: function () {
            if (!this._instance) {
                this._instance = new ModelManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return ModelManager;
}(Singleton));
var FriendInfo = /** @class */ (function () {
    function FriendInfo(id, name, tex, score) {
        this._id = id;
        this._name = name;
        this._tex = tex;
        this._score = score;
    }
    return FriendInfo;
}());
var ModelStorageData = /** @class */ (function () {
    function ModelStorageData() {
        // 每个模式的信息
        this.datas = new Array();
        this.datas = new Array();
    }
    return ModelStorageData;
}());
var ModelInfo = /** @class */ (function () {
    function ModelInfo(id, isopen, score) {
        this._id = id;
        this.UpdataOpenState(isopen);
        this.UpdataScore(score);
    }
    ModelInfo.prototype.UpdataOpenState = function (isopen) {
        this._isOpen = isopen;
    };
    ModelInfo.prototype.UpdataScore = function (num) {
        this._score = num;
    };
    return ModelInfo;
}());
var ModelData = /** @class */ (function () {
    function ModelData() {
    }
    ModelData.prototype.IsOpen = function () {
    };
    return ModelData;
}());
var ModelPhaseData = /** @class */ (function () {
    function ModelPhaseData(score, speed, time, resource) {
        this.Score = score;
        this.Speed = speed;
        this.Time = time;
        this.Resource = resource;
    }
    return ModelPhaseData;
}());
//# sourceMappingURL=ModelManager.js.map