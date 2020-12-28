const jwt = require('jsonwebtoken');
//定义一个白名单
//没有token也能放行的路由
const whiteList = ['/users/login', '/users/getCode'];
let authorization = function () {
    return function (req, res, next) {
        const Bearer = req.headers.authorization;
        if (Bearer) {
            const token = Bearer.substr(7);
            jwt.verify(token, 'Buka-B0322', function (error, decode) {
                if (error) {
                    //有错进行处理
                    return res.status(401).json(error);
                }
                //没错方行
                next();
            });
        } else {
            // console.log(req.url, 'req');
            if (whiteList.includes(req.url)) {
                next();
            }else{
                return res.status(401).json({
                    error: '有问题'
                })
            }
        }
    };
};

module.exports = authorization;
