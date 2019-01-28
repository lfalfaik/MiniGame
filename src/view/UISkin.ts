/*
* name;
*/
module view{
export class UISkin extends ui.UISkinUI{
    _CurIndex:number = 0;
    _CurInfo:SkinInfo;
    _CurData:SkinData;
    _scrollview:ScrollView;
    _loackImage:Laya.Image;
    roleInfos:Array<SkinInfo>;

     private _mouseX: number = 0;
     // 商店角色图缩放大小。
    private itemMaxScale: number = 1
    private itemMinScale: number = 0.6;

     // ScrollView操作 
    // 鼠标按下
    private _mouseDown: boolean = false;
    // 鼠标移动速度
    private _mouseSpeed: number = 0;
    private _mouseStartPosX: number = 0;
    private _curMoveFrame: number = 0;

    constructor(){
        super();
        this.itemMaxScale = StringDefine.skinBigNumber;
        this.itemMinScale = StringDefine.skinSmallNumber;
    }

    onShow()
    {
        this.roleInfos =  SkinManager.Instance._Infos;
        Laya.timer.frameLoop(1, this, this.onUpdate);

        this.btn_buy.on(Laya.Event.CLICK,this,this.OnBuyBtnClick);
        this.btn_closed.on(Laya.Event.CLICK,this,this.OnClosedBtnClick);
        this.btn_used.on(Laya.Event.CLICK,this,this.OnUsedBtnClick);

        ClientEventManager.Instance.On(ClientEvent.UPDATE_JINBI, this, this.SetGoldCoin);
        ClientEventManager.Instance.On(ClientEvent.UPDATE_SKIN_USED, this, this.OnUsedSkinSucc);
        ClientEventManager.Instance.On(ClientEvent.UPDATE_SKININFO, this, this.OnUpdataInfo);

        this.setScrollView();
        this.showUI();

    }

    public onClosed():void
    {
        ClientEventManager.Instance.Off(ClientEvent.UPDATE_JINBI, this, this.SetGoldCoin);
        ClientEventManager.Instance.Off(ClientEvent.UPDATE_SKIN_USED, this, this.OnUsedSkinSucc);
        ClientEventManager.Instance.Off(ClientEvent.UPDATE_SKININFO, this, this.OnUpdataInfo);
        
        if (this._scrollview != null)
            this._scrollview.OnDestoryItems();
    }
    onClear()
    {
        this._CurData = null;
        this._CurInfo = null;
    }
    /**
     * 显示UI
     */
    public showUI() {
        this.onClear();
        // ScrollView 重置位置
        this._scrollview.pos(0, 600);
        // 显示金币
        this.showCoin();

        let cutIndex = 0;
        let cutId = PlayerManager.Instance.GetUsedSkinId();
        if (this.roleInfos != null && this.roleInfos.length > 0)
        {
             for (var i = 0; i < this.roleInfos.length; i++) {
                var roleInfo: SkinInfo = this.roleInfos[i];
                if (roleInfo == null)
                    continue;
                let tempdata:SkinData = SkinManager.Instance.GetDataByID(roleInfo._id);
                if (tempdata == null)
                    continue;
                if (tempdata.id == cutId)
                {
                    cutIndex = i;
                    break;
                }
            }
        }
        this.scrollTo(cutIndex);
    }

    SetGoldCoin()
    {

    }

    OnUsedSkinSucc(id:number)
    {
        if (this._CurInfo == null  || this._CurInfo._IsHave == false || this._CurData ==null)
            return;
        if (this._CurInfo._id == id)
            this.SetData();
    }

    OnUpdataInfo(id:number)
    {
        if (this._CurInfo == null || this._CurInfo._IsHave == false|| this._CurData == null)
            return;
        if (this._CurInfo._id == id)
            this.SetData();
    }

    SetData()
    {
        if (this._CurInfo == null || this._CurData == null)
            return;
        if (this.lab_name != null)
            this.lab_name.skin = ClientTools.GetSkinNameByID(this._CurInfo._id);
        UITools.SetActive(this.lock,this._CurInfo._IsHave == false);
        if (this._CurInfo._IsHave)
        {
            UITools.SetActive(this.openTrans,true);
            UITools.SetActive(this.closedTrans,false);

            let isused:boolean = this._CurInfo._id == PlayerManager.Instance.GetUsedSkinId();// 该皮肤是否在使用中
            if (isused)
            {
                UITools.SetActive(this.shiyongzhong,true);
                UITools.SetActive(this.lab_shiyongzhong,true);
                UITools.SetActive(this.btn_used,false);
            }
            else
            {
                 UITools.SetActive(this.shiyongzhong,false);
                 UITools.SetActive(this.lab_shiyongzhong,false);
                UITools.SetActive(this.btn_used,true);
            }
        }
        else
        {
            UITools.SetActive(this.openTrans,false);
            UITools.SetActive(this.closedTrans,true);

            if (this._CurData.get_type == GetSkinType.GoldCoinBuy)
            {
                UITools.SetActive(this.btn_buy,true);
                UITools.SetActive(this.shipin,false);
                UITools.SetLab(this.lab_buybtn,"$"+this._CurData.need_num);
            }
            else if (this._CurData.get_type == GetSkinType.ADTimeBuy)
            {
                UITools.SetActive(this.btn_buy,false);
                UITools.SetActive(this.shipin,true);
                UITools.SetLab(this.lab_shipintitle,"观看"+this._CurData.need_num+"个视频后解锁");
                UITools.SetLab(this.lab_shipinvalue,"0/"+this._CurData.need_num);
            }   
        }

    }


    onUpdate() {
        if (!this.visible) {
            return;
        }
        //Debuger.LogError(this._mouseDown+"-----------> "+this._mouseSpeed);
        if (!this._mouseDown && this._mouseSpeed != 0) {
            var direction = Math.abs(this._mouseSpeed) / this._mouseSpeed;
            var absSpeed = Math.sqrt(Math.abs(this._mouseSpeed));
            var moveDis = this._mouseSpeed;
            this.updateScrollViewPos(moveDis);
            this.updateScale();
            absSpeed = absSpeed - 0.3;
            if (absSpeed < 1) {
                absSpeed = 0;
                this._mouseSpeed = 0;
                // 居中显示 
                this.centeringControl();
            } else {
                this._mouseSpeed = absSpeed * absSpeed * direction;
            }
        }
    }

     /**
     * 设置ScrollView信息
     */
    private setScrollView() {
        this._scrollview = new ScrollView();
        this._scrollview.Init();
        this.temp.addChild(this._scrollview);
        //this.scrollViewContainer.addChild(this._scrollview);
        this.initScrollView();

        var array = [];
        let list:Array<SkinInfo> = this.roleInfos;
        if (list != null && list.length > 0)
        {
             for (var i = 0; i < list.length; i++) {
                var roleInfo: SkinInfo = list[i];
                if (roleInfo == null)
                    continue;
                let tempdata:SkinData = SkinManager.Instance.GetDataByID(roleInfo._id);
                if (tempdata == null)
                    continue;
                var skinStr: string =  ClientTools.GetPathBySkinTex(tempdata.png1);
                array.push({role:{skin: skinStr}});
            }
        }
       
        this._scrollview.array = array;
        this._scrollview.renderHandler = new Laya.Handler(this, this.onScrollRender);
        this._scrollview.mouseHandler = new Laya.Handler(this, this.onScrollMouse);
    }

      /**
     * 设置ScrollView属性
     */
    private initScrollView() {
        this._scrollview.leftAlign = 210;
        this._scrollview.rightAlign = 210;
        this._scrollview.space = 50;
        this._scrollview.cellWidth = 300;
        this._scrollview.cellHeight = 300;
        this._scrollview.itemRender = Item;
        this._scrollview.height = 1280;
        this._scrollview.anchorY = 0.5;
        this._scrollview.pos(0, 600);
    }

    /**
     * ScrollView单元格渲染回调 
     * @param cell 
     * @param index 
     */
    private onScrollRender(cell: Laya.Box, index: number){
        if (index > this.roleInfos.length) {
            return;
        }
        var item: Item = cell as Item;
        var data: any = this._scrollview.array[index];
        var roleImg: Laya.Image = item.role;
        var skinStr: string = data.role.skin;
        roleImg.skin = skinStr;

        // 设置灰色角色
        if (!this.getHadRole(index)) {
            this.grayingRole(roleImg);
        }
    }

    /**
     * ScrollView鼠标操作响应
     * @param e 
     */
    private onScrollMouse(e: string) {
        // 移动ScrollView时其中单元格缩放
        if (e == Laya.Event.MOUSE_DOWN) {
            this.mouseDown();
        } else if(e == Laya.Event.MOUSE_UP) {
            this.mouseUp();
        } else if (e == Laya.Event.MOUSE_MOVE) {
            this.mouseMove();
        }
    }

     /**
     * 鼠标按下响应事件
     */
    private mouseDown() {
        if (this._mouseDown) {
            console.error("mouse had down");
        }
        this._mouseDown = true;
        this._mouseStartPosX = Laya.MouseManager.instance.mouseX;
        this._mouseX = Laya.MouseManager.instance.mouseX;
    }

    /**
     * 鼠标抬起响应事件
     */
    private mouseUp() {
        if (!this._mouseDown) {
            return;
        }

        var stableFrame = Laya.timer.currFrame - this._curMoveFrame;
        // 滑动
        if (stableFrame > 2) {
            this._mouseSpeed = 0;
            this.centeringControl();
        }
        this._mouseDown = false;
    }

    /**
     * 鼠标移动事件响应
     */
    private mouseMove() {
        if (this._mouseDown) {
            let v:number = ConstDataManager.Instance.GetIntValue("txt_huadong_addvalue",10);
            if (this._mouseX > Laya.MouseManager.instance.mouseX)
                v = -10;
            else
                v = 10;
            var dis = Laya.MouseManager.instance.mouseX - this._mouseX +v;
            this._mouseX = Laya.MouseManager.instance.mouseX;

            this.updateScrollViewPos(dis);
            this.updateScale();

            this._curMoveFrame = Laya.timer.currFrame;
            this._mouseSpeed = dis;
        }
    }

     /**
     * 调整图像大小
     */
    private updateScale() {
        var centerIndex = this.getScreenCenterCellIndex();
        var leftIndex = Math.max(centerIndex - 1, 0);
        var rightIndex = Math.min(centerIndex + 1, this._scrollview.array.length - 1);
        var scrollPosX = this._scrollview.x;
        var centerPos = Laya.stage.width / 2 - scrollPosX;
        for (var index = leftIndex; index <= rightIndex; index++) {
            let cellPos = this._scrollview.getCellPosByIndex(index);
            let cellDis = Math.abs(cellPos - centerPos);
            if (cellDis < 180) {
                let scaleRate = this.itemMaxScale - (this.itemMaxScale - this.itemMinScale) / 180 * cellDis;
                let item: Item = this._scrollview.getItemByIndex(index) as Item;
                if (item != null && item.role != null)
                    item.role.scale(scaleRate, scaleRate);
            } else {
                let item: Item = this._scrollview.getItemByIndex(index) as Item;
                if (item != null && item.role != null)
                    item.role.scale(this.itemMinScale, this.itemMinScale)
            }
        }
    }

    /**
     * 更新ScrollView位置 
     * @param dis 
     */
    private updateScrollViewPos(dis: number) {
        var posX: number = dis + this._scrollview.x;
        if (posX > 0) {
            posX = 0;
        } 
        if (posX < -this._scrollview.width + Laya.stage.width) {
            posX = -this._scrollview.width + Laya.stage.width;
        }
        this._scrollview.pos(posX, this._scrollview.y);
    }

    public scrollTo(index:number)
    {
        var cellPosX = this.getCellPosByIndex(index);
        var posX = Laya.stage.width / 2 - cellPosX;
        Laya.Tween.to(this._scrollview, {x: posX}, 5, Laya.Ease.cubicOut).update = new Laya.Handler(this,  this.updateScale);
        this.updateScale();
        this._CurIndex = index;
        this._CurInfo = SkinManager.Instance.GetInfoByIndex(this._CurIndex);
        if (this._CurInfo == null)
            return;
        this._CurData = SkinManager.Instance.GetDataByID(this._CurInfo._id);
        this.SetData();
    }
    /**
     * 将角色居中显示
     */
    private centeringControl() {
        var centerIndex = this.getScreenCenterCellIndex()
        var cellPosX = this.getCellPosByIndex(centerIndex);
        var posX = Laya.stage.width / 2 - cellPosX;
        Laya.Tween.to(this._scrollview, {x: posX}, 500, Laya.Ease.cubicOut).update = new Laya.Handler(this,  this.updateScale);
        this.showRolePrice();
    }

    /**
     * 获取屏幕中间的单元格
     */
    public getScreenCenterCellIndex(): number {
        var distance = -this._scrollview.x;
        var index: number = (distance - this._scrollview.leftAlign + this._scrollview.space + (Laya.stage.width + this._scrollview.cellWidth) / 2 ) / (this._scrollview.cellWidth + this._scrollview.space);
        return Math.round(index) - 1;
    }

    /**
     * 根据单元格索引获取单元格位置
     * @param index 
     */
    public getCellPosByIndex(index: number):number {
        return this._scrollview.leftAlign + (index + 0.5) * this._scrollview.cellWidth + index * this._scrollview.space;
    }

    /**
     * 商店界面显示金币数量
     */
    private showCoin(){
       // this.coinNumLab.changeText(gameDataInstance.coin.toString());
    }

    /**
     * 将角色设置为灰色的。
     */
    private grayingRole(roleImg: Laya.Image): void {
        //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，灰图
        var grayscaleMat: Array<number> = [0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0];

        //创建一个颜色滤镜对象，灰图
        var grayscaleFilter: Laya.ColorFilter = new Laya.ColorFilter(grayscaleMat);

        // 灰度猩猩
        roleImg.filters = [grayscaleFilter];
    }

    /**
     * 显示角色价格 
     * 如果已经拥有，则显示开始游戏按钮 
     */
    private showRolePrice() {
        this._CurIndex = this.getScreenCenterCellIndex();
        this._CurInfo = SkinManager.Instance.GetInfoByIndex(this._CurIndex);
        if (this._CurInfo == null)
            return;
        this._CurData = SkinManager.Instance.GetDataByID(this._CurInfo._id);
        this.SetData();
    }

    /**
     * 是否拥有当前的角色
     */
    getHadRole(index:number) 
    {

        let info:SkinInfo = SkinManager.Instance.GetInfoByIndex(index);
        if (info != null)
            return info._IsHave;
        return false;
    }

    OnClosedBtnClick()
    {
        GameUIManager.Instance.removeUI(this,true);
    }

    OnBuyBtnClick()
    {
        if (this._CurInfo == null ||  this._CurInfo._IsHave == true ||this._CurData == null)
            return;
        if (this._CurData.get_type == GetSkinType.GoldCoinBuy)
        {
            if (this._CurData.need_num > PlayerManager.Instance.GetGoldCoinCount())
            {
                GameUIManager.Instance.OpenUITips("资源不足");
                Debuger.Log("金币不足");
                return;
            }
            PlayerManager.Instance.OnBuySkin(this._CurData.need_num);
            SkinManager.Instance.OnUpdataInfo(this._CurInfo._id,true);
        }
    }

    OnUsedBtnClick()
    {
        if (this._CurInfo == null || this._CurData == null || this._CurInfo._IsHave == false)
            return;
        PlayerManager.Instance.OnUsedSkin(this._CurInfo._id);
    }
}
}

/**
 * 显示皮肤资源ScrollView的单元格样式
 */
class Item extends Laya.Box {
    role: Laya.Image;
    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;

        this.graphics.drawRect(0, 0, this.width, this.height, null);
        this.anchorX = 0.5;
        this.anchorY = 0.5;

        this.role = new Laya.Image();
        this.role.width = 500;
        this.role.height = 400;
        this.role.scale(StringDefine.skinSmallNumber, StringDefine.skinSmallNumber);
        this.role.anchorX = 0.5;
        this.role.anchorY = 0.5;
        this.role.pos(this.width / 2, this.height / 2);
        let obj:Laya.Node = this.addChild(this.role);
    }

    public OnRemoveSelf()
    {
        this.removeSelf();
    }
}