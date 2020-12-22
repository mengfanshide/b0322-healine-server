var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  /* 
    对请求放返回的内容: {code: xxx, data: xxx}
    code 和前台约定好的状态码, 
    data 请求的数据
  */
  res.json({
    code: 200,
    data: {
      title: "继续集火刘佳峰",
      body: "来啊, 打我啊!!!"
    }
  });
});

module.exports = router;
