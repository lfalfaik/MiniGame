/*
* name;
*/
class ClientTools{
    private static _localSaveDatas : Dictionary<string,string> = new Dictionary<string,string>();

    //本地存储
    public static LocalGetNum(id : string , defaultValue : number) : number
    {
        if(!Laya.LocalStorage.support)
        {
            if(ClientTools._localSaveDatas.ContainsKey(id))
            {
                return Number(ClientTools._localSaveDatas.TryGetValue(id) as string);
            }
            return defaultValue;
        }
        let str =  Laya.LocalStorage.getItem(id);
        if(str != "")
        {
            return Number(str);
        }
        return defaultValue;
    } 

    public static LocalSetNum(id : string , value : number)
    {
        if(!Laya.LocalStorage.support)
        {
            ClientTools._localSaveDatas.SetDicValue(id,value.toString());
            return;
        }
        Laya.LocalStorage.setItem(id,value.toString());
    } 

    public static LocalGetString(id : string , defaultValue : string) : string
    {
        if(!Laya.LocalStorage.support)
        {
            if(ClientTools._localSaveDatas.ContainsKey(id))
            {
                return ClientTools._localSaveDatas.TryGetValue(id) as string;
            }
            return defaultValue;
        }
        let str =  Laya.LocalStorage.getItem(id);
        if(str != "")
        {
            return str;
        }
        return defaultValue;
    } 

    public static LocalSetString(id : string , value : string)
    {
        if(!Laya.LocalStorage.support)
        {
            ClientTools._localSaveDatas.SetDicValue(id,value);
            return;
        }
        Laya.LocalStorage.setItem(id,value.toString());
    } 


    //数据转换
    public static NumToInt(num : number)
    {
        return parseInt(num.toString());
    }

    public static StrToInt(num : string)
    {
        return parseInt(num);
    }

    public static StrToFloat(num : string)
    {
        return parseFloat(num);
    }

    //json
    public static JsonStrToObj<T>(json : string) : T
    {
        //
        let returnObj : T;
        returnObj = JSON.parse(json) as T;
        return  returnObj;
    }

    public static ObjToJsonStr<T>(T) : string
    {
        let returnObj : string;
        returnObj = JSON.stringify(T);
        return returnObj;
    }

    // Set(1,2) = 5
    // Set(“姓名：”，“张三”) = 姓名：张三
   public static  SplitJointValue(a,b):void
    {
        var result = null;
        if (typeof(a) == "number" && typeof(b) == "number")
            result =  a+b;
        else if(typeof(a) == "string" && typeof(b) == "string")
            result =  a+b;
        return result;
    }



    public  static  GetNameByIndex(type:number):string
    {
        let str:string = "txt_game"+ type+"_name";
        return StringManager.Instance.GetValue(str);
    }

    public  static  GetScore(score:number)
    {
         if (score > 0)
            return "积分："+score;
        return "";
    }

    public static  GetStringList(str:string,c:string = ","):Array<string>
    {
        var list = str.split(c);
        return list;
    }

    public static  GetKeyValueOneData(str:string,c:string = ","):KeyValueData
    {
        var list = str.split(c);
        if (list != null && list.length >= 2)
        {
            let data = new KeyValueData(ClientTools.StrToInt(list[0]),ClientTools.StrToInt(list[1]));
            return data
        }
       
        return null;
    }

    public static  GetKeyValueDatas(str:string):Array<KeyValueData>
    {
        let datas:Array<KeyValueData> = new Array<KeyValueData>();
        var list = str.split(';');
        if (list != null && list.length > 0)
        {
            for(var i:number=0;i < list.length;i++)
            {
                let temp:KeyValueData = ClientTools.GetKeyValueOneData(list[i]);
                if (temp == null)
                    continue;
                datas.push(temp);
            }
        }
       
        return datas;
    }

    public static GetModelNameById(id:number,isclick:boolean = false):string
    {
        if (isclick)
            return "wenzi/lab_name_"+ id+"_press.png";
        else
            return "wenzi/lab_name_"+ id+".png";
    }

   public static GetSkinNameByID(id:number):string
    {
        return "wenzi/lab_skinname_"+ id/10+".png";

    }

    public  static  GetPathByFont(name:string):string
    {
       return "fonts/"+name+".ttf";
    }
    public  static  GetPathBySkinTex(name:string):string
    {
       return "skin/"+name+".png";
    }

    public static   GetPathPlayerHeadIcon(name:string):string
    {
       return "headIcon/"+name+".png";
    }



    public static   GetPathYinXiao(name:string):string
    {
       return "res/music/"+name+".wav";
    }
    public static   GetPathMusic(name:string):string
    {
       return "res/music/"+name+".mp3";
    }

    public static GetGamePhaseDatas(str:string):Array<ModelPhaseData>{
        var dataArr:Array<ModelPhaseData> = new Array<ModelPhaseData>();
        if(str){
            var strA:Array<string> = str.split(";");
            if(strA){
                for(var i:number = 0;i<strA.length;i++){
                    var strB:Array<string> = strA[i].split(",");
                    if(strB && strB.length>=4){
                        var data:ModelPhaseData = new ModelPhaseData(Number(strB[0]),Number(strB[1]),Number(strB[2]),strB[3]);
                        dataArr.push(data);
                    }
                }
            }
        }
        return dataArr;
    }

     public static CreatAnibyAtlas(aniPath: string, func: Function, fps: number = 30, index: number = 1): Laya.Animation {
        let ani = new Laya.Animation();
        Laya.loader.load(aniPath, Laya.Handler.create(this, () => {
            ani.loadAtlas(aniPath); // 加载图集动画
            ani.interval = fps;			// 设置播放间隔（单位：毫秒）
            ani.index = index; 				// 当前播放索引
            if (func != null) {
                func(ani);
            }
        }));
        return ani;
    }

    public static CreatAniMationByAni(aniPath : string , func : Function, fps: number = 30) : Laya.Animation {
        let ani = new Laya.Animation();
        Laya.loader.load(aniPath, Laya.Handler.create(this, () => {
            ani.loadAnimation(aniPath);
            ani.interval = fps;		
            if (func != null) {
                func(ani);
            }
        }));
        return ani;
    }
}

