/*
* name;
*/


class RankManager  extends Singleton{

    //---------------instance begin----------------------------------------------------
    public static get Instance():RankManager
    {
        if(!this._instance)
        {
            this._instance = new RankManager();
        }
        return this._instance as RankManager;
    }
    private static _instance:RankManager;
    //---------------instance end----------------------------------------------------

   public  _RankInfos : Dictionary<number,Array<RankInfos>> = new Dictionary<number,Array<RankInfos>>();

   public  OnGetRankInfosSucc()
   {
       this._RankInfos.Clear();
       let type:number = 1;
       let datas : Array<RankInfo> = new Array<RankInfo>();
       let temp1:RankInfo = new  RankInfo(1,"玩家1","icon",100);
       let temp2:RankInfo = new  RankInfo(2,"玩家2","icon",99);
       let temp3:RankInfo = new  RankInfo(3,"玩家3","icon",98);
       let temp4:RankInfo = new  RankInfo(4,"玩家4","icon",97);
       let temp5:RankInfo = new  RankInfo(5,"玩家5","icon",96);
       let temp6:RankInfo = new  RankInfo(6,"玩家6","icon",95);
       let temp7:RankInfo = new  RankInfo(7,"玩家7","icon",94);
       let temp8:RankInfo = new  RankInfo(8,"玩家8","icon",93);
       let temp9:RankInfo = new  RankInfo(9,"玩家9","icon",92);
       let temp10:RankInfo = new  RankInfo(10,"玩家10","icon",91);
       let temp11:RankInfo = new  RankInfo(11,"玩家11","icon",90);
       let temp12:RankInfo = new  RankInfo(12,"玩家12","icon",89);
       let temp13:RankInfo = new  RankInfo(13,"玩家13","icon",88);
       let temp14:RankInfo = new  RankInfo(14,"玩家14","icon",87);
       let temp15:RankInfo = new  RankInfo(15,"玩家15","icon",86);
       let temp16:RankInfo = new  RankInfo(16,"玩家16","icon",85);
       let temp17:RankInfo = new  RankInfo(17,"玩家17","icon",84);
       let temp18:RankInfo = new  RankInfo(18,"玩家18","icon",83);
       let temp19:RankInfo = new  RankInfo(19,"玩家19","icon",82);
       let temp20:RankInfo = new  RankInfo(20,"玩家20","icon",81);
       datas.push(temp1);
       datas.push(temp2);
       datas.push(temp3);
       datas.push(temp4);
       datas.push(temp5);
       datas.push(temp6);
       datas.push(temp7);
       datas.push(temp8);
       datas.push(temp9);
       datas.push(temp10);
       datas.push(temp11);
       datas.push(temp12);
       datas.push(temp13);
       datas.push(temp14);
       datas.push(temp15);
       datas.push(temp16);
       datas.push(temp17);
       datas.push(temp18);
       datas.push(temp19);
       datas.push(temp20);

        let ddded : Array<RankInfos> = new Array<RankInfos>();

        let my:RankInfo = new  RankInfo(1,"我自己","icon",100000);
      ddded.push(new RankInfos(1,my,datas));
       ddded.push(new RankInfos(2,my,datas));
        ddded.push(new RankInfos(3,my,datas));
         ddded.push(new RankInfos(4,my,datas));
          ddded.push(new RankInfos(5,my,datas));
           ddded.push(new RankInfos(6,my,datas));
            ddded.push(new RankInfos(7,my,datas));
             ddded.push(new RankInfos(8,my,datas));
              ddded.push(new RankInfos(9,my,datas));
               ddded.push(new RankInfos(10,my,datas));

       this._RankInfos.Add(RankType.Friend,ddded);
       this._RankInfos.Add(RankType.World,ddded);
   }

   public GetRankInfosByType(ranktype:number,type:number):RankInfos
   {
       if (this._RankInfos != null )
       {
           let list:Array<RankInfos> = this._RankInfos.TryGetValue(ranktype);
            if (list != null && list.length > 0)
            {
                for(var i:number=0;i < list.length;i++)
                {
                    let  temp:RankInfos = list[i];
                    if (temp == null)
                        continue;
                    if (temp._type == type)
                    {
                        return temp;
                    }
                }
            }
       }
       return null;
   }

   public GetRankInfoByTypeAndIndex(ranktype:number,type:number,index:number):RankInfo
   {
        let rankinfos:RankInfos = this.GetRankInfosByType(ranktype,type);
        if (rankinfos != null && rankinfos._list != null && rankinfos._list.length > 0)
        {
            if (index >= 0 && index <= rankinfos._list.length)
                return rankinfos._list[index];
        }
        return null;
   }

}


class RankInfos
{
    public _type:number;
    public _myRank:RankInfo;
    public _list : Array<RankInfo>;
    constructor(type:number,info:RankInfo,list:Array<RankInfo>)
    {
        this._type = type;
        this._myRank = info;
        this._list = list;
    }
}

class RankInfo
{
    public _rank:number;// 排名
    public _playerName:string;//玩家名字
    public _playerTex:string;//玩家头像
    public _score:number;//积分

    constructor(rank:number,name:string,tex:string,score:number)
    {
        this._rank = rank;
        this._playerName = name;
        this._playerTex = tex;
        this._score = score;
    }

    public IsMe():boolean
    {
        if (this._rank == 2)
            return true;
        return false;
    }
}

