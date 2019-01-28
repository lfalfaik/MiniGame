/*
* name;
*/
class MusicManager extends Singleton{

    soundVolume: number = 1;		//声音音量
	musicVolume: number = 1;		//背景音乐音量
	curMusicName: string;		//当前播放的背景音乐
	public _MusicDatas:Array<MusicData> = new Array<MusicData>();// 配置是音乐list

	public IntitDatas()
	{
		this._MusicDatas.length = 0;
		let list:Array<string> = ClientTools.GetStringList(ConstDataManager.Instance.GetValue("musicnames","music_01,music_02,music_03"));
		this._MusicDatas.push(new MusicData(0,""));// 静音
		if (list != null && list.length > 0)
		 {
			for(var i:number=0;i < list.length;i++)
            {
				let data:MusicData = new  MusicData(i+1,list[i]);
                this._MusicDatas.push(data);
			}
		 }
	}

    //设置背景音乐音量
	public setMusicVolume(_musicVolume: number): void {
		this.musicVolume = _musicVolume;
		Laya.SoundManager.setMusicVolume(_musicVolume);
		if (_musicVolume <= 0) {
			Laya.SoundManager.stopMusic();
		}
	}

    //设置音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
	public setSoundVolume(_soundVolume: number): void {
		this.soundVolume = _soundVolume;
		Laya.SoundManager.setSoundVolume(_soundVolume);
		if (_soundVolume <= 0) {
			Laya.SoundManager.stopAll();
		}
	}

    //播放音效
	//1、LayaNative中的音效只支持wav和ogg格式。
	//2、wav和ogg只支持8位和16位，尚不支持32位。
	//Tips: wav和ogg建议使用22050采样率、16bit、单声道。
	public playSound(_soundName: string): void {
		if (_soundName == "") {
			return;
		}
		Laya.SoundManager.playSound(ClientTools.GetPathYinXiao(_soundName),1);   //0表示循环播放
	}

    //播放背景音乐
	//1、背景音乐只支持mp3格式，同时只能播放一个背景音乐。
	public playMusic(_musicName: string): void {
		if (this.soundVolume <= 0 || this.musicVolume <= 0) {
			return;
		}
		return;
		this.curMusicName = _musicName;
        Laya.SoundManager.soundVolume = 1;
        Laya.SoundManager.musicVolume = 1;
		if (this.curMusicName == "" || this.curMusicName == null)
			Laya.SoundManager.stopMusic();
		else
        	Laya.SoundManager.playMusic(ClientTools.GetPathMusic(this.curMusicName),0);   //0表示循环播放
	}


	public GetIndexByMusicName(name:string):number
	{	 
		 if (this._MusicDatas != null && this._MusicDatas.length > 0)
		 {
			for(var i:number=0;i < this._MusicDatas.length;i++)
            {
				let data:MusicData = this._MusicDatas[i];
				if (data == null)
					continue;
				if (data._musicName == name)
					return i;
			}
		 }
		 return null;
	}

	public GetMusicNameByIndex(index:number):string
	{
		 if (this._MusicDatas != null && this._MusicDatas.length > 0)
		 {
			for(var i:number=0;i < this._MusicDatas.length;i++)
            {
				let data:MusicData = this._MusicDatas[i];
				if (data == null)
					continue;
				if (i == index)
					return data._musicName;
			}
		 }
		 return null;
	}

	public 

    // 默认播放的音乐
    public  GetDefaultMusicName():string
    {
		if (this._MusicDatas != null && this._MusicDatas.length >=2)
		 {
			return this._MusicDatas[1]._musicName;
		 }
        return null;
    }
    //---------------instance begin----------------------------------------------------
    public static get Instance():MusicManager
    {
        if(!this._instance)
        {
            this._instance = new MusicManager();
        }
        return this._instance as MusicManager;
    }
    private static _instance:MusicManager;
    
}

class MusicData
{
	public _musicName:string = "";
	public _musicIndex:number = -1;

	constructor(index:number,name:string)
    {
        this._musicName = name;
        this._musicIndex = index;
    }
}