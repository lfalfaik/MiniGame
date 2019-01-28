class GameConfig {
    public static DeviceW: number = 1280;
    public static DeviceH: number = 720;

    public static DesginW: number = 1280;
    public static DesginH: number = 720;

    public static Scale: number = 1;
    public static scaleW: number = 1;
    public static scaleH: number = 1;

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

    public static initResize(): void {
        GameConfig.onResize();
        //Laya.Browser.window.addEventListener("resize", this.onWindowResize);
        //Laya.stage.on(Laya.Event.RESIZE, null, this.onWindowResize);
    }

    static onResize(): void {
        var bw: number;
        var bh: number;
        if (Laya.Browser.clientHeight > Laya.Browser.clientWidth) {
            bw = Laya.Browser.clientHeight;
            bh = Laya.Browser.clientWidth;
        }
        else {
            bw = Laya.Browser.clientWidth;
            bh = Laya.Browser.clientHeight;
        }

        var scaleRatio: number = bw / bh;
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
    }

    public static uiResize(uiNode): void {
        if (uiNode != null) {
            var value: number = 0;
            if (GameConfig.scaleH > GameConfig.scaleW) {
                value = (GameConfig.scaleH - GameConfig.scaleW);
                //console.log("+++++ " + GameConfig.scaleW + "    " + GameConfig.scaleH + "    " + GameConfig.Scale);
                uiNode.scale(1 - value, 1, true);
            } else if (GameConfig.scaleH < GameConfig.scaleW) {
                value = (GameConfig.scaleW - GameConfig.scaleH) / 2;
                //console.log("===== " + GameConfig.scaleW + "    " + GameConfig.scaleH + "    " + GameConfig.Scale);
            }
        }
    }
}