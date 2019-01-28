var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    // static onWindowResize(): void {
    //     GameConfig.onResize();
    //     if(GameUIManager.Instance.uiMainView != null)
    //     {
    //         GameConfig.uiResize(GameUIManager.Instance.uiMainView.ui_top);
    //         GameConfig.uiResize(GameUIManager.Instance.uiMainView.ui_left);
    //         GameConfig.uiResize(GameUIManager.Instance.uiMainView.ui_right);
    //         GameConfig.uiResize(GameUIManager.Instance.uiMainView.ui_bottom);
    //     }
    // }
    GameConfig.initResize = function () {
        GameConfig.onResize();
        //Laya.Browser.window.addEventListener("resize", this.onWindowResize);
        //Laya.stage.on(Laya.Event.RESIZE, null, this.onWindowResize);
    };
    GameConfig.onResize = function () {
        var bw;
        var bh;
        if (Laya.Browser.clientHeight > Laya.Browser.clientWidth) {
            bw = Laya.Browser.clientHeight;
            bh = Laya.Browser.clientWidth;
        }
        else {
            bw = Laya.Browser.clientWidth;
            bh = Laya.Browser.clientHeight;
        }
        var scaleRatio = bw / bh;
        this.DeviceW = Math.min(bw, this.DesginW);
        this.DeviceH = Math.min(bh, this.DesginH);
        this.scaleW = bw / this.DesginW;
        this.scaleH = bh / this.DesginH;
        this.Scale = Math.min(this.scaleW, this.scaleH);
        if (this.scaleW < this.scaleH) {
            this.DeviceW = this.DeviceH * scaleRatio;
        }
        else if (this.scaleW > this.scaleH) {
            this.DeviceH = this.DeviceW / scaleRatio;
        }
        this.scaleW = this.DeviceW / this.DesginW;
        this.scaleH = this.DeviceH / this.DesginH;
        this.Scale = Math.min(this.scaleW, this.scaleH);
    };
    GameConfig.uiResize = function (uiNode) {
        if (uiNode != null) {
            var value = 0;
            if (GameConfig.scaleH > GameConfig.scaleW) {
                value = (GameConfig.scaleH - GameConfig.scaleW);
                //console.log("+++++ " + GameConfig.scaleW + "    " + GameConfig.scaleH + "    " + GameConfig.Scale);
                uiNode.scale(1 - value, 1, true);
            }
            else if (GameConfig.scaleH < GameConfig.scaleW) {
                value = (GameConfig.scaleW - GameConfig.scaleH) / 2;
                //console.log("===== " + GameConfig.scaleW + "    " + GameConfig.scaleH + "    " + GameConfig.Scale);
            }
        }
    };
    GameConfig.DeviceW = 1280;
    GameConfig.DeviceH = 720;
    GameConfig.DesginW = 1280;
    GameConfig.DesginH = 720;
    GameConfig.Scale = 1;
    GameConfig.scaleW = 1;
    GameConfig.scaleH = 1;
    return GameConfig;
}());
//# sourceMappingURL=GameConfig.js.map