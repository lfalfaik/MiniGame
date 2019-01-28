/*
* name;
*/
class StringManager extends Singleton{
    //---------------instance begin----------------------------------------------------
    public static get Instance():StringManager
    {
        if(!this._instance)
        {
            this._instance = new StringManager();
        }
        return this._instance as StringManager;
    }
    private static _instance:StringManager;
    //---------------instance end----------------------------------------------------

    _configs : Dictionary<string,LangStringData> = new Dictionary<string,LangStringData>();

    public InitConf(func : Function)
    {
        ConfigManager.Instance.LoadConf("LangString",(jsonObj:JSON)=>{
            this.OnParseConf(jsonObj,func);
            if(func != null)
            {
                Debuger.Log("2.读取 LangString.json Succ");
                func();
            }
        });
    }

    private OnParseConf(jsonObj:JSON,func : Function)
    {
        this._configs.Clear();
        for(let index in jsonObj) {
            let data : LangStringData = jsonObj[index] as LangStringData;
            this._configs.Add(data.id,data);
        }
    }

    public GetValue(key:string):string
    {
        let  data:LangStringData = this._configs.TryGetValue(key);
        if (data != null)
            return data.chinese;
        return key;
    }
}

class LangStringData {
    id: string;
    chinese: string;
    english: string;
    korea: string;
    spanish: string;
    france: string;
    germany: string;
    chinese_old: string;
    japan: string;
}