/**字典数据结构类 */
// interface IDictionaryGetSet<KT, VT> {
// 	readonly [key:string] : any;
// }
var Dictionary = /** @class */ (function () {
    function Dictionary(isCache) {
        if (isCache === void 0) { isCache = true; }
        this.keys = [];
        this.values = [];
        this.catheData = {};
        this.isCache = isCache;
    }
    Object.defineProperty(Dictionary.prototype, "count", {
        get: function () {
            return this.Count();
        },
        enumerable: true,
        configurable: true
    });
    /**给字典增加一条数据,返回字典的长度 */
    Dictionary.prototype.Add = function (key, value) {
        if (this.ContainsKey(key)) {
            this.SetDicValue(key, value);
        }
        else {
            if (this.isCache) {
                this.catheData[key] = value;
            }
            this.keys.push(key);
            this.values.push(value);
            this.nElements++;
        }
        return this.nElements;
    };
    Dictionary.prototype.Remove = function (key) {
        var index = this.keys.indexOf(key, 0);
        if (index != -1) {
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
            if (this.isCache) {
                delete this.catheData[key];
            }
            this.nElements--;
        }
    };
    Dictionary.prototype.Count = function () {
        return this.keys.length;
    };
    /**直接使用SetDicValue()修改已经存在的字典数据项，并更新缓存引用 */
    Dictionary.prototype.SetDicValue = function (key, value) {
        if (!this.ContainsKey(key)) {
            var index = this.keys.indexOf(key, 0);
            this.keys[index] = key;
            this.values[index] = value;
            if (this.isCache) {
                this.catheData[key] = value;
            }
            return;
        }
        else {
            this.Add(key, value);
        }
    };
    /**
     *开启"[]"访问的情况下，缓存与字典数据为同一份，引用数据会同时修改，
     *非引用数据不能被修改，只能访问
     */
    Dictionary.prototype.TryGetValue = function (key) {
        var index = this.keys.indexOf(key, 0);
        if (index != -1) {
            return this.values[index];
        }
        return null;
    };
    Dictionary.prototype.ContainsKey = function (key) {
        var ks = this.keys;
        for (var i = 0; i < ks.length; ++i) {
            if (ks[i] == key) {
                return true;
                ;
            }
        }
        return false;
    };
    Dictionary.prototype.GetKeys = function () {
        return this.keys;
    };
    Dictionary.prototype.GetValues = function () {
        return this.values;
    };
    Dictionary.prototype.Clear = function () {
        this.keys = [];
        this.values = [];
        this.catheData = {};
        this.nElements = 0;
    };
    Dictionary.prototype.isEmpty = function () {
        return this.nElements <= 0;
    };
    return Dictionary;
}());
//# sourceMappingURL=Dictionary.js.map