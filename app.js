const createError = require("http-errors");
const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
/* 
  server 只是一个接口
  不需要任何模板来显示数据
 */
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* 
  跨域需要在路由之上
  Access-Control-Allow-Origin 值可以是 * 可以是具体的url  //允许访问的源(地址)
  Access-Control-Allow-Methods //允许的请求方式 restfull 把请求更细分化了 options pathch put get post delete 
  *-*-*-Headers  //请求头的内容只允许默认的内容  添加请求头的内容 // 每次向服务器请求都得带着自己的token 
  *-*-*-Credentials 请求的响应是否暴露给页面
  是否允许携带cookies
*/
const whiteList = ["http://localhost:8080", "http://127.0.0.1:5500"]; //允许跨域的白名单
var corsOptions = {
	origin: function (origin, callback) {
		console.log(origin, "o");
		if (whiteList.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
};
app.use(cors(corsOptions));

// app.use(cors());

//session  token jwt
//token 令牌 生成时间, 过期时间
//jwt json web token
//头 base64
//playload 载荷 name 尽量不要出现敏感信息
//签名 加密 可以是字符串, 证书  https
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
const token = jwt.sign(
	{
		name: "刘佳峰",
		nickname: "佳峰刘",
	},
	"jiafeng",
	{ expiresIn: 60 * 60 }
);
// console.log(token); //登录成功把这个扔给前台, 最简单的存储方式: localStorage
jwt.verify(token, 'jiafeng',(error, data)=>{
//   console.log(error, 'error');
//   console.log(data, 'data');
});
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	// res.render('error');
});

module.exports = app;
