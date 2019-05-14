// 云函数入口文件
const cloud = require('wx-server-sdk')
const QcloudSms = require("qcloudsms_js")
const appid = xxxxx
const appkey = "xxxxxxxxx"
const templateId = xxxxx
const smsSign = "xxxxx"
const uinSendNum = 3

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => new Promise((resolve, reject) => {
  const wxContext = cloud.getWXContext()

  db.collection('Verify').where({
    openId: wxContext.OPENID
  }).orderBy('sendtime', 'desc').limit(uinSendNum).get().then(res => {
    if (res.data.length === 3 && new Date(res.data[2].sendtime).toDateString() === new Date().toDateString()) {
      console.log("uin超限: ", wxContext.OPENID)
      resolve({
        code: 1013,
        msg: '下发短信/语音命中了频率限制策略'
      })
    } else {
      let qcloudsms = QcloudSms(appid, appkey)
      let ssender = qcloudsms.SmsSingleSender()
      let verify = ('000000' + Math.floor(Math.random() * 999999)).slice(-6)
      let params = [verify]
      ssender.sendWithParam(86, event.phone, templateId,
        params, smsSign, "", "", (err, res, resData) => {
          if (err) {
            console.log("err: ", err);
            reject({
              err
            })
          } else {
            if (resData.result === 0) {
              var { result, errmsg, fee, sid } = resData
            } else {
              var { result, errmsg } = resData
            }
            db.collection('Verify').add({
              data: {
                openId: wxContext.OPENID,
                unionid: wxContext.UNIONID ? wxContext.UNIONID : '',
                phone: event.phone,
                verify: verify,
                activetime: 5,
                sendtime: new Date().getTime(),
                fee: fee ? fee : '',
                sid: sid ? sid : '',
                sendResult: result,
                errmsg: errmsg,
                recvtime: '',
                recvmsg: '',
                recvresult: '',
                inpuTime: '',
                inputVerify: '',
                inputCount: parseInt(0),
                verifyStatus: false
              }
            }).then(res => {
              resolve({
                code: result,
                msg: result === 0 ? '验证码发送成功' : errmsg
              })
            })
          }
        }
      )
    }
  }
  )



})

