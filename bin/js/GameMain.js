/*
* GameMain;
*/
var WebGL = Laya.WebGL;
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.MiniAdpter.init();
        Laya.init(ValueConfig.screenDefaultWitdh, ValueConfig.screenDefaultHeight, WebGL);
        //设置适配模式
        //Laya.stage.scaleMode = "showall";
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        //设置竖屏
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.URL.basePath = "https://sgame.enicen.com.cn/PigCollectMoney/";
        Laya.MiniAdpter.nativefiles = [
            "res/conf/ConstValue.json",
            "res/conf/LangString.json",
            "res/conf/Model.json",
            "res/conf/Skin.json",
            "res/img/share.jpg",
            "res/atlas/UILoading.atlas",
        ];
        Laya.loader.load("res/font/font_red.fnt", Laya.Handler.create(this, this.OnLoadFontRed), null, Laya.Loader.FONT);
        Laya.loader.load("res/font/font_bai.fnt", Laya.Handler.create(this, this.OnLoadFontBai), null, Laya.Loader.FONT);
        Laya.loader.load("res/font/font_huang.fnt", Laya.Handler.create(this, this.OnLoadFontHuang), null, Laya.Loader.FONT);
        Laya.loader.load("res/font/font_lv.fnt", Laya.Handler.create(this, this.OnLoadFontLv), null, Laya.Loader.FONT);
        // FontManager.Instance._numberRedFont = new Laya.BitmapFont();
        // FontManager.Instance._numberRedFont.loadFont("res/font/font_red.fnt", Laya.Handler.create(this, this.OnLoadFontSucc));
        // FontManager.Instance._numberBaiFont = new Laya.BitmapFont();
        // FontManager.Instance._numberBaiFont.loadFont("res/font/font_bai.fnt", Laya.Handler.create(this, this.OnLoadFontSucc));
        // FontManager.Instance._numberHuangFont = new Laya.BitmapFont();
        // FontManager.Instance._numberHuangFont.loadFont("res/font/font_huang.fnt", Laya.Handler.create(this, this.OnLoadFontSucc));
        // FontManager.Instance._numberLvFont = new Laya.BitmapFont();
        // FontManager.Instance._numberLvFont.loadFont("res/font/font_lv.fnt", Laya.Handler.create(this, this.OnLoadFontSucc));
    }
    // 加载字体完成
    GameMain.prototype.OnLoadFontRed = function (font) {
        Laya.Text.registerBitmapFont(StringDefine.Font_RED, font);
    };
    GameMain.prototype.OnLoadFontBai = function (font) {
        Laya.Text.registerBitmapFont(StringDefine.FONT_BAI, font);
    };
    GameMain.prototype.OnLoadFontHuang = function (font) {
        Laya.Text.registerBitmapFont(StringDefine.FONT_HUANG, font);
    };
    GameMain.prototype.OnLoadFontLv = function (font) {
        Laya.Text.registerBitmapFont(StringDefine.FONT_LV, font);
        //加载loading界面需要的资源
        this.InitConfig();
    };
    GameMain.prototype.InitConfig = function () {
        var _this = this;
        Debuger.Log("开始 - 读取json");
        //加载配置文件
        ConfigManager.Instance.InitConfig(function () {
            Laya.loader.load(["res/atlas/UILoading.atlas"], Laya.Handler.create(_this, _this.InitRes), null, Laya.Loader.ATLAS);
        });
    };
    GameMain.prototype.InitRes = function () {
        GameConfig.initResize();
        GameUIManager.Instance.openUILoading();
        var resArray = [
            { url: "res/atlas/Game1.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/Game2.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/Game5.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/Game7.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/button.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/wenzi.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/MainView.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/ui.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/tongyong.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/headIcon.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/MainView.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/PigBeatAnim.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/skin.atlas", type: Laya.Loader.ATLAS },
            { url: "res/music/click_botton.wav", type: Laya.Loader.SOUND },
            { url: "res/music/game_over.wav", type: Laya.Loader.SOUND },
            { url: "res/music/score_add.wav", type: Laya.Loader.SOUND },
        ];
        Laya.loader.load(resArray, Laya.Handler.create(this, this.OnLoadFinished), Laya.Handler.create(this, this.onProgress, null, false));
        Laya.Animation.createFrames(["PigBeatAnim/b_00000.png", "PigBeatAnim/b_00001.png", "PigBeatAnim/b_00002.png", "PigBeatAnim/b_00003.png", "PigBeatAnim/b_00004.png", "PigBeatAnim/b_00005.png", "PigBeatAnim/b_00006.png", "PigBeatAnim/b_00007.png", "PigBeatAnim/b_00008.png"], "PigBeat");
    };
    GameMain.prototype.onProgress = function (value) {
        GameUIManager.Instance.setUILoadingProgress(value);
    };
    GameMain.prototype.OnLoadFinished = function () {
        PlayerManager.Instance._PlayerId = ConstDataManager.Instance.GetValue("txt_playerid", "tetetetet1");
        Debuger.Log("读取json成功");
        //初始化玩家数据
        SaveDataManager.Instance.LoadUserData();
        GameUIManager.Instance.ClosedUILaodidng();
        GameUIManager.Instance.OpenUIMainView();
        PlatformManager.Instance.InitPlatform(); // 初始化平台数据
        //分享初始化监听
        PlatformManager.Instance.UIShare(2);
    };
    return GameMain;
}());
var GameInstance = new GameMain;
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector2;
}());
//# sourceMappingURL=GameMain.js.map