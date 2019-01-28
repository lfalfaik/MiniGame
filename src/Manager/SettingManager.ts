/*
* 数据存储;
*/
class SetStorageData
{
    public language : number;
    public music : string;

    constructor()
    {
        this.language = LanguageType.Chinese as number;
        this.music = "";
    }
}

class SetManager extends Singleton{
    //缓存
    _curSetData : SetStorageData = null;

//---------------storage begin----------------------------------------------------
    public GetSetData() : SetStorageData
    {
        return this._curSetData;
    }

    public InitSetData(storageData : StorageData)
    {
        if(storageData == null || storageData.setData == null)
        {
            this._curSetData = new SetStorageData();
        } 
        else
        {
            this._curSetData = storageData.setData;
        }
        this.PrintCurData();
    }

    public InitFirstSignIn()
    {
        this._curSetData = new SetStorageData();
        this._curSetData.language = LanguageType.Chinese;
        this._curSetData.music = MusicManager.Instance.GetDefaultMusicName();
    }
//---------------storage end----------------------------------------------------


//---------------language begin----------------------------------------------------
    public GetLanguage() : number
    {
        if(this._curSetData == null)
        {
            Debuger.LogError("setData is null");
            return;
        }
        return this._curSetData.language;
    }

    //设置了之后需要更新存储结构
    public SetLanguage(language : number)
    {
        if(this._curSetData == null)
        {
            Debuger.LogError("setData is null");
            return;
        }
        this._curSetData.language = language;
        SaveDataManager.Instance.SaveUserData();
    }
//---------------language end----------------------------------------------------

//---------------music begin----------------------------------------------------
    public GetMusicName() : string
    {
        if(this._curSetData == null)
        {
            Debuger.LogError("setData is null");
            return;
        }
        return this._curSetData.music;
    }

    //设置了之后需要更新存储结构
    public SetMusic(music:string)
    {
        if(this._curSetData == null)
        {
            Debuger.Log("setData is null");
            return;
        }
        let open:boolean = true;
        if (music == "" || music == null)
            open = false;
        this._curSetData.music = music;
        SaveDataManager.Instance.SaveUserData();
        ClientEventManager.Instance.Event(ClientEvent.ON_SETMUSICSUCC);

        MusicManager.Instance.playMusic(this._curSetData.music);
    }
//---------------music end----------------------------------------------------

    //打印当前的数据
    public PrintCurData()
    {
        if(this._curSetData == null)
        {
            return;
        }
        let str : string = "";
        str += "language:" + (this._curSetData.language as LanguageType);
        str += "    -   musicOpen:" + this._curSetData.music.toString();
        Debuger.LogError(str);
    }

    //---------------instance begin----------------------------------------------------
    public static get Instance():SetManager
    {
        if(!this._instance)
        {
            this._instance = new SetManager();
        }
        return this._instance as SetManager;
    }
    private static _instance:SetManager;
//---------------instance end----------------------------------------------------
}