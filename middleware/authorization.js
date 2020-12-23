const jwt = require('jsonwebtoken');

let authorization = function(){
    return function(req, res, next){
        if(req.headers.authorization){
            const Bearer = req.headers.authorization;
            const token = Bearer.substr(7);
            jwt.verify(token, 'Buka-B0322', function(error, decode){
                if(error){
                    //有错进行处理
                    return res.status(401).json(error);
                }
                //没错方行
                next();
            });
        }
    }
}

module.exports = authorization;