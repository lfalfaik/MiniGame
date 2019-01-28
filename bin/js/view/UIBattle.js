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
    var UIBattle = /** @class */ (function (_super) {
        __extends(UIBattle, _super);
        function UIBattle() {
            var _this = _super.call(this) || this;
            _this._allcount = 3;
            _this.lab_number.font = StringDefine.FONT_BAI;
            return _this;
        }
        UIBattle.prototype.onShow = function () {
            this._score = 0;
            this._allcount = ConstDataManager.Instance.GetIntValue("txt_daojishitime", 3);
            UITools.SetActive(this.defen, false);
            this.SetScore(0);
            UITools.SetActive(this.cd, true);
            UITools.SetLab(this.lab_number, this._allcount);
            Laya.timer.loop(1000, this, this.PlayCD);
            ClientEventManager.Instance.On(ClientEvent.ON_SCORE_UPDATA, this, this.SetScore);
            ClientEventManager.Instance.On(ClientEvent.ON_GAME_TRYPLAY, this, this.OnGameTryPlay);
        };
        UIBattle.prototype.onClosed = function () {
            ClientEventManager.Instance.Off(ClientEvent.ON_SCORE_UPDATA, this, this.SetScore);
            ClientEventManager.Instance.Off(ClientEvent.ON_GAME_TRYPLAY, this, this.OnGameTryPlay);
        };
        UIBattle.prototype.OnGameTryPlay = function () {
            this.SetScore(0);
        };
        UIBattle.prototype.SetScore = function (num) {
            this._score = num;
            if (this.lab_score != null)
                UITools.SetLab(this.lab_score, num);
            ModelManager.Instance._CurScore = this._score;
            if (this._score > 0)
                MusicManager.Instance.playSound(StringDefine.SOUND_ADDSCORE);
        };
        UIBattle.prototype.PlayCD = function () {
            UITools.SetLab(this.lab_number, this._allcount - 1);
            if (this._allcount > 0) {
                this._allcount -= 1;
                if (this._allcount == 0) {
                    UITools.SetActive(this.cd, false);
                    UITools.SetActive(this.defen, true);
                    ClientEventManager.Instance.Event(ClientEvent.ON_GAME_START);
                    Laya.timer.clear(this, this.PlayCD);
                }
            }
        };
        return UIBattle;
    }(ui.UIBattleUI));
    view.UIBattle = UIBattle;
})(view || (view = {}));
//# sourceMappingURL=UIBattle.js.map