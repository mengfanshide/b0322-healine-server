const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
/* GET home page. */
router.get("/", function (req, res, next) {
	// res.render('index', { title: 'Express' });
	/* 
    对请求放返回的内容: {code: xxx, data: xxx}
    code 和前台约定好的状态码, 
    data 请求的数据
  */

	// console.log(req.headers.authorization);
	const Bearer = req.headers.authorization;
	const token = Bearer.substr(7);

	jwt.verify(token, "Buka-B0322", (error, decode) => {
		if (error) {
			return res.status(401).json(error);
		}
		return res.json({
			code: 200,
			data: {
				title: "继续集火佳峰刘刘酱",
				body: "来啊, 打我啊!!!",
			},
		});
	});

	//jwt.verify 会解析错误 包括过期
	//jwt.decode 直接解析token
	//jwt 所有有效信息都在客户端
	// jwt.verify(token, 'Buka-B0322', (error, decode)=>{
	//   // console.log(error, 'error');
	//   // console.log(decode);
	//   if(error){
	//     return res.status(401).json({
	//       error
	//     });
	//   }
	// });
	// res.status(401).json({
	//   code: 200,
	//   data: {
	//     title: "继续集火刘佳峰",
	//     body: "来啊, 打我啊!!!"
	//   }
	// });
});

module.exports = router;
