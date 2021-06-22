var express = require("express");
var app = express();
var article_router = require("./routes/articles");
var login_router = require("./routes/login");
var mongoose = require("mongoose");
var Article = require("./models/article");
var methodOverride = require("method-override"); //html 에서 method로 PUT, DELETE 지원 안하는데, method-override를 사용하면 가능
var session = require("express-session");
var Passport = require("./routes/passport");
const passport = require("passport");
const axios = require("axios");

require("dotenv").config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//세션 활성화
app.use(
  session({
    resave: false,
    saveUninitialized: false, //세션이 필요하기 전까지 구동시키지 않는다.
    secret: process.env.SESSION_SECRET, //따로 파일 빼서 github에 올릴 것
    cookie: { httpOnly: true, secure: false }, // secure : https 로 통신하는 경우만 쿠키 전송 ,   httpOnly : javascript로 접근 못하게 함
  })
);
//세션 연결
app.use(passport.initialize());
app.use(passport.session());

Passport();

app.use(express.static(__dirname + "/public")); //style.css 연결
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ exteded: true }));
//경로가 /articles로 시작하면 article_router 가 가리키는 articles.js의 라우터를 사용한다.

app.use("/articles", article_router);
app.use("/login", login_router);

app.set("view engine", "ejs"); //ejf를 쓰겠다

//db연결
mongoose
  .connect(process.env.CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((error) => console.log(error));

//메인 화면
app.get("/", async function (req, res) {
  var articles = await Article.find().sort({ create_at: "desc" }); //db에 있는 모든 article을 articles변수에 저장
  my_weather = {};

  isAdmin = false;
  if (req.isAuthenticated()) {
    if (String(req.session.passport.user) === process.env.KAKAO_ID)
      isAdmin = true;
  }

  axios
    .get(
      "http://api.openweathermap.org/data/2.5/weather?lat=37.3578631&lon=126.9395806&appid=" +
        process.env.OPENWEATHER_API_KEY
    )
    .then(async function (response) {
      await insert_info(my_weather, response);
      res.render("articles/index", {
        articles: articles,
        isLogin: req.isAuthenticated(),
        isAdmin: isAdmin,
        weather: my_weather,
      });
    });
  // res.render 함수는 ejs를 /views 폴더에서 찾으므로 views폴더의 이름은 변경되면 안됨
  //변수이름 articles로 객체를 보냄
});

app.get("/about", function (req, res) {
  res.render("about", { isLogin: req.isAuthenticated() });
});

app.get("/login", function (req, res) {
  res.render("login", { isLogin: req.isAuthenticated() });
});

app.get("/register", function (req, res) {
  res.render("register", { isLogin: req.isAuthenticated() });
});

app.post("/register", function (req, res) {});

app.listen(9000, function () {
  console.log("Server is running...");
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

function insert_info(my_weather, response) {
  response = response.data;
  my_weather.icon = response.weather[0].icon;
  my_weather.name = response.name;
  my_weather.temp = Math.round(response.main.temp - 273);
  my_weather.humidity = response.main.humidity;
}
