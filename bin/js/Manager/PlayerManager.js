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
var PlayerManager = /** @class */ (function (_super) {
    __extends(PlayerManager, _super);
    function PlayerManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //---------------存储本地数据 begin----------------------------------------------------
        _this._PlayerId = "";
        _this._PlayerData = null; // 保存数据的格式
        return _this;
        //---------------instance end----------------------------------------------------
    }
    PlayerManager.prototype.GetSetData = function () {
        return this._PlayerData;
    };
    //设置了之后需要更新存储结构
    PlayerManager.prototype.SetInfos = function (ary) {
        if (this._PlayerData == null) {
            Debuger.LogError("playerData is null");
            return;
        }
        this._PlayerData = ary;
        SaveDataManager.Instance.SaveUserData();
    };
    PlayerManager.prototype.InitDatas = function (storageData) {
        if (storageData == null || storageData.modelDatas == null) {
            this._PlayerData = new PlayerStorageData();
        }
        else {
            this._PlayerData = storageData.playerdata;
        }
        this.PrintCurData();
    };
    // 当前选择的生肖id
    PlayerManager.prototype.GetUsedSkinId = function () {
        if (this._PlayerData != null)
            return this._PlayerData._skin;
        return -1;
    };
    // 当前选择的生肖数据
    PlayerManager.prototype.GetUsedSkinData = function () {
        if (this._PlayerData != null)
            return SkinManager.Instance.GetDataByID(this._PlayerData._skin);
        return null;
    };
    PlayerManager.prototype.GetUsedSkinUrl = function (type) {
        if (type === void 0) { type = SkinUrlType.Behind; }
        var data = this.GetUsedSkinData();
        if (data != null) {
            var name_1 = "";
            if (type == SkinUrlType.Front)
                name_1 = data.png1;
            else
                name_1 = data.png2;
            return ClientTools.GetPathBySkinTex(name_1);
        }
        return "";
    };
    PlayerManager.prototype.GetGoldCoinCount = function () {
        if (this._PlayerData != null)
            return this._PlayerData._goldNum;
        return -1;
    };
    PlayerManager.prototype.InitFirstSignIn = function () {
        this._PlayerData = new PlayerStorageData();
        this._PlayerData._skin = ConstDataManager.Instance.GetIntValue("txt_default_skin_id", 10);
    };
    //打印当前的数据
    PlayerManager.prototype.PrintCurData = function () {
        if (this._PlayerData == null) {
            return;
        }
        var str = "玩家数据：";
        var s = "";
        s += "skin:" + this._PlayerData._skin.toString();
        s += " - jifen:" + this._PlayerData._goldNum.toString();
        Debuger.Log(str);
    };
    //---------------存储本地数据 end----------------------------------------------------
    // 使用该皮肤
    PlayerManager.prototype.OnUsedSkin = function (skinId) {
        this._PlayerData._skin = skinId;
        this.SetInfos(this._PlayerData);
        ClientEventManager.Instance.Event(ClientEvent.UPDATE_SKIN_USED, skinId);
    };
    // 购买该皮肤
    PlayerManager.prototype.OnBuySkin = function (num) {
        this._PlayerData._goldNum -= num;
        this.SetInfos(this._PlayerData);
        ClientEventManager.Instance.Event(ClientEvent.UPDATE_JINBI);
    };
    Object.defineProperty(PlayerManager, "Instance", {
        //---------------instance begin----------------------------------------------------
        get: function () {
            if (!this._instance) {
                this._instance = new PlayerManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return PlayerManager;
}(Singleton));
var PlayerStorageData = /** @class */ (function () {
    function PlayerStorageData() {
        this._skin = 0;
        this._goldNum = 0;
    }
    return PlayerStorageData;
}());
//# sourceMappingURL=PlayerManager.js.map