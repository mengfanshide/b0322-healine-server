const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/b0322-headline', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//创建Schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    mobile: {
        type: String,
        required: true
    },
    email: String,
    username: String,
    password: String,
    nickname: String,
    gender: {
        type: Number,
        enum: [-1, 0, 1] //枚举类型, gender 的值只能在 enum的数组中取
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    avatar: {
        type: String,
        default: '/uploads/avatar-default.png'
    },
    introduce: String,
    last_modified_time:{
        type: Date,
        default: Date.now
    }
}, {
    timestamps: {
        createdAt: 'create_time',
        updatedAt: 'update_time'
    },
    //__v: 值
    // versionKey: false
});
// const User = mongoose.model('User', userSchema, 'user');
const User = mongoose.model('User', userSchema);
// new User({
//     mobile: 13825875687,
//     email: 'jiafengliu@lang.com',
//     username: 'jiafengliu',
//     nickname: '峰峰酱',
//     gender: -1,
//     age: 3,
//     introduce: '这是一个神奇的**',
// }).save();

module.exports = User;
/* 
    mysql 
    连接池  自己创建
    mogoose 连接池 5个
*/