/*
* name;
*/
class ModelManager extends Singleton{

    //---------------存储本地数据 begin----------------------------------------------------
    _StorageData:ModelStorageData = null;// 保存数据的格式
    _Infos : Array<ModelInfo> = new Array<ModelInfo>();

      //设置了之后需要更新存储结构
    public SetInfos(list : Array<ModelInfo>)
    {
        if(this._StorageData == null)
        {
            Debuger.LogError("playerData is null");
            return;
        }
        this._StorageData.datas = list;
        this._Infos = list;
        SaveDataManager.Instance.SaveUserData();
    }

    public InitModelDatas(storageData : StorageData)
    {
        if(storageData == null || storageData.modelDatas == null)
        {
            this._StorageData = new ModelStorageData();
        } 
        else
        {
            this._StorageData = storageData.modelDatas;
        }
        this._Infos = this._StorageData.datas;
        this.PrintCurData();
    }

     // 保存一堆空data
    public InitFirstSignIn()
    {
       let list : Array<ModelInfo> = new Array<ModelInfo>();
        for(var i:number=0;i < this._Datas.length;i++){
            var temp:ModelData = this._Datas[i];
            if (temp == null)
                continue;
            let kv:KeyValueData = ClientTools.GetKeyValueOneData(temp.open);
            let isopen:boolean = false;
            if (kv == null || kv._id == 0 || kv._value == 0)
                isopen = true;
            let info:ModelInfo = new  ModelInfo(temp.id,isopen,0);
            list.push(info);
        }
        this._StorageData = new ModelStorageData ();
        this._StorageData.datas = list;
        this._Infos = list;
    }
    

    // 更新一个info
    public OnUpdataInfo(id:number,isopen:boolean,score:number)
    {
       let isSave:boolean = false;
       if (this._Infos!= null &&this._Infos.length > 0)
        {
                for(var i:number=0;i < this._Infos.length;i++)
                {
                    let  temp:ModelInfo = this._Infos[i];
                    if (temp == null)
                        continue;
                    if (temp._id == id)
                    {
                        if (temp._isOpen)
                        {
                            if (score > temp._score)
                            {
                                isSave = true;
                            }
                        }
                        else
                        {
                             isSave = true;
                        }
                        if (isSave)
                        {
                            let newInfo:ModelInfo = new ModelInfo(id,isopen,score);
                            this._Infos[i] = newInfo;
                            break;
                        }
                    }
                }
        }

        // 开启
        {
            if (this._Infos!= null &&this._Infos.length > 0)
            {
                for(var i:number=0;i < this._Infos.length;i++)
                {
                    let  temp:ModelInfo = this._Infos[i];
                    if (temp == null || temp._isOpen == true)
                        continue;
                     let ddata:ModelData  = ModelManager.Instance.GetDataById(temp._id);
                     if ( ddata  == null)
                           continue;
                    let data: KeyValueData = ClientTools.GetKeyValueOneData(ddata.open);
                    if (data != null)
                    {
                         let checkid:number = data._id;
                         if(checkid == id)
                         {
                            if (score >= data._value)
                            {
                                let newInfo:ModelInfo = new ModelInfo(temp._id,true,0);
                                this._Infos[i] = newInfo;
                            }
                         }
                    }
                }
            }
        }

         if (isSave)
         {
            this.SetInfos(this._Infos);
            ClientEventManager.Instance.Event(ClientEvent.UPDATE_MODELINFO,id);
         }
    }

  //打印当前的数据
    PrintCurData()
    {
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
    }

   
//---------------存储本地数据 end----------------------------------------------------
    public  _CurId:number = 0;// 当前完的关卡
    public _CurScore:number = 0;// 当前关卡的分数
    public GetCurId():number
    {
        return this._CurId;
    }
    public SetCurId(id:number)
    {
        this._CurId = id;
    }

    _Datas : Array<ModelData> = new Array<ModelData>();

   
     public GetInfoById(id:number):ModelInfo
    {
        let list:Array<ModelInfo>  = this.GetInfos();
         if (list != null && list.length > 0)
        {
            for(var i:number=0;i < list.length;i++)
            {
                let  temp:ModelInfo = list[i];
                if (temp == null)
                    continue;
                if (temp._id == id)
                {
                    return temp;
                }
            }
        }
        return null;
    }

     public GetInfoByIndex(index:number):ModelInfo
    {
        let list:Array<ModelInfo>  = this.GetInfos();
         if (list != null && list.length > 0)
         {
            if (index >= 0 && index < list.length)
            {
                return list[index];
            }
         }

        return null;
    }

    public GetIndexById(id:number):number
    {
        let list:Array<ModelInfo>  = this.GetInfos();
         if (list != null && list.length > 0)
        {
            for(var i:number=0;i < list.length;i++)
            {
                let  temp:ModelInfo = list[i];
                if (temp == null)
                    continue;
                if (temp._id == id)
                {
                    return i;
                }
            }
        }
        return -1;
    }

    public GetInfos():Array<ModelInfo> 
    {
        return this._Infos;
        /*
        if (this._ModelStorageData != null)
        {
            let list:Array<ModelInfo>  =new Array<ModelInfo>();    
            list = this._ModelStorageData.datas;
            return  list;
        }
        return null;*/
    }

    public InitConf(func : Function)
    {
        ConfigManager.Instance.LoadConf("Model",(jsonObj:JSON)=>{
            this.OnParseConf(jsonObj,func);
            if(func != null)
            {
                Debuger.Log("4.读取 Model.json Succ");
                func();
            }
        });
    }

    OnParseConf(jsonObj:JSON,func : Function)
    {
        this._Datas.length = 0;
        for(let index in jsonObj) {
            let data : ModelData = jsonObj[index] as ModelData;
            this._Datas.push(data);
        }
    }

    public GetGamePhaseById(id:number):string
    {
        let data:ModelData  = ModelManager.Instance.GetDataById(id);
        if (data != null)
            return data.phase;
        return "";
    }

    public GetDataById(id:number):ModelData
    {
        if (this._Datas != null && this._Datas.length > 0)
        {
            for(var i:number=0;i < this._Datas.length;i++)
            {
                let  temp:ModelData = this._Datas[i];
                if (temp == null)
                    continue;
                if (temp.id == id)
                {
                    return temp;
                }
            }
        }
        return null;
    }

    public GetNameById(id:number):string
    {
        let  data:ModelData = this.GetDataById(id);
        if (data != null)
        {
            return  ClientTools.GetNameByIndex(data.type);;
        }
        return "";
    }

    public GetTexNameById(id:number):string
    {
        //let  data:ModelData = this.GetDataById(id);
        //if (data != null)
        //{
        //    return  ClientTools.GetNameByIndex(data.type);;
        //}
        return "pig_1";
    }

    public GetJieSuoTiaoJian(info:ModelInfo):string
    {
        if (info != null )
        {
            let temp:ModelData = ModelManager.Instance.GetDataById(info._id);
            if (temp != null)
            {
                 let str:string = temp.open;
                let data: KeyValueData = ClientTools.GetKeyValueOneData(str);
                if (data != null)
                {
                    let n:string = ModelManager.Instance.GetNameById(data._id);
                    return data._value.toString();
                }
            }
           
        }
        return "";
    }
        
    public  GetNearFriendInfo():FriendInfo
    {
        let info:FriendInfo = new FriendInfo ("id","测试玩家一","head_1",1000);
        return info;
    }

    //---------------instance begin----------------------------------------------------
    public static get Instance():ModelManager
    {
        if(!this._instance)
        {
            this._instance = new ModelManager();
        }
        return this._instance as ModelManager;
    }
    private static _instance:ModelManager;
    //---------------instance end----------------------------------------------------
}

class FriendInfo
{
    public _id:string;
    public _name:string;
    public _tex:string;
    public _score:number;
   

    constructor(id:string,name:string,tex:string,score:number)
    {
        this._id = id;
        this._name = name;
        this._tex = tex;
        this._score = score;
    }
}

class ModelStorageData
{
    // 每个模式的信息
    public datas:Array<ModelInfo> = new  Array<ModelInfo> ();

    constructor()
    {
        this.datas = new  Array<ModelInfo> ();
    }
}

class ModelInfo {
    public _id: number;//  模式id
    public _score:number;// 最高分数
    public _isOpen:boolean;// 是否开启

    constructor(id: number,isopen:boolean,score:number) {
        this._id = id;
       this.UpdataOpenState(isopen);
       this.UpdataScore(score);
    }

    public UpdataOpenState(isopen:boolean):void
    {
        this._isOpen = isopen;
    }

    public UpdataScore(num:number):void
    {
        this._score = num;
    }
}

class ModelData {
    id: number;
    type: number;
    next: number;
    score: number;
    phase: string;
    open: string;
    life:string;

    public IsOpen()
    {
        
    }
}

class ModelPhaseData{
    public Score:number;
    public Speed:number;
    public Time:number;
    public Resource:string;
    constructor(score:number,speed:number,time:number,resource:string){
        this.Score = score;
        this.Speed = speed;
        this.Time = time;
        this.Resource = resource;
    }
}