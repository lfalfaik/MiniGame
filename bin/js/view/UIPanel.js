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
var view;
(function (view) {
    var UIPanel = /** @class */ (function (_super) {
        __extends(UIPanel, _super);
        function UIPanel() {
            var _this = _super.call(this) || this;
            _this.ShowUILoadingStar();
            _this.ShowStar();
            UITools.SetActive(_this.ui, false);
            UITools.SetActive(_this.load, false);
            return _this;
        }
        UIPanel.prototype.onClear = function () {
            this.scaleValue = 0;
            UITools.SetActive(this.star, false);
        };
        UIPanel.prototype.onShow = function (uiname) {
            if (uiname === void 0) { uiname = UIName.UIOther; }
            this.onClear();
            UITools.SetActive(this.huawen, uiname != UIName.UILoading);
            UITools.SetActive(this.ui, uiname == UIName.UIOther);
            UITools.SetActive(this.load, uiname == UIName.UILoading);
        };
        UIPanel.prototype.ShowUILoadingStar = function () {
            // 星星类型1 : UILoading/xing1.png  95,95
            // 星星类型2 : UILoading/xing2.png  97,116
            var list = new Array();
            list.push(new starData(1, 64, 188, 0.3, 10)); // 1
            list.push(new starData(1, 323, 117, 1, 12)); // 2
            list.push(new starData(1, 426, 118, 0.2, 10)); // 3
            list.push(new starData(1, 600, 194, 1, 20)); // 4
            list.push(new starData(1, 588, 375, 0.4, 10)); // 5
            this.CreatItems(this.load, list);
        };
        UIPanel.prototype.ShowStar = function () {
            // 星星类型1 : UILoading/xing1.png  95,95
            // 星星类型2 : UILoading/xing2.png  97,116
            var list = new Array();
            list.push(new starData(2, 85, 886, 1, 15)); // 1
            list.push(new starData(1, 112, 741, 0.8, 12)); // 2
            list.push(new starData(1, 124, 481, 0.4, 20)); // 3
            list.push(new starData(1, 108, 216, 0.3, 20)); // 4
            list.push(new starData(1, 84, 146, 1, 15)); // 5
            list.push(new starData(1, 470, 145, 0.3, 20)); // 6
            list.push(new starData(1, 638, 221, 1, 15)); // 7
            list.push(new starData(1, 602, 314, 0.3, 20)); // 8
            list.push(new starData(1, 633, 403, 0.4, 20)); // 9
            list.push(new starData(1, 606, 457, 0.5, 20)); // 10
            list.push(new starData(1, 626, 848, 1, 15)); // 11
            list.push(new starData(1, 433, 967, 0.4, 20)); // 12
            this.CreatItems(this.ui, list);
        };
        UIPanel.prototype.CreatItems = function (parent, list) {
            if (list != null && list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    var temp = list[i];
                    if (temp == null)
                        continue;
                    var itemP = new UIStarItem();
                    parent.addChild(itemP);
                    if (temp._mType == 1) {
                        itemP.Show("UILoading/xing1.png", 95, 95, temp._nposX, temp._nposY, temp._nscale, temp._ndelay);
                    }
                    else {
                        itemP.Show("UILoading/xing2.png", 97, 116, temp._nposX, temp._nposY, temp._nscale, temp._ndelay);
                    }
                }
            }
        };
        return UIPanel;
    }(ui.UIPanelUI));
    view.UIPanel = UIPanel;
})(view || (view = {}));
var UIStarItem = /** @class */ (function (_super) {
    __extends(UIStarItem, _super);
    function UIStarItem() {
        var _this = _super.call(this) || this;
        _this._mZheng = false; // 0-1正      1-0反 默认是反
        _this._murl = "";
        _this._mwidth = 0;
        _this._mheight = 0;
        _this._mposX = 0;
        _this._mposY = 0;
        _this._mscale = 0;
        _this._mdelay = 0;
        _this._mscaleValue = 0;
        _this._mZheng = false;
        return _this;
    }
    UIStarItem.prototype.Show = function (url, width, height, x, y, scale, delay) {
        this._murl = url;
        this._mwidth = width;
        this._mheight = height;
        this._mposX = x;
        this._mposY = y;
        this._mscale = scale;
        this._mdelay = delay;
        this._mscaleValue = this._mscale;
        this._mZheng = false;
        this.loadImage(url, 0, 0, 0, 0);
        this.scale(scale, scale);
        this.width = this._mwidth;
        this.height = this._mheight;
        this.pos(this._mposX, this._mposY);
        this.height = this._mheight;
        this.pivot(this._mwidth / 2, this._mheight / 2);
        Laya.timer.frameLoop(this._mdelay, this, this.PlayAnim);
    };
    UIStarItem.prototype.PlayAnim = function () {
        if (this._mZheng) {
            this._mscaleValue += 0.1;
            if (this._mscaleValue >= this._mscale)
                this._mZheng = false;
        }
        else {
            this._mscaleValue -= 0.1;
            if (this._mscaleValue <= 0)
                this._mZheng = true;
        }
        this.scale(this._mscaleValue, this._mscaleValue);
        this.alpha = this._mscaleValue;
    };
    return UIStarItem;
}(Laya.Image));
var starData = /** @class */ (function () {
    function starData(t, x, y, s, d) {
        this._mType = t;
        this._nposX = x;
        this._nposY = y;
        this._nscale = s;
        this._ndelay = d;
    }
    return starData;
}());
//# sourceMappingURL=UIPanel.js.map