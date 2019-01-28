/*
* name;
*/
var UITools = /** @class */ (function () {
    function UITools() {
    }
    // 设置obj的显示
    UITools.SetActive = function (obj, isaicive) {
        if (obj == null)
            return;
        obj.visible = isaicive;
    };
    // 设置image   bin下的路径
    UITools.SetImage = function (obj, path) {
        if (obj == null)
            return;
        obj.skin = path;
    };
    // 添加btn监听事件
    // public static AddOnclick(btn: any, listener: Function, args?: Array<any>): void {
    //      btn.on(Laya.Event.CLICK, this, listener, args);
    // }
    // 添加bab监听事件
    UITools.AddOnclickTab = function (btn, listener, args) {
        if (btn != null) {
            btn.on(Laya.Event.SELECT, this, listener, args);
        }
    };
    // 设置tab的索引
    UITools.SetTabSelectIndex = function (btn, index) {
        if (btn != null) {
            btn.selectedIndex = index;
        }
    };
    //清空lab
    UITools.ClearLab = function (lable) {
        if (lable == null)
            return;
        lable.text = "";
    };
    // 设置lab
    UITools.SetLab = function (lable, text) {
        if (lable == null) {
            console.log("lable 是null   " + text);
            return;
        }
        if (text == null)
            UITools.ClearLab(lable);
        else
            lable.text = text;
    };
    // 设置 btn的lab
    UITools.SetLabByButton = function (btn, text) {
        if (btn == null) {
            console.log("btn 是null   " + text);
            return;
        }
        btn.label = text;
    };
    //  设置 tab的lab
    UITools.SetTabLab = function (tab, text1, text2, text3) {
        if (tab == null) {
            console.log("tab 是null   ");
            return;
        }
        var str = text1 + "," + text2;
        //str = (text3 !== undefined ? str+","+text3:str);三木运算符
        if (text3 != undefined) // 未定义参数
         {
            str = str + "," + text3;
        }
        tab.labels = str;
    };
    UITools.SetTransfromPos = function (obj, x, y) {
        if (obj == null)
            return;
        obj.pos(x, y);
    };
    // 1,2,3,4,5,6  返回值 21
    UITools.addNum = function (a, b) {
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
        var total = a + b;
        for (var i = 0; i < rest.length; i++) {
            total += rest[i];
        }
        return total;
    };
    return UITools;
}());
//# sourceMappingURL=UITools.js.map