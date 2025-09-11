class ResultResp{
    code;
    msg;
    data;

    constructor(code,msg,data){
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    static OK = (data) => {return new ResultResp(0,'success',data)}
    static FAILED = (data) => {return new ResultResp(-999,'FAILED',data)}
    static AUTH_FAILED = (data) => {return new ResultResp(-403,'AUTH_FAILED',data)}
}

export default ResultResp