const express=require("express")
const app=express()
const port=3000
var dateTimeRecognizers = require('@microsoft/recognizers-text-date-time');
var chinese = dateTimeRecognizers.Culture.Chinese;
//文字转换请求入口
app.get("/nodeServer/:str",function (req, res) {
    var decode = decodeURI(req.params.str,"UTF-8");
    var result = dateTimeRecognizers.recognizeDateTime(decode,chinese);
    //判断结果是否为空
    if(result.length!=0&&result!=null){
        var text = result[0].resolution.values[0].value;
        res.json({status:true,time:text})
    }else{
        res.json({status:false,time:"0"})
    }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))