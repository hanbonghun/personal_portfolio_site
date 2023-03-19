const express = require("express");
const app = express();
const postRouter = require("./post/router/postRouter");
const memberRouter = require("./member/router/memberRouter");
require('dotenv').config() //env 파일의 환경 변수를 읽어오기 위한 모듈 
const mongoose = require("mongoose");

// request body 파싱을 위한 미들웨어 
const bodyParser = require('body-parser');
// JSON 형태의 요청 데이터를 파싱하는 미들웨어
app.use(bodyParser.json());

// URL 인코딩된 요청 데이터를 파싱하는 미들웨어
app.use(bodyParser.urlencoded({ extended: false }));

//passport 
const passport = require('passport');
const session = require('express-session');
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
  }));
app.use(passport.initialize());
app.use(passport.session());

//템플릿 엔진 ejs 사용 
app.set("view engine", "ejs"); 

//라우팅 
app.use("/post", postRouter);
app.use("/member",memberRouter); 

const PORT = process.env.PORT; // 포트 번호
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//mongoose 연결 

mongoose
  .connect(process.env.CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((error) => console.log(error));


app.get('/', (req,res)=>{
    res.render('index',{
      user: req.user
    });
})