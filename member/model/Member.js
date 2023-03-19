const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// 저장 이전 비밀번호 해시화 하여 저장 
memberSchema.pre('save', function(next) {
  const member = this;
  if (!member.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(member.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      member.password = hash;
      next();
    });
  });
});

// 비밀번호 비교
memberSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

// 이메일로 회원 조회
memberSchema.statics.getMemberByEmail = async function(email) {
  return this.findOne({ email });
};

memberSchema.statics.getMemberById = async function(id) {
  return this.findById(id);
};
const Member = mongoose.model('Member', memberSchema);

module.exports = Member;