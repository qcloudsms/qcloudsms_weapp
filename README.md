# 腾讯云短信 weapp demo

## 腾讯短信服务

目前`腾讯云短信`为客户提供`国内短信`、`国内语音`和`海外短信`三大服务，此案例演示以下操作：
- 授权：强制授权登录
- 验证码登录：使用腾讯云短信发送验证码

## 运行演示

![image](https://github.com/diaolingzc/qcloudsms_weapp/blob/master/cloud.gif)

## 参考文档
- [腾讯云短信](https://cloud.tencent.com/document/product/382)
- [SDK下载](https://cloud.tencent.com/document/product/382/5804)
- [API参考](https://cloud.tencent.com/document/product/382/13297)
- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## 开发

### 准备

在开始开发云短信应用之前，需要准备如下信息:

- [x] 获取SDK AppID和AppKey

云短信应用SDK `AppID`和`AppKey`可在[短信控制台](https://console.cloud.tencent.com/sms)的应用信息里获取，如您尚未添加应用，请到[短信控制台](https://console.cloud.tencent.com/sms)中添加应用。

- [x] 申请签名

一个完整的短信由短信`签名`和短信正文内容两部分组成，短信`签名`须申请和审核，`签名`可在[短信控制台](https://console.cloud.tencent.com/sms)的相应服务模块`内容配置`中进行申请。

- [x] 申请模板

同样短信或语音正文内容`模板`须申请和审核，`模板`可在[短信控制台](https://console.cloud.tencent.com/sms)的相应服务模块`内容配置`中进行申请。
建议申请模板内容为："您的验证码为{1},请在{2}分钟内填写。如非本人操作，请忽略。"


## 安装

### 手动

1. 手动下载或clone最新版本qcloudsms_js代码
2. 把qcloudsms_weapp把代码放入项目目录
3. 使用`微信开发者工具`导入项目


## 用法

### 云开发环境

请按照最新版本`微信开发者工具`, 并开启云开发环境，具体可参考文档 [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

### 云开发函数上传

1. 修改云短信相关配置
```js
// /cloudfunctions/sendsms/index.js

// 腾讯云短信sdkappid
const appid = xxxxxxx

// 腾讯云短信appkey
const appkey = "xxxxx"

// 你申请的腾讯云短信模板id
const templateId = xxxx

// 你申请的腾讯云短信签名内容
// 注意，非签名ID
const smsSign = "xxxx"
```
2. 上传云函数：右键点击`/cloudfunctions`文件夹下三个文件，选择`上传并部署(云端安装依赖)`

3. 创建集合: 打开云开发页面，创建数据库集合`Verify`

4. 编译运行

## 技术支持

[腾讯云短信小助手]("tencent://message/?uin=3012203387&Site=junichi&Menu=yes"): 3012203387


