# 云开发使用腾讯云短信Node.js SDK指引 #

## 说明 ##

近期发现部分用户使用 [腾讯云短信Node.js SDK](https://github.com/qcloudsms/qcloudsms_js) ,按照 [README.md](https://github.com/qcloudsms/qcloudsms_js/blob/master/README.md) 指引操作后，响应值为`NULL`。
其原因如下：
- `qcloudsms_js`依赖`request`发起一个http请求，其本质为一个异步操作，故按`[README.md`以下案例调用，会返回`NULL`
```js
const cloud = require('wx-server-sdk')

var QcloudSms = require("qcloudsms_js");

// 短信应用SDK AppID
var appid = 1400009099;  // SDK AppID是1400开头

// 短信应用SDK AppKey
var appkey = "9ff91d87c2cd7cd0ea762f141975d1df37481d48700d70ac37470aefc60f9bad";

// 需要发送短信的手机号码
var phoneNumbers = ["21212313123", "12345678902", "12345678903"];

// 短信模板ID，需要在短信应用中申请
var templateId = 7839;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

// 签名
var smsSign = "腾讯云";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

// 实例化QcloudSms
var qcloudsms = QcloudSms(appid, appkey);

// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
function callback(err, res, resData) {
    if (err) {
        console.log("err: ", err);
    } else {
        console.log("request data: ", res.req);
        console.log("response data: ", resData);
    }
}

// 云函数入口函数
exports.main = async (event, context) => {
  var ssender = qcloudsms.SmsSingleSender();
  var params = ["5678"];
  ssender.sendWithParam(86, phoneNumbers[0], templateId,
  params, smsSign, "", "", callback);  // 签名参数未提供或者为空时，会使用默认签名发送短信
}
```



- 参考 [微信小程序文档->云开发->开发指引->云函数->异步返回结果](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/async.html) ,可以通过在云函数中返回一个`Promise`的方法来完成调用。
```js
// 异步返回结果
const cloud = require('wx-server-sdk')

var QcloudSms = require("qcloudsms_js");

// 短信应用SDK AppID
var appid = 1400009099;  // SDK AppID是1400开头

// 短信应用SDK AppKey
var appkey = "9ff91d87c2cd7cd0ea762f141975d1df37481d48700d70ac37470aefc60f9bad";

// 需要发送短信的手机号码
var phoneNumbers = ["21212313123", "12345678902", "12345678903"];

// 短信模板ID，需要在短信应用中申请
var templateId = 7839;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

// 签名
var smsSign = "腾讯云";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

// 实例化QcloudSms
var qcloudsms = QcloudSms(appid, appkey);

// 云函数入口函数

// 此处需使用 Promise 异步返回结果
exports.main = async (event, context) => new Promise((resolve, reject) => {
  var ssender = qcloudsms.SmsSingleSender();
  var params = ["5678"];
  ssender.sendWithParam(86, phoneNumbers[0], templateId,
  params, smsSign, "", "", (err, res, resData) => {
  // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
     if (err) {
        console.log("err: ", err);
        reject({
          err
        })
      } else {
        resolve({
          res,
          resData
        })
      }
  });
})
```

## 参考 ##
- [腾讯云Node.js SDK](https://github.com/qcloudsms/qcloudsms_js)
- [云函数](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/getting-started.html)
- [npm安装](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/npm.html)

## 云开发手动安装Node.js SDK ##
- 根据`云函数`指引创建新的云函数
- 打开该文件夹下的`package.json`
- 修改后保存
```js
"dependencies": {
    "wx-server-sdk": "latest",
    "qcloudsms_js": "^0.1.1"
  }
```
- 右键云函数文件夹点击`云端安装依赖（不上传 node_modules 文件夹）`
