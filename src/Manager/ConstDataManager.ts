/*
* name;
*/
class ConstDataManager  extends Singleton{

    //---------------instance begin----------------------------------------------------
    public static get Instance():ConstDataManager
    {
        if(!this._instance)
        {
            this._instance = new ConstDataManager();
        }
        return this._instance as ConstDataManager;
    }
    private static _instance:ConstDataManager;
    //---------------instance end---------------------------------------------------

    _ConstDatas : Dictionary<string,ConstData> = new Dictionary<string,ConstData>();

    public InitConf(func : Function)
    {
        ConfigManager.Instance.LoadConf("Const",(jsonObj:JSON)=>{
            this.OnParseConf(jsonObj,func);
            if(func != null)
            {
                Debuger.Log("1.读取 Const.json Succ");
                func();
            }
        });
    }

    OnParseConf(jsonObj:JSON,func : Function)
    {
        this._ConstDatas.Clear();
        for(let index in jsonObj) {
            let data : ConstData = jsonObj[index] as ConstData;
            this._ConstDatas.Add(data.key,data);
        }
    }


    public GetIntValue(key: string,v:number): number {
        let  data:ConstData = this._ConstDatas.TryGetValue(key);
        if (data != null)
        {
            return ClientTools.StrToInt(data.value);
        }
        return v;
    }

    public GetFloatValue(key: string,v:number): number {
        let  data:ConstData = this._ConstDatas.TryGetValue(key);
        if (data != null)
        {
            return ClientTools.StrToFloat(data.value);
        }
        return v;
    }

    public GetValue(key: string,v:string): string {
        let  data:ConstData = this._ConstDatas.TryGetValue(key);
        if (data != null)
            return data.value;
        return v;
    }
}

class ConstData {
    key: string;
    value: string;
}