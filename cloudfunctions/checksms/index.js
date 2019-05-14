// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) =>  {
  const wxContext = cloud.getWXContext()
  var {phone, verify} = event
  if(phone && verify) {
    let code = 0
    let msg = '验证成功'
    let time = new Date().getTime()
    let data = await db.collection('Verify').where({
      openId: wxContext.OPENID,
      phone: phone + ""
    }).orderBy('sendtime','desc').limit(1).get()
    let updataData = {
      inpuTime: time,
      inputCount: parseInt(data.data[0].inputCount) + 1,
      inputVerify: verify
    }
    if (data.data[0].verify == verify) {
      if (time - data.data[0].sendtime <= data.data[0].activetime * 60 * 1000) {
        // 验证成功
        updataData.verifyStatus = true
      } else {
          code = 1001
          msg = '验证码过期，请重新获取'
      }
    } else {
      code = 1002
      msg = '验证码错误，请重试'
    }

    let update = await db.collection('Verify').where({
      '_id': data.data[0]._id
    }).update({
      data: updataData
    })

    return {
      code,
      msg
    }
  }
}