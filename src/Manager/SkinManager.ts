/*
* name;
*/
class SkinManager extends Singleton{
    //---------------instance begin----------------------------------------------------
    public static get Instance():SkinManager
    {
        if(!this._instance)
        {
            this._instance = new SkinManager();
        }
        return this._instance as SkinManager;
    }
    private static _instance:SkinManager;
    //---------------instance end----------------------------------------------------
    _StorageData:SkinsStorageData;
    _Infos : Array<SkinInfo> = new Array<SkinInfo>();

    public GetSetData():SkinsStorageData
    {
        return this._StorageData; 
    }
      //设置了之后需要更新存储结构
    public SetInfos(list : Array<SkinInfo>)
    {
        if(this._StorageData == null)
        {
            Debuger.LogError("playerData is null");
            return;
        }
        this._StorageData._datas = list;
        this._Infos = list;
        SaveDataManager.Instance.SaveUserData();
    }

    public InitDatas(storageData : StorageData)
    {
        if(storageData == null || storageData.playerdata == null)
        {
            this._StorageData = new SkinsStorageData();
        } 
        else
        {
            this._StorageData = storageData.skindata;
        }
        this._Infos = this._StorageData._datas;
        this.PrintCurData();
    }

    // 更新一个info
    public OnUpdataInfo(id:number,isopen:boolean)
    {
       let isSave:boolean = true;
       if (this._Infos!= null &&this._Infos.length > 0)
        {
                for(var i:number=0;i < this._Infos.length;i++)
                {
                    let  temp:SkinInfo = this._Infos[i];
                    if (temp == null ||temp._IsHave == true)
                        continue;
                    if (temp._id == id)
                    {
                        let newInfo:SkinInfo = new SkinInfo(id,isopen);
                        this._Infos[i] = newInfo;
                        break;
                    }
                }
        }

        this.SetInfos(this._Infos);
        ClientEventManager.Instance.Event(ClientEvent.UPDATE_SKININFO,id);
    }

  //打印当前的数据
    PrintCurData()
    {
         if (this._StorageData == null || this._StorageData._datas == null || this._StorageData ._datas.length == 0)
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
    }
    // 第一次登录 - 客户端自己计算infos
    public InitFirstSignIn()
    {
        this._Infos.length = 0;
        if (this._Datas != null && this._Datas.length >0)
        {
            for(var i:number=0;i < this._Datas.length;i++){
                var temp:SkinData = this._Datas[i];
                if (temp == null)
                    continue;
                let isopen:boolean = temp.get_type == GetSkinType.Unkonw;
                let newI:SkinInfo = new  SkinInfo(temp.id,isopen);
                this._Infos.push(newI);
            }
        }
        this._StorageData = new SkinsStorageData();
        this._StorageData._datas = this._Infos;
    }
   
//---------------存储本地数据 end----------------------------------------------------

    _Datas : Array<SkinData> = new Array<SkinData>();

    public InitConf(func : Function)
    {
        ConfigManager.Instance.LoadConf("Skin",(jsonObj:JSON)=>{
            this.OnParseConf(jsonObj,func);
            if(func != null)
            {
                Debuger.Log("3.读取 Skin.json Succ");
                func();
            }
        });
    }

    OnParseConf(jsonObj:JSON,func : Function)
    {
        this._Datas.length = 0;
        for(let index in jsonObj) {
            let data : SkinData = jsonObj[index] as SkinData;
            this._Datas.push(data);
        }
    }

    public GetDataByID(id:number):SkinData
    {
        if (this._Datas != null && this._Datas.length >0)
        {
            for(var i:number=0;i < this._Datas.length;i++){
                var temp:SkinData = this._Datas[i];
                if (temp == null)
                    continue;
                if (id == temp.id)
                    return temp;
            }
        }
        return null;
    }

    public GetInfoByIndex(index:number):SkinInfo
    {
         if (this._Infos != null && this._Infos .length > 0)
         {
            if (index >= 0 && index < this._Infos .length)
            {
                return this._Infos [index];
            }
         }

        return null;
    }
}

class SkinsStorageData
{
    _datas:Array<SkinInfo>;

    super()
    {
        this._datas = new Array<SkinInfo>();
    }
    
    public Init(skin:Array<SkinInfo> )
    {
        this._datas = skin;
    }
}

class SkinInfo
{
    _id:number;
    _IsHave:boolean;//是否拥有该皮肤

    constructor(id:number,ishave:boolean)
    {
        this._id = id;
        this._IsHave = ishave;
    }

}
class SkinData {
    id: number;
    name: string;
    png1: string;
    scale1: number;
    png2: string;
    scale2: number;
    get_type: number;
    need_num: number;
}