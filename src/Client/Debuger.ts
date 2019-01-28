/*
* name;
*/

class Debuger{

    public static _isEdit : boolean  = true;
    public static LogError(str:string | Number)
    {
        if(Debuger._isEdit)
        {
            console.log("error---------" + str.toString());
        }
    }

    public static LogWorning(str:string | Number)
    {
        if(Debuger._isEdit)
        {
            console.log("warning---------" + str.toString());
        }
    }

    public static Log(str:string | Number)
    {
        if(Debuger._isEdit)
        {
            console.log("log---------" + str.toString());
        }
    }

}