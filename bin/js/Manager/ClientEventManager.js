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
var ClientEventManager = /** @class */ (function (_super) {
    __extends(ClientEventManager, _super);
    function ClientEventManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //---------------instance end----------------------------------------------------
        _this.eventDispatcher = new Laya.EventDispatcher();
        //派发事件
        _this.Event = function (eventId, data) {
            this.eventDispatcher.event(eventId, data);
        };
        //监听事件
        _this.On = function (eventId, caller, listener, data) {
            this.eventDispatcher.on(eventId, caller, listener, data);
        };
        //监听事件，事件响应一次后自动移除
        _this.Once = function (eventId, caller, listener, data) {
            this.eventDispatcher.once(eventId, caller, listener, data);
        };
        //移除监听事件
        _this.Off = function (eventId, caller, listener, onceOnly) {
            if (onceOnly === void 0) { onceOnly = false; }
            this.eventDispatcher.off(eventId, caller, listener, onceOnly);
        };
        return _this;
    }
    Object.defineProperty(ClientEventManager, "Instance", {
        //---------------instance begin----------------------------------------------------
        get: function () {
            if (!this._instance) {
                this._instance = new ClientEventManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return ClientEventManager;
}(Singleton));
var ClientEvent = /** @class */ (function () {
    function ClientEvent() {
    }
    ClientEvent.UPDATE_MODELINFO = "UPDATE_MODELINFO"; // 更新模式开启或者积分 成功
    ClientEvent.UPDATE_SKININFO = "UPDATE_SKININFO"; // 更新skin的获取
    ClientEvent.UPDATE_SKIN_USED = "UPDATE_SKIN_USED"; // 使用皮肤成功
    ClientEvent.UPDATE_JINBI = "UPDATE_JINBI"; // 金币数量
    ClientEvent.ON_GAME_START = "ON_GAME_START"; // 游戏开始
    ClientEvent.ON_GAME_TRYPLAY = "ON_GAME_TRYPLAY"; // 游戏 重新玩一次
    ClientEvent.ON_GAME_OVER = "ON_GAME_OVER"; // 游戏结束
    ClientEvent.ON_GAME_PAUSE = "ON_GAME_PAUSE"; // 游戏暂停
    ClientEvent.ON_GAME_CONTINUE = "ON_GAME_CONTINUE"; // 游戏继续
    ClientEvent.ON_SCORE_UPDATA = "ON_SCORE_UPDATA"; // 游戏中，更新得分
    ClientEvent.ON_SETMUSICSUCC = "ON_SETMUSICSUCC"; // 设置音乐成
    ClientEvent.ON_GAME_SHARE_SUCC = "ON_GAME_SHARE_SUCC"; // 试玩界面-游戏分享成功 ------ 打开游戏，参数的id
    return ClientEvent;
}());
//# sourceMappingURL=ClientEventManager.js.map