var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var MusicManager = /** @class */ (function (_super) {
    __extends(MusicManager, _super);
    function MusicManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soundVolume = 1; //声音音量
        _this.musicVolume = 1; //背景音乐音量
        _this._MusicDatas = new Array(); // 配置是音乐list
        return _this;
    }
    MusicManager.prototype.IntitDatas = function () {
        this._MusicDatas.length = 0;
        var list = ClientTools.GetStringList(ConstDataManager.Instance.GetValue("musicnames", "music_01,music_02,music_03"));
        this._MusicDatas.push(new MusicData(0, "")); // 静音
        if (list != null && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                var data = new MusicData(i + 1, list[i]);
                this._MusicDatas.push(data);
            }
        }
    };
    //设置背景音乐音量
    MusicManager.prototype.setMusicVolume = function (_musicVolume) {
        this.musicVolume = _musicVolume;
        Laya.SoundManager.setMusicVolume(_musicVolume);
        if (_musicVolume <= 0) {
            Laya.SoundManager.stopMusic();
        }
    };
    //设置音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
    MusicManager.prototype.setSoundVolume = function (_soundVolume) {
        this.soundVolume = _soundVolume;
        Laya.SoundManager.setSoundVolume(_soundVolume);
        if (_soundVolume <= 0) {
            Laya.SoundManager.stopAll();
        }
    };
    //播放音效
    //1、LayaNative中的音效只支持wav和ogg格式。
    //2、wav和ogg只支持8位和16位，尚不支持32位。
    //Tips: wav和ogg建议使用22050采样率、16bit、单声道。
    MusicManager.prototype.playSound = function (_soundName) {
        if (_soundName == "") {
            return;
        }
        Laya.SoundManager.playSound(ClientTools.GetPathYinXiao(_soundName), 1); //0表示循环播放
    };
    //播放背景音乐
    //1、背景音乐只支持mp3格式，同时只能播放一个背景音乐。
    MusicManager.prototype.playMusic = function (_musicName) {
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
            Laya.SoundManager.playMusic(ClientTools.GetPathMusic(this.curMusicName), 0); //0表示循环播放
    };
    MusicManager.prototype.GetIndexByMusicName = function (name) {
        if (this._MusicDatas != null && this._MusicDatas.length > 0) {
            for (var i = 0; i < this._MusicDatas.length; i++) {
                var data = this._MusicDatas[i];
                if (data == null)
                    continue;
                if (data._musicName == name)
                    return i;
            }
        }
        return null;
    };
    MusicManager.prototype.GetMusicNameByIndex = function (index) {
        if (this._MusicDatas != null && this._MusicDatas.length > 0) {
            for (var i = 0; i < this._MusicDatas.length; i++) {
                var data = this._MusicDatas[i];
                if (data == null)
                    continue;
                if (i == index)
                    return data._musicName;
            }
        }
        return null;
    };
    // 默认播放的音乐
    MusicManager.prototype.GetDefaultMusicName = function () {
        if (this._MusicDatas != null && this._MusicDatas.length >= 2) {
            return this._MusicDatas[1]._musicName;
        }
        return null;
    };
    Object.defineProperty(MusicManager, "Instance", {
        //---------------instance begin----------------------------------------------------
        get: function () {
            if (!this._instance) {
                this._instance = new MusicManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return MusicManager;
}(Singleton));
var MusicData = /** @class */ (function () {
    function MusicData(index, name) {
        this._musicName = "";
        this._musicIndex = -1;
        this._musicName = name;
        this._musicIndex = index;
    }
    return MusicData;
}());
//# sourceMappingURL=MusicManager.js.map