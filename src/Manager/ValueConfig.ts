/*
* 一些常量;
*/

enum LanguageType{
    Chinese = 0,
    Chinese_old,
    English,
    Japan,
    Korea,
    Spanish,
    France,
    Germany
}

enum RankType{
    Friend = 1,
    World = 2,
}

enum MusicType{
    JingYin = 0,
    World = 2,
}

enum GetSkinType{
    Unkonw = 0,// 免费赠送
    GoldCoinBuy = 1,//金币购买
    ADTimeBuy = 2//看x广告
}

enum SkinUrlType{
    Front = 1,// 正面
    Behind = 2,// 反面
}

enum UIName{
    UILoading = 1,// 正面
    UISkin = 2,// 反面
    UIRank = 3,// 反面
    UIOther = 0
}

class ValueConfig{
    //语言enum
    public static screenDefaultWitdh : number = 720;
    public static screenDefaultHeight : number = 1280;

    constructor(){
        ValueConfig.screenDefaultWitdh = 720;
        ValueConfig.screenDefaultHeight = 1280;
    }
}

class KeyValueData{
    //语言enum
    public _id : number;
    public _value : number;

    constructor(id:number,value:number){
        this._id = id;
        this._value = value;
    }
}

class StringDefine {
    static Font_RED: string = "font_red";// 更新模式开启或者积分 成功
    static FONT_HUANG: string = "font_huang";// 更新skin的获取
    static FONT_BAI: string = "font_bai";// 使用皮肤成功
    static FONT_LV: string = "font_lv";// 金币数量
    static SOUND_CLICKBTN: string = "click_botton";// 点击按钮音效
    static SOUND_GAMEOVER: string = "game_over";//  游戏结束音效
    static SOUND_ADDSCORE: string = "score_add";// 加分音效
}