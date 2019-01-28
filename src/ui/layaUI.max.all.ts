
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class Game1UI extends View {
		public contentSpr:Laya.Sprite;
		public pointLbl:Laya.Label;
		public player1:Laya.Image;
		public bottomBg:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"width":720,"skin":"Game7/bg.png","height":1280}},{"type":"Sprite","props":{"y":80,"x":2,"width":720,"var":"contentSpr","name":"contentSpr","height":1200},"child":[{"type":"Label","props":{"y":68,"x":109,"width":500,"var":"pointLbl","name":"pointLbl","height":100,"fontSize":30,"color":"#000000","align":"center"}}]},{"type":"Image","props":{"y":985,"x":217,"width":100,"var":"player1","pivotY":0,"pivotX":50,"name":"player1","height":100}},{"type":"Image","props":{"y":1150,"x":360,"var":"bottomBg","skin":"Game1/t2.png","pivotY":65,"pivotX":230,"name":"bottomBg"}},{"type":"Image","props":{"y":1196,"x":0,"skin":"Game7/d.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Game1UI.uiView);

        }

    }
}

module ui {
    export class Game2UI extends View {
		public contentSpr:Laya.Sprite;
		public pointLbl:Laya.Label;
		public player1:Laya.Image;
		public column1:Laya.Image;
		public player2:Laya.Image;
		public column2:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"skin":"Game7/bg.png"}},{"type":"Sprite","props":{"y":82,"x":0,"width":720,"var":"contentSpr","name":"contentSpr","height":1200},"child":[{"type":"Label","props":{"y":68,"x":109,"width":500,"var":"pointLbl","name":"pointLbl","height":100,"fontSize":30,"color":"#000000","align":"center"}}]},{"type":"Image","props":{"y":974,"x":250,"width":100,"var":"player1","pivotY":100,"pivotX":50,"name":"player1","height":100}},{"type":"Image","props":{"y":1085,"x":250,"width":116,"var":"column1","skin":"Game2/t11.png","scaleY":1,"pivotY":110,"pivotX":58,"name":"column1","height":110,"sizeGrid":"45,0,60,0"}},{"type":"Image","props":{"y":863,"x":470,"width":100,"var":"player2","skewY":180,"pivotY":100,"pivotX":50,"name":"player2","height":100}},{"type":"Image","props":{"y":1085,"x":470,"width":116,"var":"column2","skin":"Game2/t11.png","scaleY":2,"pivotY":110,"pivotX":58,"name":"column2","height":110,"sizeGrid":"45,0,60,0"}},{"type":"Image","props":{"y":1196,"x":0,"skin":"Game7/d.png"}},{"type":"Image","props":{"y":1150,"x":360,"skin":"Game1/t2.png","pivotY":65,"pivotX":230}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Game2UI.uiView);

        }

    }
}

module ui {
    export class Game3UI extends View {
		public contentSpr:Laya.Sprite;
		public pointLbl:Laya.Label;
		public player1:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"skin":"Game7/bg.png"}},{"type":"Sprite","props":{"y":80,"x":0,"width":720,"var":"contentSpr","name":"contentSpr","height":1200},"child":[{"type":"Label","props":{"y":68,"x":109,"width":500,"var":"pointLbl","name":"pointLbl","height":100,"fontSize":30,"color":"#000000","align":"center"}}]},{"type":"Image","props":{"y":985,"x":182,"width":200,"var":"player1","scaleY":0.5,"scaleX":0.5,"pivotY":0,"pivotX":100,"name":"player1","height":200}},{"type":"Image","props":{"y":1085,"x":80,"width":559,"skin":"Game1/t2.png","height":111}},{"type":"Image","props":{"y":1196,"x":0,"skin":"Game7/d.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Game3UI.uiView);

        }

    }
}

module ui {
    export class Game4UI extends View {
		public contentSpr:Laya.Sprite;
		public pointLbl:Laya.Label;
		public player:Laya.Image;
		public column:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"skin":"Game7/bg.png"}},{"type":"Sprite","props":{"y":80,"width":720,"var":"contentSpr","name":"contentSpr","height":1200},"child":[{"type":"Label","props":{"y":68,"x":109,"width":500,"var":"pointLbl","name":"pointLbl","height":100,"fontSize":30,"color":"#000000","align":"center"}}]},{"type":"Image","props":{"y":875,"x":310,"width":200,"var":"player","scaleY":0.5,"scaleX":0.5,"pivotY":0,"pivotX":0,"name":"player","height":200}},{"type":"Image","props":{"y":1085,"x":360,"width":116,"var":"column","skin":"Game2/t11.png","scaleY":1,"pivotY":110,"pivotX":58,"name":"column","height":110,"sizeGrid":"45,0,60,0"}},{"type":"Image","props":{"y":1196,"x":0,"skin":"Game7/d.png"}},{"type":"Image","props":{"y":1085,"x":130,"skin":"Game1/t2.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Game4UI.uiView);

        }

    }
}

module ui {
    export class Game5UI extends View {
		public backgroundArea:Laya.Sprite;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Sprite","props":{"var":"backgroundArea","name":"backgroundArea"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Game5UI.uiView);

        }

    }
}

module ui {
    export class Game6UI extends View {
		public leftBg:Laya.Image;
		public midBg:Laya.Image;
		public rightBg:Laya.Image;
		public topBg:Laya.Image;
		public bottomBg:Laya.Image;
		public keyUp:Laya.Button;
		public keyDown:Laya.Button;
		public keyLeft:Laya.Button;
		public keyRight:Laya.Button;
		public armyBox:Laya.Box;
		public player:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"skin":"Game7/bg.png"}},{"type":"Image","props":{"y":640,"x":150,"width":90,"skin":"Game1/t5.png","pivotY":25,"pivotX":45,"height":50}},{"type":"Image","props":{"y":640,"x":45,"width":90,"var":"leftBg","skin":"Game1/t5.png","pivotY":25,"pivotX":45,"name":"leftBg","height":50}},{"type":"Image","props":{"y":640,"x":255,"width":90,"skin":"Game1/t5.png","pivotY":25,"pivotX":45,"height":50}},{"type":"Image","props":{"y":640,"x":360,"width":90,"var":"midBg","skin":"Game1/t5.png","pivotY":25,"pivotX":45,"name":"midBg","height":50}},{"type":"Image","props":{"y":640,"x":465,"width":90,"skin":"Game1/t5.png","pivotY":25,"pivotX":45,"height":50}},{"type":"Image","props":{"y":640,"x":570,"width":90,"skin":"Game1/t5.png","pivotY":25,"pivotX":45,"height":50}},{"type":"Image","props":{"y":640,"x":675,"width":90,"var":"rightBg","skin":"Game1/t5.png","pivotY":25,"pivotX":45,"name":"rightBg","height":50}},{"type":"Image","props":{"y":530,"x":360,"width":90,"skin":"Game1/t5.png","pivotY":25,"pivotX":45,"height":50}},{"type":"Image","props":{"y":310,"x":360,"width":90,"var":"topBg","skin":"Game1/t5.png","pivotY":25,"pivotX":45,"name":"topBg","height":50}},{"type":"Image","props":{"y":420,"x":360,"width":90,"skin":"Game1/t5.png","pivotY":25,"pivotX":45,"height":50}},{"type":"Image","props":{"y":750,"x":360,"width":90,"skin":"Game1/t5.png","pivotY":25,"pivotX":45,"height":50}},{"type":"Image","props":{"y":970,"x":360,"width":90,"var":"bottomBg","skin":"Game1/t5.png","pivotY":25,"pivotX":45,"name":"bottomBg","height":50}},{"type":"Image","props":{"y":860,"x":360,"width":90,"skin":"Game1/t5.png","pivotY":25,"pivotX":45,"height":50}},{"type":"Button","props":{"y":1000,"x":540,"width":80,"var":"keyUp","stateNum":2,"skin":"Game1/key.png","pivotY":41,"pivotX":40,"name":"keyUp","height":83}},{"type":"Button","props":{"y":1160,"x":540,"width":80,"var":"keyDown","stateNum":2,"skin":"Game1/key.png","rotation":180,"pivotY":41,"pivotX":40,"name":"keyDown","height":83}},{"type":"Button","props":{"y":1080,"x":460,"width":80,"var":"keyLeft","stateNum":2,"skin":"Game1/key.png","rotation":-90,"pivotY":41,"pivotX":40,"name":"keyLeft","height":83}},{"type":"Button","props":{"y":1080,"x":620,"width":80,"var":"keyRight","stateNum":2,"skin":"Game1/key.png","rotation":90,"pivotY":41,"pivotX":40,"name":"keyRight","height":83}},{"type":"Box","props":{"width":720,"var":"armyBox","name":"armyBox","height":1280}},{"type":"Image","props":{"y":599,"x":361,"width":125,"var":"player","skin":"skin/zhu_01.png","pivotY":50,"pivotX":63,"name":"player","height":100}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Game6UI.uiView);

        }

    }
}

module ui {
    export class Game7UI extends View {
		public player:Laya.Sprite;
		public DynMoveArea:Laya.Sprite;
		public hinderGroup:Laya.Sprite;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"Game7/bg.png"}},{"type":"Sprite","props":{"y":601,"x":109,"var":"player","name":"player"}},{"type":"Sprite","props":{"var":"DynMoveArea","name":"dynMoveArea"}},{"type":"Sprite","props":{"var":"hinderGroup","name":"hinderGroup"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Game7UI.uiView);

        }

    }
}

module ui {
    export class Game8UI extends View {
		public contentSpr:Laya.Sprite;
		public pointLbl:Laya.Label;
		public leftShot:Laya.Image;
		public rightShot:Laya.Image;
		public leftPlayer:Laya.Image;
		public rightPlayer:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"skin":"Game7/bg.png"}},{"type":"Sprite","props":{"y":90,"x":0,"width":720,"var":"contentSpr","name":"contentSpr","height":1200},"child":[{"type":"Label","props":{"y":68,"x":109,"width":500,"var":"pointLbl","name":"pointLbl","height":100,"fontSize":30,"color":"#000000","align":"center"}}]},{"type":"Image","props":{"y":500,"x":-281,"width":160,"var":"leftShot","skin":"Game1/t3.png","pivotY":21,"pivotX":80,"name":"leftShot","height":43}},{"type":"Image","props":{"y":500,"x":836,"width":160,"var":"rightShot","skin":"Game1/t4.png","pivotY":21,"pivotX":80,"name":"rightShot","height":43}},{"type":"Image","props":{"y":342,"x":-227,"width":232,"var":"leftPlayer","skewY":180,"scaleY":0.5,"scaleX":0.5,"pivotY":100,"pivotX":126,"name":"leftPlayer","height":200}},{"type":"Image","props":{"y":413,"x":851,"width":232,"var":"rightPlayer","scaleY":0.5,"scaleX":0.5,"pivotY":100,"pivotX":126,"name":"rightPlayer","height":200}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Game8UI.uiView);

        }

    }
}

module ui {
    export class Game9UI extends View {
		public contentSpr:Laya.Sprite;
		public pointLbl:Laya.Label;
		public leftShot:Laya.Image;
		public rightShot:Laya.Image;
		public leftPlayer:Laya.Image;
		public rightPlayer:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"skin":"Game7/bg.png"}},{"type":"Sprite","props":{"y":90,"x":0,"width":720,"var":"contentSpr","name":"contentSpr","height":1200},"child":[{"type":"Label","props":{"y":68,"x":109,"width":500,"var":"pointLbl","name":"pointLbl","height":100,"fontSize":30,"color":"#000000","align":"center"}}]},{"type":"Image","props":{"y":506,"x":-84,"width":160,"var":"leftShot","skin":"Game1/t3.png","pivotY":21,"pivotX":80,"name":"leftShot","height":43}},{"type":"Image","props":{"y":512,"x":831,"width":160,"var":"rightShot","skin":"Game1/t4.png","pivotY":21,"pivotX":80,"name":"rightShot","height":43}},{"type":"Image","props":{"y":425,"x":-103,"width":232,"var":"leftPlayer","skewY":180,"scaleY":0.5,"scaleX":0.5,"pivotY":100,"pivotX":126,"name":"leftPlayer","height":200}},{"type":"Image","props":{"y":437,"x":829,"width":232,"var":"rightPlayer","scaleY":0.5,"scaleX":0.5,"pivotY":100,"pivotX":126,"name":"rightPlayer","height":200}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.Game9UI.uiView);

        }

    }
}

module ui {
    export class MainViewUI extends View {
		public ui_top:Laya.Label;
		public item:Laya.Box;
		public item_bg:Laya.Image;
		public animPos:Laya.Box;
		public score_bg:Laya.Image;
		public lab_score:Laya.Label;
		public lock:Laya.Image;
		public lockTex:Laya.Image;
		public lab_name:Laya.Image;
		public ad:Laya.Box;
		public bg:Laya.Image;
		public ui_left:Laya.Label;
		public btn_left:Laya.Image;
		public ui_right:Laya.Label;
		public btn_right:Laya.Image;
		public ui_bottom:Laya.Label;
		public btn_gamestart:Laya.Image;
		public btn_tryplay:Laya.Image;
		public lab_kaishiyouxi:Laya.Image;
		public btn_rank:Laya.Image;
		public btn_share:Laya.Image;
		public btn_music:Laya.Image;
		public music_open:Laya.Image;
		public music_soundvaluelab:Laya.Label;
		public music_closed:Laya.Image;
		public btn_shengxiao:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":720,"height":1280},"child":[{"type":"Label","props":{"x":360,"var":"ui_top","top":0},"child":[{"type":"Box","props":{"y":175,"x":-238,"width":476,"var":"item","name":"item","height":766},"child":[{"type":"Image","props":{"y":-1,"x":8,"width":466,"var":"item_bg","skin":"MainView/mail_itembg.png","name":"item_bg","height":766,"sizeGrid":"30,0,93,0"}},{"type":"Box","props":{"y":28,"x":39,"width":0,"var":"animPos","renderType":"render","name":"animPos","height":0}},{"type":"Image","props":{"y":143,"x":90,"width":300,"var":"score_bg","skin":"MainView/main_score_bg.png","name":"score_bg","height":70,"sizeGrid":"7,9,10,8"}},{"type":"Label","props":{"y":153,"x":38,"width":404,"var":"lab_score","txtWidth":100,"txtHeight":100,"txtAlignment":"left","text":"1234567890","styleSkin":"font/font_bai.png","space":10,"name":"lab_score","height":109,"fontSize":48,"font":"font_red","color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":28,"x":39,"width":400,"var":"lock","skin":"tongyong/bg_mask.png","renderType":"render","name":"lock","height":640,"alpha":0.2,"sizeGrid":"6,16,10,14"}},{"type":"Image","props":{"y":247,"x":148,"var":"lockTex","skin":"MainView/main_lock.png","renderType":"render","name":"lockTex"}},{"type":"Image","props":{"y":52,"x":98,"var":"lab_name","skin":"wenzi/lab_name_1.png","name":"lab_name"}}]},{"type":"Box","props":{"y":0,"x":-320,"var":"ad","name":"ad"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":640,"var":"bg","skin":"MainView/main_guanggao_bg.png","name":"bg","height":110,"sizeGrid":"6,5,8,5"}},{"type":"Image","props":{"y":5,"x":5,"width":630,"skin":"MainView/guanggao.png","name":"guanggao","height":100}}]}]},{"type":"Label","props":{"y":640,"var":"ui_left","left":0},"child":[{"type":"Image","props":{"y":-100,"x":-2,"width":78,"var":"btn_left","skin":"MainView/main_leftrightbtn.png","name":"btn_left","height":229,"anchorY":0.5,"anchorX":0},"child":[{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}}]}]},{"type":"Label","props":{"y":640,"var":"ui_right","right":0},"child":[{"type":"Image","props":{"y":-101,"x":1,"width":78,"var":"btn_right","skin":"MainView/main_leftrightbtn.png","rotation":180,"name":"btn_right","height":229,"anchorY":0.5,"anchorX":0},"child":[{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}}]}]},{"type":"Label","props":{"x":360,"var":"ui_bottom","bottom":0},"child":[{"type":"Image","props":{"y":-235,"x":1,"width":322,"var":"btn_gamestart","skin":"tongyong/anniu_1.png","name":"btn_gamestart","height":119,"anchorY":0.5,"anchorX":0.5,"sizeGrid":"44,47,50,46"},"child":[{"type":"Image","props":{"y":27,"x":52,"skin":"wenzi/lab_kaishiyouxi.png"}},{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}}]},{"type":"Image","props":{"y":-235,"x":1,"width":322,"var":"btn_tryplay","skin":"tongyong/anniu_2.png","sizeGrid":"51,65,66,57","name":"btn_tryplay","height":119,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}},{"type":"Image","props":{"y":29,"x":101,"var":"lab_kaishiyouxi","skin":"wenzi/lab_shiwan.png","name":"lab_kaishiyouxi"}}]},{"type":"Image","props":{"y":-75,"x":-67,"width":103,"var":"btn_rank","skin":"MainView/main_rank.png","name":"btn_rank","height":122,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}}]},{"type":"Image","props":{"y":-75,"x":63,"width":103,"var":"btn_share","skin":"MainView/main_share.png","name":"btn_share","height":122,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Script","props":{"minScale":0.8,"delayTime":2,"runtime":"game.ScaleButtonScript"}}]},{"type":"Image","props":{"y":-75,"x":193,"width":103,"var":"btn_music","skin":"MainView/main_music.png","name":"btn_music","height":122,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":9,"x":78,"width":39,"var":"music_open","skin":"MainView/main_music_state.png","name":"music_open","height":38},"child":[{"type":"Label","props":{"y":-2,"x":2,"width":38,"var":"music_soundvaluelab","text":"3","name":"music_soundvaluelab","height":30,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":11,"x":84,"width":32,"var":"music_closed","skin":"MainView/main_music_jingyin.png","name":"music_closed","height":35}},{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}}]},{"type":"Image","props":{"y":-75,"x":-197,"width":103,"var":"btn_shengxiao","skin":"MainView/main_shengxiao.png","name":"btn_shengxiao","height":122,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.ScaleButtonScript",game.ScaleButtonScript);

            super.createChildren();
            this.createView(ui.MainViewUI.uiView);

        }

    }
}

module ui {
    export class UIBattleUI extends View {
		public ui_topleft:Laya.Label;
		public up:Laya.Box;
		public defen:Laya.Box;
		public lab_score:Laya.Label;
		public ui_top:Laya.Label;
		public cd:Laya.Box;
		public lab_number:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":720,"height":1280},"child":[{"type":"Label","props":{"y":10,"x":0,"var":"ui_topleft","top":0},"child":[{"type":"Box","props":{"y":0,"x":0,"var":"up"},"child":[{"type":"Box","props":{"y":12,"x":13,"var":"defen","renderType":"render","name":"defen"},"child":[{"type":"Box","props":{"y":14,"x":84,"scaleY":0.33,"scaleX":0.33,"renderType":"render"},"child":[{"type":"Label","props":{"y":-3,"x":93,"width":227,"var":"lab_score","text":"1123","stroke":0,"name":"lab_score","height":169,"fontSize":100,"color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":8,"skin":"wenzi/lab_defen.png"}}]}]}]},{"type":"Label","props":{"y":0,"x":360,"var":"ui_top"},"child":[{"type":"Box","props":{"y":497,"x":-125,"var":"cd","name":"cd"},"child":[{"type":"Image","props":{"skin":"tongyong/numbg.png","name":"bg"}},{"type":"Label","props":{"y":65,"x":0,"width":256,"var":"lab_number","text":"3","stroke":0,"name":"lab_number","height":195,"fontSize":150,"font":"font_bai","color":"#ffffff","align":"center"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.UIBattleUI.uiView);

        }

    }
}

module ui {
    export class UILoadingUI extends View {
		public star:Laya.Box;
		public ui_top:Laya.Label;
		public ui_bottom:Laya.Label;
		public bg2:Laya.Image;
		public slider:Laya.Image;
		public lab_value:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":720,"height":1280},"child":[{"type":"Box","props":{"y":109,"x":47,"var":"star","renderType":"render","name":"star"},"child":[{"type":"Image","props":{"y":188,"x":64,"width":95,"skin":"UILoading/xing1.png","scaleY":0.3,"scaleX":0.3,"pivotY":47.5,"pivotX":47.5,"name":"1","height":95}},{"type":"Image","props":{"y":117,"x":323,"width":95,"skin":"UILoading/xing1.png","scaleY":1,"scaleX":1,"pivotY":47.5,"pivotX":47.5,"name":"2","height":95}},{"type":"Image","props":{"y":118,"x":426,"width":95,"skin":"UILoading/xing1.png","scaleY":0.25,"scaleX":0.25,"pivotY":47.5,"pivotX":47.5,"name":"3","height":95}},{"type":"Image","props":{"y":194,"x":600,"width":95,"skin":"UILoading/xing1.png","scaleY":1,"scaleX":1,"pivotY":47.5,"pivotX":47.5,"name":"4","height":95}},{"type":"Image","props":{"y":375,"x":588,"width":95,"skin":"UILoading/xing1.png","scaleY":0.4,"scaleX":0.4,"pivotY":47.5,"pivotX":47.5,"name":"5","height":95}}]},{"type":"Label","props":{"y":0,"x":360,"var":"ui_top"},"child":[{"type":"Image","props":{"y":280,"x":-274,"width":557,"skin":"UILoading/logo.png","name":"logo","height":263}}]},{"type":"Label","props":{"y":1280,"x":370,"var":"ui_bottom"},"child":[{"type":"Image","props":{"y":-525,"x":-281,"width":504,"skin":"UILoading/slider_g.png","height":66,"sizeGrid":"10,10,10,10"},"child":[{"type":"Image","props":{"y":4,"x":5,"var":"bg2","skin":"UILoading/slider_f.png","name":"bg2"},"child":[{"type":"Image","props":{"y":-13,"x":-12,"width":342,"var":"slider","skin":"tongyong/bg_mask.png","renderType":"mask","name":"slider","height":80,"sizeGrid":"6,16,10,14"}}]}]},{"type":"Label","props":{"y":-591,"x":-261,"width":500,"var":"lab_value","text":"Loading(100%)","name":"lab_value","height":52,"fontSize":42,"font":"Microsoft YaHei","color":"#941a14","alpha":1,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.UILoadingUI.uiView);

        }

    }
}

module ui {
    export class UIPanelUI extends View {
		public bg:Laya.Image;
		public huawen:Laya.Image;
		public star:Laya.Box;
		public load:Laya.Box;
		public ui:Laya.Box;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"UILoading/laoding.png","name":"bg"}},{"type":"Image","props":{"y":123,"x":0,"var":"huawen","skin":"UILoading/huawen.png","name":"huawen"}},{"type":"Box","props":{"y":99,"x":37,"var":"star","renderType":"render","name":"star"},"child":[{"type":"Image","props":{"y":787.5,"x":48.5,"width":97,"skin":"UILoading/xing2.png","scaleY":1,"scaleX":1,"pivotY":58,"pivotX":48.5,"name":"1","height":116}},{"type":"Image","props":{"y":642.5,"x":75.5,"width":95,"skin":"UILoading/xing1.png","scaleY":0.8,"scaleX":0.8,"pivotY":47.5,"pivotX":47.5,"name":"2","height":95}},{"type":"Image","props":{"y":382.5,"x":87.5,"width":95,"skin":"UILoading/xing1.png","scaleY":0.4,"scaleX":0.4,"pivotY":47.5,"pivotX":47.5,"name":"3","height":95}},{"type":"Image","props":{"y":117.5,"x":71.5,"width":95,"skin":"UILoading/xing1.png","scaleY":0.3,"scaleX":0.3,"pivotY":47.5,"pivotX":47.5,"name":"4","height":95}},{"type":"Image","props":{"y":47.5,"x":47.5,"width":95,"skin":"UILoading/xing1.png","scaleY":1,"scaleX":1,"pivotY":47.5,"pivotX":47.5,"name":"5","height":95}},{"type":"Image","props":{"y":46.5,"x":433.5,"width":95,"skin":"UILoading/xing1.png","scaleY":0.3,"scaleX":0.3,"pivotY":47.5,"pivotX":47.5,"name":"6","height":95}},{"type":"Image","props":{"y":122.5,"x":601.5,"width":95,"skin":"UILoading/xing1.png","scaleY":1,"scaleX":1,"pivotY":47.5,"pivotX":47.5,"name":"7","height":95}},{"type":"Image","props":{"y":215.5,"x":565.5,"width":95,"skin":"UILoading/xing1.png","scaleY":0.3,"scaleX":0.3,"pivotY":47.5,"pivotX":47.5,"name":"8","height":95}},{"type":"Image","props":{"y":304.5,"x":596.5,"width":95,"skin":"UILoading/xing1.png","scaleY":0.4,"scaleX":0.4,"pivotY":47.5,"pivotX":47.5,"name":"9","height":95}},{"type":"Image","props":{"y":358.5,"x":569.5,"width":95,"skin":"UILoading/xing1.png","scaleY":0.5,"scaleX":0.5,"pivotY":47.5,"pivotX":47.5,"name":"10","height":95}},{"type":"Image","props":{"y":749.5,"x":589.5,"width":95,"skin":"UILoading/xing1.png","scaleY":1,"scaleX":1,"pivotY":47.5,"pivotX":47.5,"name":"11","height":95}},{"type":"Image","props":{"y":868.5,"x":396.5,"width":95,"skin":"UILoading/xing1.png","scaleY":0.4,"scaleX":0.4,"pivotY":47.5,"pivotX":47.5,"name":"12","height":95}}]},{"type":"Box","props":{"var":"load","renderType":"render","name":"load"}},{"type":"Box","props":{"y":10,"x":10,"var":"ui","renderType":"render","name":"ui"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.UIPanelUI.uiView);

        }

    }
}

module ui {
    export class UIRankUI extends View {
		public ui_topleft:Laya.Label;
		public btn_return:Laya.Image;
		public ui_top:Laya.Label;
		public topBtns:Laya.Box;
		public btn_world:Laya.Image;
		public btn_friend:Laya.Image;
		public scollview:Laya.List;
		public 1:Laya.Image;
		public me:Laya.Image;
		public lab_rank:Laya.Label;
		public lab_name:Laya.Label;
		public lab_score:Laya.Label;
		public leftbtns:Laya.List;
		public leftgrid:Laya.Box;
		public click_bg:Laya.Image;
		public click_lab:Laya.Image;
		public lab_normal:Laya.Image;
		public ui_bottom:Laya.Label;
		public myRank:Laya.Box;
		public head:Laya.Image;
		public lab_myrank:Laya.Label;
		public lab_myname:Laya.Label;
		public lab_myscore:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":720,"height":1280},"child":[{"type":"Label","props":{"var":"ui_topleft"},"child":[{"type":"Image","props":{"y":59,"x":56,"width":113,"var":"btn_return","skin":"tongyong/anniu_closed.png","name":"btn_return","height":85,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}}]}]},{"type":"Label","props":{"y":640,"x":360,"var":"ui_top"},"child":[{"type":"Image","props":{"y":-410,"x":-346,"width":688,"skin":"ui/rank_bg1.png","name":"bg","height":910,"sizeGrid":"26,25,25,25"},"child":[{"type":"Box","props":{"y":886,"x":23,"name":"down"},"child":[{"type":"Image","props":{"x":32,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":70,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":105,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":143,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":177,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":215,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":250,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":288,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":322,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":360,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":395,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":433,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":467,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":505,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":540,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"y":0,"x":575,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":612,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"skin":"ui/rank_line1.png","name":"line1"}}]},{"type":"Box","props":{"y":17,"x":26,"name":"up"},"child":[{"type":"Image","props":{"x":32,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":70,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":105,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":143,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":177,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":215,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":250,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":288,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":322,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":360,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":395,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":433,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":467,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":505,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":540,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"y":0,"x":575,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":612,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"skin":"ui/rank_line1.png","name":"line1"}}]},{"type":"Box","props":{"y":28,"x":664,"width":12,"renderType":"render","name":"right","height":836},"child":[{"type":"Image","props":{"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":36,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":71,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":106,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":141,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":178,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":215,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":250,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":286,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":322,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":357,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":394,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":430,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":468,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":501,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":539,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":575,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":611,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":647,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":684,"x":7,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":722,"x":7,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":758,"x":7,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":794,"x":7,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":830,"x":7,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}}]},{"type":"Box","props":{"y":28,"x":18,"width":12,"renderType":"render","name":"left","height":836},"child":[{"type":"Image","props":{"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":36,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":71,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":106,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":141,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":178,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":215,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":250,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":286,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":322,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":357,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":394,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":430,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":468,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":501,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":539,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":575,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":611,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":647,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":684,"x":7,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":722,"x":7,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":758,"x":7,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":794,"x":7,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":830,"x":7,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}}]}]},{"type":"Image","props":{"y":-393,"x":-168,"width":493,"skin":"ui/rank_listbg.png","sizeGrid":"14,11,17,2","height":875}},{"type":"Box","props":{"y":-531,"x":-304,"var":"topBtns","renderType":"render","name":"topBtns"},"child":[{"type":"Image","props":{"y":60,"x":461,"width":297,"var":"btn_world","skin":"tongyong/anniu_1.png","name":"btn_world","height":120,"anchorY":0.5,"anchorX":0.5,"sizeGrid":"44,47,50,46"},"child":[{"type":"Image","props":{"y":30,"x":30,"skin":"wenzi/lab_quaniqupaihangbang.png"}},{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}}]},{"type":"Image","props":{"y":58,"x":147,"width":294,"var":"btn_friend","skin":"tongyong/anniu_1_select.png","name":"btn_friend","height":116,"anchorY":0.5,"anchorX":0.5,"sizeGrid":"34,27,33,31"},"child":[{"type":"Image","props":{"y":30,"x":30,"skin":"wenzi/lab_haoyoupaihangbang.png"}},{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}}]}]},{"type":"List","props":{"y":-328,"x":-169,"width":514,"var":"scollview","repeatY":20,"renderType":"render","name":"scollview","height":800,"dataSource":"10"},"child":[{"type":"Box","props":{"y":0,"x":0,"width":485,"renderType":"render","height":60},"child":[{"type":"Image","props":{"y":0,"x":0,"width":494,"var":"1","skin":"tongyong/bg_mask.png","sizeGrid":"6,16,10,14","name":"1","height":60,"alpha":0.1}},{"type":"Image","props":{"y":0,"x":0,"width":494,"var":"me","skin":"ui/rank_huang.png","name":"me","height":60,"alpha":1,"sizeGrid":"6,6,8,8"}},{"type":"Label","props":{"y":11,"x":11,"width":60,"var":"lab_rank","text":"1","name":"lab_rank","height":49,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":27,"x":214,"width":247,"var":"lab_name","text":"WANG-DGS","pivotY":16,"pivotX":122,"overflow":"hidden","name":"lab_name","height":30,"fontSize":26,"font":"Microsoft YaHei","color":"#000000","align":"center"}},{"type":"Label","props":{"y":26,"x":381,"width":230,"var":"lab_score","text":"99999","pivotY":15,"pivotX":87,"name":"lab_score","height":30,"fontSize":26,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]}]},{"type":"Image","props":{"y":-377,"x":-156,"skin":"wenzi/lab_paiming.png"}},{"type":"List","props":{"y":-392,"x":-346,"width":192,"var":"leftbtns","spaceY":0,"spaceX":1,"repeatY":10,"repeatX":1,"name":"leftbtns","height":862},"child":[{"type":"Box","props":{"y":0,"x":0,"width":183,"var":"leftgrid","renderType":"render","name":"leftgrid","height":85},"child":[{"type":"Image","props":{"y":0,"x":0,"width":183,"var":"click_bg","skin":"ui/rank_leftbtn_select.png","name":"click_bg","height":85,"sizeGrid":"0,22,0,5"}},{"type":"Image","props":{"y":20,"x":14,"var":"click_lab","skin":"wenzi/lab_name_10_press.png","name":"click_lab"}},{"type":"Image","props":{"y":17,"x":32,"var":"lab_normal","skin":"wenzi/lab_name_8.png","scaleY":0.47,"scaleX":0.47,"name":"lab_normal"}}]}]}]},{"type":"Label","props":{"y":1280,"x":360,"var":"ui_bottom"},"child":[{"type":"Box","props":{"y":-140,"x":-346,"var":"myRank","renderType":"render","name":"myRank"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":688,"skin":"ui/rank_bg1.png","name":"bg","height":135,"sizeGrid":"26,25,25,25"},"child":[{"type":"Box","props":{"y":18,"x":45,"renderType":"render","name":"top"},"child":[{"type":"Image","props":{"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":36,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":73,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":109,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":144,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":180,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":217,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":253,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":289,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":325,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":362,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":398,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":433,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":469,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":506,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":542,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":578,"skin":"ui/rank_line1.png","name":"line1"}}]},{"type":"Box","props":{"y":111,"x":26,"renderType":"render","name":"down"},"child":[{"type":"Image","props":{"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":36,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":73,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":109,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":144,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":180,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":217,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":253,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":289,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":325,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":362,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":398,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":433,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":469,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":506,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":542,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":578,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"y":0,"x":614,"skin":"ui/rank_line1.png","name":"line1"}}]},{"type":"Box","props":{"y":17,"x":18,"renderType":"render","name":"bian"},"child":[{"type":"Image","props":{"skin":"ui/rank_line2.png"}},{"type":"Image","props":{"y":26,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":62,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":1,"x":653,"skin":"ui/rank_line2.png","rotation":90}},{"type":"Image","props":{"y":26,"x":652,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":62,"x":652,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}}]}]},{"type":"Image","props":{"y":28,"x":63,"width":79,"skin":"ui/rank_headbg.png","height":80,"sizeGrid":"5,10,7,5"}},{"type":"Image","props":{"y":31,"x":66,"width":70,"var":"head","skin":"UIRank/touxiang.png","name":"head","height":70}},{"type":"Label","props":{"y":48,"x":175,"width":102,"var":"lab_myrank","text":"11","name":"lab_myrank","height":40,"fontSize":30,"font":"Microsoft YaHei","color":"#000000","align":"center"}},{"type":"Label","props":{"y":47,"x":256,"width":290,"var":"lab_myname","text":"WANGDGS","name":"lab_myname","height":47,"fontSize":28,"font":"Microsoft YaHei","color":"#000000","align":"center"}},{"type":"Label","props":{"y":59,"x":591,"width":158,"var":"lab_myscore","text":"1000","pivotY":13,"pivotX":82,"name":"lab_myscore","height":30,"fontSize":28,"font":"Microsoft YaHei","color":"#000000","align":"center"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.ScaleButtonScript",game.ScaleButtonScript);

            super.createChildren();
            this.createView(ui.UIRankUI.uiView);

        }

    }
}

module ui {
    export class UIResultUI extends View {
		public ui_top:Laya.Label;
		public lab_title:Laya.Image;
		public lab_score:Laya.Label;
		public friend:Laya.Box;
		public player_lab:Laya.Label;
		public player_score:Laya.Label;
		public player_tex:Laya.Image;
		public ui_bottom:Laya.Label;
		public btn_return:Laya.Image;
		public btn_replay:Laya.Image;
		public btn_watchvideo:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"tongyong/bg_mask.png","name":"zhezhao1","height":1280,"alpha":0.5,"sizeGrid":"6,16,10,14"}},{"type":"Label","props":{"y":0,"x":360,"var":"ui_top"},"child":[{"type":"Image","props":{"y":231,"x":-121,"width":243,"skin":"ui/result_titlebg.png","sizeGrid":"0,17,0,18","name":"defen","height":55},"child":[{"type":"Image","props":{"y":8,"x":50,"var":"lab_title","skin":"wenzi/lab_bencidefen.png","name":"lab_title"}}]},{"type":"Label","props":{"y":324,"x":-360,"width":720,"var":"lab_score","text":"1234567890","name":"lab_score","height":120,"fontSize":100,"font":"font_lv","color":"#5fd07f","align":"center"}},{"type":"Image","props":{"y":504,"x":-360,"width":720,"skin":"tongyong/bg_mask.png","name":"zhezhao2","height":196,"alpha":0.2,"sizeGrid":"6,16,10,14"}},{"type":"Box","props":{"y":548,"x":-116,"var":"friend","name":"friend","alpha":1},"child":[{"type":"Label","props":{"y":41,"x":76,"width":104,"var":"player_lab","text":"上山打老虎","name":"player_lab","height":42,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff"}},{"type":"Label","props":{"y":85,"x":77,"width":253,"var":"player_score","text":"224","name":"player_score","height":42,"fontSize":30,"font":"font_huang","color":"#deec3a"}},{"type":"Image","props":{"y":45,"x":-10,"width":79,"skin":"ui/rank_headbg.png","name":"touxiangdi","height":80,"sizeGrid":"5,10,7,5"}},{"type":"Image","props":{"y":48,"x":-7,"width":70,"var":"player_tex","skin":"headIcon/head_1.jpg","name":"player_tex","height":70}},{"type":"Image","props":{"y":-9,"x":-12,"skin":"wenzi/lab_chaoyuehaoyou.png"}}]}]},{"type":"Label","props":{"y":1280,"x":360,"var":"ui_bottom"},"child":[{"type":"Image","props":{"y":-270,"x":-97,"width":159,"var":"btn_return","skin":"tongyong/anniu_3.png","name":"btn_return","height":64,"anchorY":0.5,"anchorX":0.5,"sizeGrid":"22,20,18,19"},"child":[{"type":"Image","props":{"y":15,"x":12,"width":31,"skin":"ui/icon_shouye.png","name":"shouye","height":31}},{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}},{"type":"Image","props":{"y":22,"x":51,"skin":"wenzi/lab_fanhuishouye.png","name":"lab_tfanhuishouye"}}]},{"type":"Image","props":{"y":-270,"x":98,"width":159,"var":"btn_replay","skin":"tongyong/anniu_3.png","name":"btn_replay","height":64,"anchorY":0.5,"anchorX":0.5,"sizeGrid":"22,20,18,19"},"child":[{"type":"Image","props":{"y":15,"x":12,"width":31,"skin":"ui/icon_fanhui.png","name":"chongwan","height":31}},{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}},{"type":"Image","props":{"y":20,"x":48,"skin":"wenzi/lab_chongwanyiju.png"}}]},{"type":"Image","props":{"y":-408,"x":0,"width":353,"var":"btn_watchvideo","skin":"tongyong/anniu_1.png","name":"btn_watchvideo","height":120,"anchorY":0.5,"anchorX":0.5,"sizeGrid":"44,47,50,46"},"child":[{"type":"Image","props":{"y":31,"x":28,"skin":"wenzi/lab_guankan.png"}},{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.ScaleButtonScript",game.ScaleButtonScript);

            super.createChildren();
            this.createView(ui.UIResultUI.uiView);

        }

    }
}

module ui {
    export class UISkinUI extends View {
		public ui_top:Laya.Label;
		public lab_name:Laya.Image;
		public temp:Laya.Box;
		public lock:Laya.Image;
		public ui_bottom:Laya.Label;
		public closedTrans:Laya.Label;
		public shipin:Laya.Box;
		public lab_shipintitle:Laya.Label;
		public lab_shipinvalue:Laya.Label;
		public btn_buy:Laya.Image;
		public lab_buybtn:Laya.Label;
		public openTrans:Laya.Label;
		public btn_used:Laya.Image;
		public shiyongzhong:Laya.Image;
		public lab_shiyongzhong:Laya.Image;
		public ui_top_left:Laya.Label;
		public btn_closed:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":720,"height":1280},"child":[{"type":"Label","props":{"y":0,"x":360,"var":"ui_top"},"child":[{"type":"Image","props":{"y":276,"x":-53,"var":"lab_name","skin":"wenzi/lab_skinname_1.png","name":"lab_name"}},{"type":"Box","props":{"y":521,"x":-17,"width":1,"var":"temp","pivotY":521,"pivotX":343,"name":"temp","height":1}},{"type":"Image","props":{"y":528,"x":-94,"var":"lock","skin":"MainView/main_lock.png","name":"lock"}}]},{"type":"Label","props":{"y":1280,"x":360,"var":"ui_bottom"},"child":[{"type":"Label","props":{"y":-560,"x":0,"var":"closedTrans","name":"closedTrans"},"child":[{"type":"Box","props":{"y":-484,"x":-200,"var":"shipin","name":"shipin"},"child":[{"type":"Image","props":{"y":0,"x":-10,"skin":"ui/jiesuo_bg.png"}},{"type":"Label","props":{"y":13,"x":33,"var":"lab_shipintitle","text":"观看五个视频后解锁","name":"lab_shipintitle","fontSize":36,"font":"pig","color":"#000000"}},{"type":"Label","props":{"y":55,"x":24,"width":317,"var":"lab_shipinvalue","text":"3/5","name":"lab_shipinvalue","height":36,"fontSize":36,"font":"pig","color":"#ffffff","align":"center"}}]},{"type":"Image","props":{"y":202,"x":3,"width":321,"var":"btn_buy","skin":"tongyong/anniu_1.png","name":"btn_buy","height":120,"anchorY":0.5,"anchorX":0.5,"sizeGrid":"44,47,50,46"},"child":[{"type":"Label","props":{"y":34,"x":-5,"width":333,"var":"lab_buybtn","text":"$100","strokeColor":"#8e2a17","stroke":6,"name":"lab_buybtn","height":52,"fontSize":36,"font":"pig","color":"#ffffff","align":"center"}},{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}}]}]},{"type":"Label","props":{"y":-560,"x":0,"var":"openTrans"},"child":[{"type":"Image","props":{"y":201,"x":5,"width":321,"var":"btn_used","skin":"tongyong/anniu_1.png","name":"btn_used","height":120,"anchorY":0.5,"anchorX":0.5,"sizeGrid":"44,47,50,46"},"child":[{"type":"Image","props":{"y":27,"x":89,"skin":"wenzi/lab_shiyong.png"}},{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}}]},{"type":"Image","props":{"y":149,"x":-150,"width":309,"var":"shiyongzhong","skin":"ui/skin_bg_shiyongzhong.png","sizeGrid":"25,53,20,62","name":"btn_shiyongzhong","height":96,"alpha":0.2}},{"type":"Image","props":{"y":172,"x":-70,"var":"lab_shiyongzhong","skin":"wenzi/lab_shiyongzhong.png","name":"lab_shiyongzhong"}}]}]},{"type":"Label","props":{"y":0,"x":0,"var":"ui_top_left"},"child":[{"type":"Image","props":{"y":59,"x":-1,"width":113,"var":"btn_closed","skin":"tongyong/anniu_closed.png","name":"btn_closed","height":85,"anchorY":0.5,"anchorX":0},"child":[{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.ScaleButtonScript",game.ScaleButtonScript);

            super.createChildren();
            this.createView(ui.UISkinUI.uiView);

        }

    }
}

module ui {
    export class UITipsUI extends View {
		public item:Laya.Image;
		public lab:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":500,"var":"item","skin":"tongyong/titps.png","name":"item","height":100,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":2,"x":-1,"width":493,"var":"lab","text":"我是一个tips我是一个tips","name":"lab","height":66,"fontSize":40,"font":"Microsoft YaHei","color":"#000000","anchorY":0.5,"anchorX":0.5,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.UITipsUI.uiView);

        }

    }
}

module ui {
    export class UITryPlayUI extends View {
		public ui_top:Laya.Label;
		public btn_share:Laya.Image;
		public btn_closed:Laya.Image;
		public lab_desc:Laya.Label;
		public btn_ad:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"tongyong/bg_mask.png","name":"zhezhao1","height":1280,"alpha":0.5,"sizeGrid":"6,16,10,14"}},{"type":"Label","props":{"y":0,"x":360,"var":"ui_top"},"child":[{"type":"Image","props":{"y":66,"x":-346,"width":688,"skin":"ui/rank_bg1.png","name":"bg","height":1052,"sizeGrid":"26,25,25,25"},"child":[{"type":"Box","props":{"y":26,"x":664,"width":13,"renderType":"render","name":"right","height":977},"child":[{"type":"Image","props":{"y":35,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":70,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":108,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":143,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":178,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":213,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":251,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":286,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":324,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":359,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":397,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":432,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":467,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":502,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":540,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":575,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":610,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":645,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":683,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":718,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":753,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":788,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":826,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":861,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":898,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":936,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":971,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}}]},{"type":"Box","props":{"y":18,"x":28,"renderType":"render","name":"top"},"child":[{"type":"Image","props":{"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":35,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":71,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":106,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":144,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":179,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":215,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":250,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":288,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":323,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":359,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":394,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":432,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":467,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":503,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":538,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":575,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":610,"skin":"ui/rank_line1.png","name":"line1"}}]},{"type":"Box","props":{"y":1029,"x":24,"renderType":"render","name":"down"},"child":[{"type":"Image","props":{"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":35,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":71,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":106,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":144,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":179,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":215,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":250,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":288,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":323,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":359,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":394,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":432,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":467,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":503,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":538,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":575,"skin":"ui/rank_line1.png","name":"line1"}},{"type":"Image","props":{"x":610,"skin":"ui/rank_line1.png","name":"line1"}}]},{"type":"Box","props":{"y":26,"x":18,"width":13,"renderType":"render","name":"left","height":977},"child":[{"type":"Image","props":{"y":35,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":70,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":108,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":143,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":178,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":213,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":251,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":286,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":324,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":359,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":397,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":432,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":467,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":502,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":540,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":575,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":610,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":645,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":683,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":718,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":753,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":788,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":826,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":861,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":898,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":936,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"y":971,"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}},{"type":"Image","props":{"x":6,"skin":"ui/rank_line1.png","rotation":90,"name":"line1"}}]}]},{"type":"Image","props":{"y":893,"x":1,"width":313,"var":"btn_share","skin":"tongyong/anniu_3.png","sizeGrid":"22,20,18,19","name":"btn_share","height":100,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}},{"type":"Image","props":{"y":26,"x":72,"skin":"wenzi/lab_fenxiangshiwan.png","name":"lab_fenxiangshiwan"}}]},{"type":"Image","props":{"y":280,"x":-223,"width":446,"skin":"ui/tryplay_texbg.png","name":"kuang","height":534,"sizeGrid":"7,7,9,7"}},{"type":"Image","props":{"y":120,"x":264,"width":83,"var":"btn_closed","skin":"tongyong/anniu_closed02.png","name":"btn_closed","height":115,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}}]},{"type":"Label","props":{"y":208,"x":-210,"width":720,"var":"lab_desc","text":"100","name":"lab_desc","height":48,"fontSize":10,"font":"font_red","color":"#000000","align":"center"}},{"type":"Image","props":{"y":1013,"x":1,"width":313,"var":"btn_ad","skin":"tongyong/anniu_3.png","name":"btn_ad","height":100,"anchorY":0.5,"anchorX":0.5,"sizeGrid":"22,20,18,19"},"child":[{"type":"Script","props":{"runtime":"game.ScaleButtonScript"}},{"type":"Image","props":{"y":32,"x":35,"skin":"wenzi/lab_shiwan_kanguanggao.png"}}]},{"type":"Image","props":{"y":298,"x":-209,"width":418,"skin":"ui/guanggaotu.png","name":"guanggaotu","height":499}},{"type":"Image","props":{"y":136,"x":-272,"skin":"wenzi/lab_jiesuotiaojian.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.ScaleButtonScript",game.ScaleButtonScript);

            super.createChildren();
            this.createView(ui.UITryPlayUI.uiView);

        }

    }
}
