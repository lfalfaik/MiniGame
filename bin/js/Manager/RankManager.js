/*
* name;
*/
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
var RankManager = /** @class */ (function (_super) {
    __extends(RankManager, _super);
    function RankManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //---------------instance end----------------------------------------------------
        _this._RankInfos = new Dictionary();
        return _this;
    }
    Object.defineProperty(RankManager, "Instance", {
        //---------------instance begin----------------------------------------------------
        get: function () {
            if (!this._instance) {
                this._instance = new RankManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    RankManager.prototype.OnGetRankInfosSucc = function () {
        this._RankInfos.Clear();
        var type = 1;
        var datas = new Array();
        var temp1 = new RankInfo(1, "玩家1", "icon", 100);
        var temp2 = new RankInfo(2, "玩家2", "icon", 99);
        var temp3 = new RankInfo(3, "玩家3", "icon", 98);
        var temp4 = new RankInfo(4, "玩家4", "icon", 97);
        var temp5 = new RankInfo(5, "玩家5", "icon", 96);
        var temp6 = new RankInfo(6, "玩家6", "icon", 95);
        var temp7 = new RankInfo(7, "玩家7", "icon", 94);
        var temp8 = new RankInfo(8, "玩家8", "icon", 93);
        var temp9 = new RankInfo(9, "玩家9", "icon", 92);
        var temp10 = new RankInfo(10, "玩家10", "icon", 91);
        var temp11 = new RankInfo(11, "玩家11", "icon", 90);
        var temp12 = new RankInfo(12, "玩家12", "icon", 89);
        var temp13 = new RankInfo(13, "玩家13", "icon", 88);
        var temp14 = new RankInfo(14, "玩家14", "icon", 87);
        var temp15 = new RankInfo(15, "玩家15", "icon", 86);
        var temp16 = new RankInfo(16, "玩家16", "icon", 85);
        var temp17 = new RankInfo(17, "玩家17", "icon", 84);
        var temp18 = new RankInfo(18, "玩家18", "icon", 83);
        var temp19 = new RankInfo(19, "玩家19", "icon", 82);
        var temp20 = new RankInfo(20, "玩家20", "icon", 81);
        datas.push(temp1);
        datas.push(temp2);
        datas.push(temp3);
        datas.push(temp4);
        datas.push(temp5);
        datas.push(temp6);
        datas.push(temp7);
        datas.push(temp8);
        datas.push(temp9);
        datas.push(temp10);
        datas.push(temp11);
        datas.push(temp12);
        datas.push(temp13);
        datas.push(temp14);
        datas.push(temp15);
        datas.push(temp16);
        datas.push(temp17);
        datas.push(temp18);
        datas.push(temp19);
        datas.push(temp20);
        var ddded = new Array();
        var my = new RankInfo(1, "我自己", "icon", 100000);
        ddded.push(new RankInfos(1, my, datas));
        ddded.push(new RankInfos(2, my, datas));
        ddded.push(new RankInfos(3, my, datas));
        ddded.push(new RankInfos(4, my, datas));
        ddded.push(new RankInfos(5, my, datas));
        ddded.push(new RankInfos(6, my, datas));
        ddded.push(new RankInfos(7, my, datas));
        ddded.push(new RankInfos(8, my, datas));
        ddded.push(new RankInfos(9, my, datas));
        ddded.push(new RankInfos(10, my, datas));
        this._RankInfos.Add(RankType.Friend, ddded);
        this._RankInfos.Add(RankType.World, ddded);
    };
    RankManager.prototype.GetRankInfosByType = function (ranktype, type) {
        if (this._RankInfos != null) {
            var list = this._RankInfos.TryGetValue(ranktype);
            if (list != null && list.length > 0) {
                for (var i = 0; i < list.length; i++) {
                    var temp = list[i];
                    if (temp == null)
                        continue;
                    if (temp._type == type) {
                        return temp;
                    }
                }
            }
        }
        return null;
    };
    RankManager.prototype.GetRankInfoByTypeAndIndex = function (ranktype, type, index) {
        var rankinfos = this.GetRankInfosByType(ranktype, type);
        if (rankinfos != null && rankinfos._list != null && rankinfos._list.length > 0) {
            if (index >= 0 && index <= rankinfos._list.length)
                return rankinfos._list[index];
        }
        return null;
    };
    return RankManager;
}(Singleton));
var RankInfos = /** @class */ (function () {
    function RankInfos(type, info, list) {
        this._type = type;
        this._myRank = info;
        this._list = list;
    }
    return RankInfos;
}());
var RankInfo = /** @class */ (function () {
    function RankInfo(rank, name, tex, score) {
        this._rank = rank;
        this._playerName = name;
        this._playerTex = tex;
        this._score = score;
    }
    RankInfo.prototype.IsMe = function () {
        if (this._rank == 2)
            return true;
        return false;
    };
    return RankInfo;
}());
//# sourceMappingURL=RankManager.js.map