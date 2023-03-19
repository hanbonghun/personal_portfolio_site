const express = require("express");
const app = express();
const postRouter = require("./post/router/postRouter");
const memberRouter = require("./member/router/memberRouter");
require('dotenv').config() //env 파일의 환경 변수를 읽어오기 위한 모듈 
const mongoose = require("mongoose");


//템플릿 엔진 ejs 사용 
app.set("view engine", "ejs"); 

//라우팅 
app.use("/post", postRouter);
app.use("/member",memberRouter); 

const PORT = 3000; // 포트 번호
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
