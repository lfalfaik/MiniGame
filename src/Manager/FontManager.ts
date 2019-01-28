
class FontManager extends Singleton {

   
   public  _numberRedFont:Laya.BitmapFont;
   public  _numberBaiFont:Laya.BitmapFont;
   public  _numberHuangFont:Laya.BitmapFont;
   public  _numberLvFont:Laya.BitmapFont;








//---------------instance begin----------------------------------------------------
    public static get Instance(): FontManager  {
        if (!this._instance)  {
            this._instance = new FontManager();
        }
        return this._instance as FontManager;
    }
    private static _instance: FontManager;
}