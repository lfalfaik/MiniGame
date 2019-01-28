/*
* 一些常量;
*/
var LanguageType;
(function (LanguageType) {
    LanguageType[LanguageType["Chinese"] = 0] = "Chinese";
    LanguageType[LanguageType["Chinese_old"] = 1] = "Chinese_old";
    LanguageType[LanguageType["English"] = 2] = "English";
    LanguageType[LanguageType["Japan"] = 3] = "Japan";
    LanguageType[LanguageType["Korea"] = 4] = "Korea";
    LanguageType[LanguageType["Spanish"] = 5] = "Spanish";
    LanguageType[LanguageType["France"] = 6] = "France";
    LanguageType[LanguageType["Germany"] = 7] = "Germany";
})(LanguageType || (LanguageType = {}));
var RankType;
(function (RankType) {
    RankType[RankType["Friend"] = 1] = "Friend";
    RankType[RankType["World"] = 2] = "World";
})(RankType || (RankType = {}));
var MusicType;
(function (MusicType) {
    MusicType[MusicType["JingYin"] = 0] = "JingYin";
    MusicType[MusicType["World"] = 2] = "World";
})(MusicType || (MusicType = {}));
var GetSkinType;
(function (GetSkinType) {
    GetSkinType[GetSkinType["Unkonw"] = 0] = "Unkonw";
    GetSkinType[GetSkinType["GoldCoinBuy"] = 1] = "GoldCoinBuy";
    GetSkinType[GetSkinType["ADTimeBuy"] = 2] = "ADTimeBuy"; //看x广告
})(GetSkinType || (GetSkinType = {}));
var SkinUrlType;
(function (SkinUrlType) {
    SkinUrlType[SkinUrlType["Front"] = 1] = "Front";
    SkinUrlType[SkinUrlType["Behind"] = 2] = "Behind";
})(SkinUrlType || (SkinUrlType = {}));
var UIName;
(function (UIName) {
    UIName[UIName["UILoading"] = 1] = "UILoading";
    UIName[UIName["UISkin"] = 2] = "UISkin";
    UIName[UIName["UIRank"] = 3] = "UIRank";
    UIName[UIName["UIOther"] = 0] = "UIOther";
})(UIName || (UIName = {}));
var ValueConfig = /** @class */ (function () {
    function ValueConfig() {
        ValueConfig.screenDefaultWitdh = 720;
        ValueConfig.screenDefaultHeight = 1280;
    }
    //语言enum
    ValueConfig.screenDefaultWitdh = 720;
    ValueConfig.screenDefaultHeight = 1280;
    return ValueConfig;
}());
var KeyValueData = /** @class */ (function () {
    function KeyValueData(id, value) {
        this._id = id;
        this._value = value;
    }
    return KeyValueData;
}());
var StringDefine = /** @class */ (function () {
    function StringDefine() {
    }
    StringDefine.Font_RED = "font_red"; // 更新模式开启或者积分 成功
    StringDefine.FONT_HUANG = "font_huang"; // 更新skin的获取
    StringDefine.FONT_BAI = "font_bai"; // 使用皮肤成功
    StringDefine.FONT_LV = "font_lv"; // 金币数量
    StringDefine.SOUND_CLICKBTN = "click_botton"; // 点击按钮音效
    StringDefine.SOUND_GAMEOVER = "game_over"; //  游戏结束音效
    StringDefine.SOUND_ADDSCORE = "score_add"; // 加分音效
    return StringDefine;
}());
//# sourceMappingURL=ValueConfig.js.map