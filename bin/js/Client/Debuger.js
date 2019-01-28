/*
* name;
*/
var Debuger = /** @class */ (function () {
    function Debuger() {
    }
    Debuger.LogError = function (str) {
        if (Debuger._isEdit) {
            console.log("error---------" + str.toString());
        }
    };
    Debuger.LogWorning = function (str) {
        if (Debuger._isEdit) {
            console.log("warning---------" + str.toString());
        }
    };
    Debuger.Log = function (str) {
        if (Debuger._isEdit) {
            console.log("log---------" + str.toString());
        }
    };
    Debuger._isEdit = true;
    return Debuger;
}());
//# sourceMappingURL=Debuger.js.map