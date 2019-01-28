/*
* name;
*/
class NameManager extends Singleton{
    //---------------instance begin----------------------------------------------------
    public static get Instance():NameManager
    {
        if(!this._instance)
        {
            this._instance = new NameManager();
        }
        return this._instance as NameManager;
    }
    private static _instance:NameManager;
    //---------------instance end----------------------------------------------------

    _configs : Dictionary<number,NameData> = new Dictionary<number,NameData>();

    public InitConf(func : Function)
    {
        ConfigManager.Instance.LoadConf("name",(jsonObj:JSON)=>{
            this.OnParseConf(jsonObj,func);
            if(func != null)
            {
                Debuger.Log("2.读取 name.json Succ");
                func();
            }
        });
    }

    private OnParseConf(jsonObj:JSON,func : Function)
    {
        this._configs.Clear();
        for(let index in jsonObj) {
            let data : NameData = jsonObj[index] as NameData;
            this._configs.Add(data.id,data);
        }
    }

    public GetValue(id:number):NameData
    {
        return this._configs.TryGetValue(id);
    }
}

class NameData {
    id: number;
    res_id: number;
    event_1: string;
    event_2: string;
}