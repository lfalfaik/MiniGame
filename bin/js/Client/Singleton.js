/**
 * 所有单例的基类，做了单例的基础检查。所有子类最好都写一个getInstance的静态方法来获取
 */
var Singleton = /** @class */ (function () {
    function Singleton() {
        var clazz = this["constructor"];
        //为空时，表示浏览器不支持这样读取构造函数
        if (!clazz)
            return;
        // 防止重复实例化
        if (Singleton.classKeys.indexOf(clazz) != -1)
            throw new Error(this + " 只允许实例化一次！");
        else {
            Singleton.classKeys.push(clazz);
            Singleton.classValues.push(this);
        }
    }
    Object.defineProperty(Singleton, "Instance", {
        /**
         * 获取实例的静态方法实例
         * @return
         *
         */
        get: function () {
            if (!this.instance) {
                this.instance = new Singleton();
            }
            return this.instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 销毁方法。事实上单例是很少进行销毁的
     */
    Singleton.prototype.destroy = function (o) {
        if (o === void 0) { o = null; }
        this.onDestroy();
        Singleton.removeInstance(this["constructor"]);
    };
    /**
     * 子类重写的方法
     */
    Singleton.prototype.onDestroy = function () {
    };
    /**
     * 删除单例的实例（不对单例本身做任何的销毁，只是删除他的引用）
     * @param clazz 单例的Class对象
     *
     */
    Singleton.removeInstance = function (clazz) {
        var index = this.classKeys.indexOf(clazz);
        if (index == -1) {
            return null;
        }
        this.classKeys.splice(index, 1);
        this.classValues.splice(index, 1);
    };
    /**
     * 是否存放有这个构造函数
     * @param clazz 构造函数
     * @return {boolean}
     */
    Singleton.getFunValue = function (clazz) {
        var funs = this.classKeys;
        var length = funs.length;
        for (var i = 0; i < length; i++) {
            if (clazz == funs[i])
                return this.classValues[i];
        }
        return null;
    };
    /**
     * 获取单例类，若不存在则创建.所有的单例创建的时候，都必须使用这个方法来创建，这样可以做到统一管理单例
     * @param clazz 任意需要实现单例效果的类
     * @return
     *
     */
    Singleton.getInstanceOrCreate = function (clazz) {
        var obj = this.getFunValue(clazz);
        if (obj) {
            return obj;
        }
        obj = new clazz();
        //不是Singleton的子类，则手动添加Singleton构造器会自动添加到classMap
        if (!(obj instanceof Singleton)) {
            this.classKeys.push(clazz);
            this.classValues.push(obj);
        }
        return obj;
    };
    //其实实际的开发项目中，不一定会用到数组，有可能会把数组之类的进行封装
    /** 存放初始化过的构造函数,这里用数组来存放构造函数 **/
    Singleton.classKeys = [];
    Singleton.classValues = [];
    return Singleton;
}());
//# sourceMappingURL=Singleton.js.map