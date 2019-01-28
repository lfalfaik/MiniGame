/*
* name;
*/
class ConfigManager extends Singleton {
//---------------instance begin----------------------------------------------------
    public static get Instance(): ConfigManager  {
        if (!this._instance)  {
            this._instance = new ConfigManager();
        }
        return this._instance as ConfigManager;
    }
    private static _instance: ConfigManager;
//---------------instance end----------------------------------------------------
    private _loadNum: number = 0;
    private _totalNum: number = 0;
    private _loadFunc : Function= null;
    public InitConfig(func: Function): void  {
        this._loadFunc = func;
        this._loadNum = 0;  
        this._totalNum = 5;  //所有的配置文件数量

        {
            ConstDataManager.Instance.InitConf(()=>{
                this.OnLoadOnConf();
            });
            StringManager.Instance.InitConf(()=>{
                this.OnLoadOnConf();
            });
            SkinManager.Instance.InitConf(()=>{
                this.OnLoadOnConf();
            });
            ModelManager.Instance.InitConf(()=>{
                this.OnLoadOnConf();
            });
            NameManager.Instance.InitConf(()=>{
                this.OnLoadOnConf();
            });
        }

    }

    private OnLoadOnConf()  {
        this._loadNum = this._loadNum + 1;
        let loadFinish = this._loadNum >= this._totalNum;
        if(loadFinish)
        {
            if(this._loadFunc != null)
            {
                this._loadFunc();
                this._loadFunc = null;
            }
        }
    }

    public GetConfigBasePath(): string  {
        return "res/conf/";
    }

    public LoadConf(path: string, func: Function)  {
        if (func == null)  {
            return;
        }
        let finalPath = this.GetConfigBasePath() + path + ".json";
        //验证是否有

        //加载
        Laya.loader.load(finalPath, Laya.Handler.create(this, function () {
            let json: JSON = Laya.loader.getRes(finalPath);
            if (json == null)  {
                Debuger.LogError("config:" + path + "is null");
                return;
            }
            if (func != null)  {
                func(json);
            }
        }));
    }
}