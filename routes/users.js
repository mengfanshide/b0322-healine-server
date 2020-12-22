var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post('/login', (req, res, next)=>{
  // console.log(req.body);
  const formData = req.body
  // console.log(router.verifyCode);
  if(router.verifyCode != formData.code){
    return res.json({
      code: 900, //验证码错误
      msg: '验证码错误'
    });
  }
  //验证码正确
  //1. 手机号
  //2. 手机号没有
  res.json({
    code: 200,
    msg: '登录成功'
  });
});
router.post('/getCode', (req, res, next)=>{
  console.log(req.body);
  //模拟验证码
  //生成四位随机数
  let verifyCode = Math.round(Math.random()*8999 + 1000);
  router.verifyCode = verifyCode;
  res.json({
    code: 200, //200 请求成功
    verifyCode
  });
}); 
module.exports = router;
