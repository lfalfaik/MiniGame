/*
* name;
*/
var ClientTools = /** @class */ (function () {
    function ClientTools() {
    }
    //本地存储
    ClientTools.LocalGetNum = function (id, defaultValue) {
        if (!Laya.LocalStorage.support) {
            if (ClientTools._localSaveDatas.ContainsKey(id)) {
                return Number(ClientTools._localSaveDatas.TryGetValue(id));
            }
            return defaultValue;
        }
        var str = Laya.LocalStorage.getItem(id);
        if (str != "") {
            return Number(str);
        }
        return defaultValue;
    };
    ClientTools.LocalSetNum = function (id, value) {
        if (!Laya.LocalStorage.support) {
            ClientTools._localSaveDatas.SetDicValue(id, value.toString());
            return;
        }
        Laya.LocalStorage.setItem(id, value.toString());
    };
    ClientTools.LocalGetString = function (id, defaultValue) {
        if (!Laya.LocalStorage.support) {
            if (ClientTools._localSaveDatas.ContainsKey(id)) {
                return ClientTools._localSaveDatas.TryGetValue(id);
            }
            return defaultValue;
        }
        var str = Laya.LocalStorage.getItem(id);
        if (str != "") {
            return str;
        }
        return defaultValue;
    };
    ClientTools.LocalSetString = function (id, value) {
        if (!Laya.LocalStorage.support) {
            ClientTools._localSaveDatas.SetDicValue(id, value);
            return;
        }
        Laya.LocalStorage.setItem(id, value.toString());
    };
    //数据转换
    ClientTools.NumToInt = function (num) {
        return parseInt(num.toString());
    };
    ClientTools.StrToInt = function (num) {
        return parseInt(num);
    };
    ClientTools.StrToFloat = function (num) {
        return parseFloat(num);
    };
    //json
    ClientTools.JsonStrToObj = function (json) {
        //
        var returnObj;
        returnObj = JSON.parse(json);
        return returnObj;
    };
    ClientTools.ObjToJsonStr = function (T) {
        var returnObj;
        returnObj = JSON.stringify(T);
        return returnObj;
    };
    // Set(1,2) = 5
    // Set(“姓名：”，“张三”) = 姓名：张三
    ClientTools.SplitJointValue = function (a, b) {
        var result = null;
        if (typeof (a) == "number" && typeof (b) == "number")
            result = a + b;
        else if (typeof (a) == "string" && typeof (b) == "string")
            result = a + b;
        return result;
    };
    ClientTools.GetNameByIndex = function (type) {
        var str = "txt_game" + type + "_name";
        return StringManager.Instance.GetValue(str);
    };
    ClientTools.GetScore = function (score) {
        if (score > 0)
            return "积分：" + score;
        return "";
    };
    ClientTools.GetStringList = function (str, c) {
        if (c === void 0) { c = ","; }
        var list = str.split(c);
        return list;
    };
    ClientTools.GetKeyValueOneData = function (str, c) {
        if (c === void 0) { c = ","; }
        var list = str.split(c);
        if (list != null && list.length >= 2) {
            var data = new KeyValueData(ClientTools.StrToInt(list[0]), ClientTools.StrToInt(list[1]));
            return data;
        }
        return null;
    };
    ClientTools.GetKeyValueDatas = function (str) {
        var datas = new Array();
        var list = str.split(';');
        if (list != null && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                var temp = ClientTools.GetKeyValueOneData(list[i]);
                if (temp == null)
                    continue;
                datas.push(temp);
            }
        }
        return datas;
    };
    ClientTools.GetModelNameById = function (id, isclick) {
        if (isclick === void 0) { isclick = false; }
        if (isclick)
            return "wenzi/lab_name_" + id + "_press.png";
        else
            return "wenzi/lab_name_" + id + ".png";
    };
    ClientTools.GetSkinNameByID = function (id) {
        return "wenzi/lab_skinname_" + id / 10 + ".png";
    };
    ClientTools.GetPathByFont = function (name) {
        return "fonts/" + name + ".ttf";
    };
    ClientTools.GetPathBySkinTex = function (name) {
        return "skin/" + name + ".png";
    };
    ClientTools.GetPathPlayerHeadIcon = function (name) {
        return "headIcon/" + name + ".png";
    };
    ClientTools.GetPathYinXiao = function (name) {
        return "res/music/" + name + ".wav";
    };
    ClientTools.GetPathMusic = function (name) {
        return "res/music/" + name + ".mp3";
    };
    ClientTools.GetGamePhaseDatas = function (str) {
        var dataArr = new Array();
        if (str) {
            var strA = str.split(";");
            if (strA) {
                for (var i = 0; i < strA.length; i++) {
                    var strB = strA[i].split(",");
                    if (strB && strB.length >= 4) {
                        var data = new ModelPhaseData(Number(strB[0]), Number(strB[1]), Number(strB[2]), strB[3]);
                        dataArr.push(data);
                    }
                }
            }
        }
        return dataArr;
    };
    ClientTools.CreatAnibyAtlas = function (aniPath, func, fps, index) {
        if (fps === void 0) { fps = 30; }
        if (index === void 0) { index = 1; }
        var ani = new Laya.Animation();
        Laya.loader.load(aniPath, Laya.Handler.create(this, function () {
            ani.loadAtlas(aniPath); // 加载图集动画
            ani.interval = fps; // 设置播放间隔（单位：毫秒）
            ani.index = index; // 当前播放索引
            if (func != null) {
                func(ani);
            }
        }));
        return ani;
    };
    ClientTools.CreatAniMationByAni = function (aniPath, func, fps) {
        if (fps === void 0) { fps = 30; }
        var ani = new Laya.Animation();
        Laya.loader.load(aniPath, Laya.Handler.create(this, function () {
            ani.loadAnimation(aniPath);
            ani.interval = fps;
            if (func != null) {
                func(ani);
            }
        }));
        return ani;
    };
    ClientTools._localSaveDatas = new Dictionary();
    return ClientTools;
}());
//# sourceMappingURL=ClientTools.js.map