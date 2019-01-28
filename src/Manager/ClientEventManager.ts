/*
* name;
*/
class ClientEventManager extends Singleton {
    //---------------instance begin----------------------------------------------------
    public static get Instance():ClientEventManager
    {
        if(!this._instance)
        {
            this._instance = new ClientEventManager();
        }
        return this._instance as ClientEventManager;
    }
    private static _instance:ClientEventManager;
    //---------------instance end----------------------------------------------------


    eventDispatcher = new Laya.EventDispatcher();

    //派发事件
    public Event = function (eventId, data?: any) {
        this.eventDispatcher.event(eventId, data);
    }

    //监听事件
    public On = function (eventId, caller, listener, data?: any) {
        this.eventDispatcher.on(eventId, caller, listener, data);
    }

    //监听事件，事件响应一次后自动移除
    public Once = function (eventId, caller, listener, data?: any) {
        this.eventDispatcher.once(eventId, caller, listener, data);
    }

    //移除监听事件
    public Off = function (eventId, caller, listener, onceOnly = false) {
        this.eventDispatcher.off(eventId, caller, listener, onceOnly);
    }
}

class ClientEvent {
    static UPDATE_MODELINFO: string = "UPDATE_MODELINFO";// 更新模式开启或者积分 成功
    static UPDATE_SKININFO: string = "UPDATE_SKININFO";// 更新skin的获取
    static UPDATE_SKIN_USED: string = "UPDATE_SKIN_USED";// 使用皮肤成功
    static UPDATE_JINBI: string = "UPDATE_JINBI";// 金币数量
    static ON_GAME_START: string = "ON_GAME_START";// 游戏开始
    static ON_GAME_TRYPLAY: string = "ON_GAME_TRYPLAY";// 游戏 重新玩一次
    static ON_GAME_OVER: string = "ON_GAME_OVER";// 游戏结束
    static ON_GAME_PAUSE: string = "ON_GAME_PAUSE";// 游戏暂停
    static ON_GAME_CONTINUE: string = "ON_GAME_CONTINUE";// 游戏继续
    static ON_SCORE_UPDATA: string = "ON_SCORE_UPDATA";// 游戏中，更新得分
    static ON_SETMUSICSUCC: string = "ON_SETMUSICSUCC";// 设置音乐成
    static ON_GAME_SHARE_SUCC: string = "ON_GAME_SHARE_SUCC";// 试玩界面-游戏分享成功 ------ 打开游戏，参数的id
    
}