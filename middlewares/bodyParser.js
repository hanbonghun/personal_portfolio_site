const bodyParser = require('body-parser');

// JSON 형태의 요청 데이터를 파싱하는 미들웨어
const jsonParser = bodyParser.json();

// URL 인코딩된 요청 데이터를 파싱하는 미들웨어
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = { jsonParser, urlencodedParser };