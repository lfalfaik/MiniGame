/*
* name;
*/
class PlayerManager extends Singleton{
    //---------------存储本地数据 begin----------------------------------------------------
    public _PlayerId:string = "";
    
    _PlayerData:PlayerStorageData = null;// 保存数据的格式
    public GetSetData():PlayerStorageData
    {
        return this._PlayerData;
    }
      //设置了之后需要更新存储结构
    public SetInfos(ary : PlayerStorageData)
    {
        if(this._PlayerData == null)
        {
            Debuger.LogError("playerData is null");
            return;
        }
        this._PlayerData = ary;
        SaveDataManager.Instance.SaveUserData();
    }

    public InitDatas(storageData : StorageData)
    {
        if(storageData == null || storageData.modelDatas == null)
        {
            this._PlayerData = new PlayerStorageData();
        } 
        else
        {
            this._PlayerData = storageData.playerdata;
        }
        this.PrintCurData();
    }
    // 当前选择的生肖id
    public GetUsedSkinId():number
    {
        if (this._PlayerData  != null)
            return this._PlayerData ._skin;
        return -1;
    }

    // 当前选择的生肖数据
    public GetUsedSkinData():SkinData
    {
        if (this._PlayerData  != null)
            return SkinManager.Instance.GetDataByID(this._PlayerData ._skin);
        return null;
    }

    public GetUsedSkinUrl(type:SkinUrlType = SkinUrlType.Behind):string
    {
        let data:SkinData = this.GetUsedSkinData();
        if (data != null)
        {
            let name:string = "";
             if (type == SkinUrlType.Front)
                name = data.png1;
            else 
                name =  data.png2;
            return  ClientTools.GetPathBySkinTex(name);
        }
        return "";
    }

    public GetGoldCoinCount():number
    {
        if (this._PlayerData  != null)
            return this._PlayerData ._goldNum;
        return -1;
    }

    public InitFirstSignIn()
    {
        this._PlayerData  = new PlayerStorageData ();
        this._PlayerData._skin = ConstDataManager.Instance.GetIntValue("txt_default_skin_id",10);
    }
  //打印当前的数据
    PrintCurData()
    {
        if (this._PlayerData == null) {
            return;
        }
        var str = "玩家数据：";
        var s = "";
            s += "skin:" + this._PlayerData._skin.toString();
            s += " - jifen:" + this._PlayerData._goldNum.toString();
        Debuger.Log(str);
    }   
//---------------存储本地数据 end----------------------------------------------------
    // 使用该皮肤
    public OnUsedSkin(skinId:number)
    {
        this._PlayerData._skin = skinId;
        this.SetInfos(this._PlayerData);
        ClientEventManager.Instance.Event(ClientEvent.UPDATE_SKIN_USED,skinId);
    }

    // 购买该皮肤
    public OnBuySkin(num:number)
    {
        this._PlayerData._goldNum -= num;
        this.SetInfos(this._PlayerData);
        ClientEventManager.Instance.Event(ClientEvent.UPDATE_JINBI);
    }

    //---------------instance begin----------------------------------------------------
    public static get Instance():PlayerManager
    {
        if(!this._instance)
        {
            this._instance = new PlayerManager();
        }
        return this._instance as PlayerManager;
    }
    private static _instance:PlayerManager;
    //---------------instance end----------------------------------------------------


}

class PlayerStorageData
{
     _skin:number = 0;
    _goldNum:number = 0;
}
