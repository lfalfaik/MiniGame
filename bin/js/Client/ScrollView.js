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
var ScrollView = /** @class */ (function (_super) {
    __extends(ScrollView, _super);
    function ScrollView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 是否已经渲染过单元格
        _this._hadRender = false;
        _this._hadInit = false;
        _this._hadInitItem = false;
        // 抬起鼠标是否继续滑动
        _this._isSensitive = true;
        // 左边距
        _this._leftAlign = 0;
        // 右边距
        _this._rightAlign = 0;
        /**
         * 两个单元格之间的间隔
         */
        _this.space = 0;
        return _this;
        // ----------------------- mouse event end ------------------------
    }
    ScrollView.prototype.OnDestoryItems = function () {
        if (this._cells != null && this._cells.length > 0) {
            for (var i = 0; i < this._cells.length; i++) {
                var temp = this._cells[i];
                if (temp == null)
                    continue;
                temp.OnRemoveSelf();
            }
            this._cells.length = 0;
        }
    };
    ScrollView.prototype.Init = function () {
        this.mouseEnabled = true;
        this.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        this.on(Laya.Event.MOUSE_UP, this, this.mouseUp, [Laya.Event.MOUSE_UP]);
        this.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        this.on(Laya.Event.MOUSE_OUT, this, this.mouseUp, [Laya.Event.MOUSE_OUT]);
    };
    Object.defineProperty(ScrollView.prototype, "array", {
        /**
         * 获取数据源
         */
        get: function () {
            return this._array;
        },
        /**
        * 设置数据源
        */
        set: function (arr) {
            this._array = arr;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "itemRender", {
        /**
         * 单元格渲染器。
         * <p><b>取值：</b>
         * <ol>
         * <li>单元格类对象。</li>
         * <li> UI 的 JSON 描述。</li>
         * </ol></p>
         */
        set: function (itemRender) {
            this._itemRender = itemRender;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "renderHandler", {
        /**
         * 设置单元格渲染处理器,返回(cell:any, index:number)
         */
        set: function (hander) {
            this._renderHandler = hander;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "mouseHandler", {
        /**
         * 单元格鼠标事件处理器,返回（e:event,index:number）
         */
        set: function (hander) {
            this._mouseHandler = hander;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "selectHandler", {
        /**
         * 改变List的选择项时执行的处理器
         */
        set: function (hander) {
            this._selectHandler = hander;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "cellWidth", {
        /**
         * 获取单元格的宽
         */
        get: function () {
            return this._cellWidth;
        },
        /**
         * 设置单元格的宽
         */
        set: function (cellWidth) {
            this._cellWidth = cellWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "cellHeight", {
        /**
         * 获取单元格的高
         */
        get: function () {
            return this._cellHeight;
        },
        /**
         * 设置单元格的高
         */
        set: function (cellHeight) {
            this._cellHeight = cellHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "leftAlign", {
        get: function () {
            return this._leftAlign;
        },
        /**
         * 左边界
         */
        set: function (leftAlign) {
            this._leftAlign = leftAlign;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "rightAlign", {
        get: function () {
            return this._rightAlign;
        },
        /**
         * 右边界
         */
        set: function (rightAlign) {
            this._rightAlign = rightAlign;
        },
        enumerable: true,
        configurable: true
    });
    ScrollView.prototype.addItem = function () {
    };
    /**
     * 通过索引获取对应的单元格
     * @param index
     */
    ScrollView.prototype.getItemByIndex = function (index) {
        return this._cells[index];
    };
    /**
     * 根据单元格获取单元格的位置
     * @param cell
     */
    ScrollView.prototype.getItemIndex = function (cell) {
        for (var i = 0; i < this._cells.length; i++) {
            if (cell == this._cells[i]) {
                return i;
            }
        }
        return -1;
    };
    /**
     * 初始化ScrollView渲染，数据
     */
    ScrollView.prototype.init = function () {
        if (!this._hadInit) {
            // 初始化单元格
            this.initItems();
            // 初始化渲染
            this.initRender();
            if (this._hadInitItem && this._hadRender) {
                this._hadInit = true;
            }
        }
    };
    /**
     * 单元格响应事件
     */
    ScrollView.prototype.onCellEvent = function (event, cell) {
        var index = this.getItemIndex(cell);
        if (index == -1) {
            return;
        }
        if (this._selectHandler) {
            this._selectHandler.runWith([event, index]);
        }
    };
    /**
     * 初始化所有的Item
     */
    ScrollView.prototype.initItems = function () {
        if (!this._hadInitItem && this._itemRender != null && this._array != null && this._array.length > 0) {
            this._cells = new Array();
            for (var i = 0; i < this._array.length; i++) {
                var item = new this._itemRender(this._cellWidth, this._cellHeight);
                this._cells.push(item);
                this.addChild(item);
            }
            this._hadInitItem = true;
            this.refreshCellsPos();
        }
    };
    /**
     * 所有单元格执行渲染
     */
    ScrollView.prototype.initRender = function () {
        if (!this._hadRender && this._renderHandler != null && this._array != null && this._array.length > 0) {
            for (var i = 0; i < this._array.length; i++) {
                this._renderHandler.runWith([this._cells[i], i]);
            }
            this._hadRender = true;
        }
    };
    /**
     * 单个单元格执行渲染
     */
    ScrollView.prototype.doSingleRender = function (index) {
        if (!this._hadRender) {
            this.initRender();
            return;
        }
        if (this._renderHandler != null) {
            this._renderHandler.runWith([this._cells[index], index]);
        }
    };
    /**
     * 刷新ScrollView下Cell的位置
     */
    ScrollView.prototype.refreshCellsPos = function () {
        var cellCount = this._cells.length;
        for (var i = 0; i < cellCount; i++) {
            var cell = this._cells[i];
            var posX = this.getCellPosByIndex(i);
            cell.pos(posX, this.height / 2);
        }
        this.width = this._leftAlign + cellCount * this._cellWidth + (cellCount - 1) * this.space + this._rightAlign;
    };
    /**
     * 根据单元格索引获取单元格位置
     * @param index
     */
    ScrollView.prototype.getCellPosByIndex = function (index) {
        return this._leftAlign + (index + 0.5) * this._cellWidth + index * this.space;
    };
    // ----------------------- mouse event start ------------------------
    ScrollView.prototype.mouseDown = function () {
        if (this._mouseHandler != null) {
            var e = new Event(Laya.Event.MOUSE_DOWN);
            this._mouseHandler.runWith([e]);
        }
    };
    /**
     * 鼠标离开屏幕
     */
    ScrollView.prototype.mouseUp = function (event) {
        if (this._mouseHandler != null) {
            var e = new Event(Laya.Event.MOUSE_UP);
            this._mouseHandler.runWith([e]);
        }
    };
    /**
     * 鼠标移动
     */
    ScrollView.prototype.mouseMove = function () {
        if (this._mouseHandler != null) {
            var e = new Event(Laya.Event.MOUSE_MOVE);
            this._mouseHandler.runWith([e]);
        }
    };
    return ScrollView;
}(Laya.Box));
//# sourceMappingURL=ScrollView.js.map