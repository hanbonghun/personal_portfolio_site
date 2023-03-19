var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var app = express();
const passport = require("passport");
var session = require("express-session");
var Article = require("../post/model/Post");

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/login",
    failureFlash: "로그인 실패 ",
  }),
  async (req, res) => {
    var articles = await Article.find().sort({ create_at: "desc" }); //db에 있는 모든 article을 articles변수에 저장
    // res.render("/articles/index",{articles : articles});
    res.redirect("/");
  }
);

module.exports = router;
