const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  /* 
    对请求放返回的内容: {code: xxx, data: xxx}
    code 和前台约定好的状态码, 
    data 请求的数据
  */

  // console.log(req.headers.authorization);
  const Bearer = req.headers.authorization;
  const token = Bearer.substr(7);
  //jwt.verify 会解析错误 包括过期
  //jwt.decode 直接解析token
  jwt.verify(token, 'Buka-B0322', (error, decode)=>{
    console.log(error, 'error');
    console.log(decode);
  });
  res.json({
    code: 200,
    data: {
      title: "继续集火刘佳峰",
      body: "来啊, 打我啊!!!"
    }
  });
});

module.exports = router;
