const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
require("dotenv").config();

module.exports = () => {
  passport.serializeUser(function (user, done) {
    // 사용자 정보 객체를 세션에 id로 저장
    console.log(user.id);
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    //세션에 저장한 id를 통해 사용자 정보 객체를 불러옴
    done(null, id);
  });

  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_LOGIN_CLIENT_ID,
        clientSecret: "",
        callbackURL: "http://localhost:9000/login/kakao/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );
};
