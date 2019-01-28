/*
* name;
*/
module view {
    export class UILoading extends ui.UILoadingUI {
    _slider:Laya.Image;
    _lab:Laya.Label;
    _maxWidth:number = 504;
    _oneValue:any = 0;
    constructor(){
        super();
         this.onShow();
         UITools.SetActive(this.star,false);
    }

    onShow(): void {
        this._maxWidth = 504;
        this._slider = this.slider;
        this._lab = this.lab_value;
        this._oneValue = this._maxWidth/100;// 一份有多少
    }

    public setProgress(value: number): void {
        this._lab.text =  "Loading "+ Math.floor(value * 100) + "%";
        if (this._slider != null)
        {
            let w :number = this._oneValue*Math.floor(value * 100) 
            this._slider.width = w;

            if (this._slider.width >= this._maxWidth) {
                this._slider.width = this._maxWidth;
            }
        }
    }
}
}