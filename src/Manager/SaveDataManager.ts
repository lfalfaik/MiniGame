/*
* name;
*/
class SaveDataManager extends Singleton{
//---------------instance begin----------------------------------------------------
    public static get Instance():SaveDataManager
    {
        if(!this._instance)
        {
            this._instance = new SaveDataManager();
        }
        return this._instance as SaveDataManager;
    }
    private static _instance:SaveDataManager;
//---------------instance end----------------------------------------------------

    public SaveUserData()
    {
        let storageData : StorageData = new StorageData;
        storageData.modelDatas = ModelManager.Instance._StorageData;
        storageData.setData = SetManager.Instance.GetSetData();
         storageData.skindata = SkinManager.Instance.GetSetData();
         storageData.playerdata = PlayerManager.Instance.GetSetData();
        ClientTools.LocalSetString( PlayerManager.Instance._PlayerId,ClientTools.ObjToJsonStr(storageData));
    }

    public LoadUserData()
    {
        MusicManager.Instance.IntitDatas();
        let str : string = ClientTools.LocalGetString( PlayerManager.Instance._PlayerId,"");
        let iset:boolean = false;
        if(str == "" || str == null)
        {
            Debuger.Log("读取本地数据 : ......(第一次登录无数据，客户端手动初始化。)");
            ModelManager.Instance.InitFirstSignIn();
            SetManager.Instance.InitFirstSignIn();
            SkinManager.Instance.InitFirstSignIn();
            PlayerManager.Instance.InitFirstSignIn();
            this.SaveUserData();
        }
        else
        {
             Debuger.Log("读取本地数据：.......(登录过)");
           let storageData:StorageData = ClientTools.JsonStrToObj<StorageData>(str);
            //各个管理器加载数据
            ModelManager.Instance.InitModelDatas(storageData);
            SetManager.Instance.InitSetData(storageData);
            SkinManager.Instance.InitDatas(storageData);
            PlayerManager.Instance.InitDatas(storageData);
        }
        MusicManager.Instance.playMusic(SetManager.Instance.GetMusicName());
    }
}


/*
* 数据存储;
*/
class StorageData
{
    public modelDatas : ModelStorageData;
    public setData : SetStorageData;
    public playerdata:PlayerStorageData;
    public skindata:SkinsStorageData;

    constructor()
    {
        this.modelDatas = new ModelStorageData();
        this.setData = new SetStorageData();
        this.playerdata = new PlayerStorageData();
        this.skindata = new SkinsStorageData();
    }
}