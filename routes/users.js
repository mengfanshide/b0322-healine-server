const express = require("express");
const router = express.Router();
const User = require("../model/Users.js");
const jwt = require('jsonwebtoken');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.post("/login", async (req, res, next) => {
	// console.log(req.body);
	const formData = req.body;
	// console.log(router.verifyCode);
	// if(router.verifyCode != formData.code){
	//   return res.json({
	//     code: 900, //验证码错误
	//     msg: '验证码错误'
	//   });
	// }
	//验证码正确
	//1. 手机号 先不考虑
	//2. 手机号没有
  //mongoose 支持异步操作
  //异步操作, 可以直接拿到查询结果, 而且是按顺序来的
	// const result = await User.find({ mobile: formData.mobile }, (error, res)=>{
  //   // console.log(res, 'callback');
  // });
	// console.log(result, 'async');
  User.find({ mobile: formData.mobile }, 'nickname gender',(error, result)=>{
    // console.log(result);
    //登录成功创建jwt
    const token = jwt.sign({
      //私有荷载, 尽量不要放敏感内容
      nickname: result[0].nickname,
      username: result[0].username
    }, 'Buka-B0322', {expiresIn: 60});

    res.json({
      code: 200,
      msg: "登录成功",
      token 
    });

  })
	
});
router.post("/getCode", (req, res, next) => {
	console.log(req.body);
	//模拟验证码
	//生成四位随机数
	let verifyCode = Math.round(Math.random() * 8999 + 1000);
	router.verifyCode = verifyCode;
	res.json({
		code: 200, //200 请求成功
		verifyCode,
	});
});
module.exports = router;
