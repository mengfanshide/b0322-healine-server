const express = require('express');
const router = express.Router();
const User = require('../model/Users.js');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //临时上传的文件应该给个临时地址就成, 定期清理临时上传文件夹
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {

        // console.log(file);
        const extName = path.extname(file.originalname)
      cb(null, file.fieldname + '-' + Date.now() + extName)
    }
  })
// var storage = multer.memoryStorage()
  var upload = multer({ storage: storage })
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// router.use(function(req, res, next){
// 	if(req.headers.authorization){
// 		const Bearer = req.headers.authorization;
// 		const token = Bearer.substr(7);
// 		jwt.verify(token, 'Buka-B0322', function(error, decode){
// 			if(error){
// 				//有错进行处理

// 			}
// 		});
// 	}else{
// 		next();
// 	}

// });
//created 发送请求
//单独验证这个请求的路由
// router.get('/authorization', (req, res, next) => {
// 	let success = true;
//     if (req.headers.authorization) {
//         const Bearer = req.headers.authorization;
//         const token = Bearer.substr(7);
//         jwt.verify(token, 'Buka-B0322', function (error, decode) {
//             if (error) {
// 				//有错进行处理
// 				success = false;
//             }
//         });
//     } else {
//        success = false;
// 	}
// 	res.json({
// 		success
// 	});
// });

router.post('/login', async (req, res, next) => {
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
    User.find(
        { mobile: formData.mobile },
        'nickname username',
        (error, result) => {
            console.log(result);
            //登录成功创建jwt
            
            const token = jwt.sign(
                {
                    //私有荷载, 尽量不要放敏感内容
                    nickname: result[0].nickname,
                    username: result[0].username
                },
                'Buka-B0322',
                { expiresIn: 60*60*24 }
            );

            res.json({
                code: 200,
                msg: '登录成功',
                token
            });
        }
    );
});
router.post('/getCode', (req, res, next) => {
    // console.log(req.body);
    //模拟验证码
    //生成四位随机数
    let verifyCode = Math.round(Math.random() * 8999 + 1000);
    router.verifyCode = verifyCode;
    res.json({
        code: 200, //200 请求成功
        verifyCode
    });
});
//getUserInfo , token
router.get('/userInfo', (req, res, next)=>{
    const token = req.query.token;
    // console.log(req.query);
    jwt.verify(token, 'Buka-B0322', (error, decode)=>{
        // console.log(error);
        if (error) {
            //有错进行处
            return res.status(401).json(error);
        }
        const {username} = decode;
        //通过存储的用户名找峰峰酱

        // console.log(decode);
        User.find({username}, (error, data)=>{
            res.json({
                success: 'success',
                data
            });
        });
    });
});

router.post('/avatar', upload.single('avatar'), (req, res)=>{
    console.log(req.file);
    // console.log(req.file.buffer);
    res.json({
        success: 'success',
        avatar: 'http://localhost:3333/' + req.file.filename
    })
});
router.post('/edit', (req, res)=>{
    //req.body

    User.findByIdAndUpdate({_id: id}, {nickname: req.body.nickname, gender: req.body.gender, age: req.body.age});

});
module.exports = router;
