// middlewares/passport/localStrategy.js 

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const memberService = require('../../member/service/memberService');
// 로그인 인증을 처리하는 LocalStrategy 정의
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const member = await memberService.getMemberByEmail(email);
    if (!member) {
      return done(null, false, { message: '해당 이메일로 가입된 회원이 없습니다.' });
    }

    const isMatched = await member.comparePassword(password);
    if (!isMatched) {
      return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
    }

    return done(null, member);
  } catch (err) {
    return done(err);
  }
}));


module.exports = passport;