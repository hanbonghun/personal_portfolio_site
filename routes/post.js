var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var Article = require("./../models/article");
const { render } = require("ejs");
var app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

var auth = function (req, res, next) {
  if (req.isAuthenticated()) {
    if (String(req.session.passport.user) === process.env.KAKAO_ID) {
      next();
    } else {
      res.status(401).send("unauthenticated");
      res.redirect("/");
    }
  } else {
    res.status(401).send("unauthenticated");
    res.redirect("/");
  }
};

//홈 화면
router.get("/", async function (req, res) {
  var articles = await Article.find().sort({ create_at: "desc" });

  var page;
  var limit;
  if (!req.query.page) {
    page = 1;
  } else {
    page = parseInt(req.query.page);
  } //page : 문자열로 들어옴

  if (!req.query.limit) {
    limit = 3;
  } else {
    limit = parseInt(req.query.limit);
  }

  const start_index = (page - 1) * limit;
  const end_index = page * limit;

  const total_page = articles.length / limit;
  //response할 때 유저 정보 뿐만아니라 페이지 관한 정보를 추가로 넣어서 보낸다.

  const results = {};
  results.total_article = articles.length;
  results.total_page = Math.ceil(total_page);
  results.limit = limit;
  results.current_page = parseInt(page);

  if (end_index < articles.length) {
    results.next = {
      page: page + 1,
    };
  }

  if (start_index > 0) {
    results.prev = {
      page: page - 1,
    };
  }

  results.result = articles.slice(start_index, end_index);

  res.render("articles/articlelist", {
    results: results,
    isLogin: req.isAuthenticated(),
  });
});

//글쓰기 화면
router.get("/new", auth, function (req, res) {
  res.render("articles/new", {
    isLogin: req.isAuthenticated(),
    user_id: req.session.passport.user,
  });
});

router.put("/edit/:id", auth, async function (req, res) {
  //article에서 수정 눌렀을 때
  var article = await Article.findById(req.params.id); //db에서 id에 해당하는 article받을 때까지 기다림
  res.render("articles/edit", {
    article: article,
    isLogin: req.isAuthenticated(),
  });
});

router.put("/:id", auth, function (req, res) {
  //편집창에서 저장 눌렀을 때
  Article.findByIdAndUpdate(
    //id로 document찾고 수정
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        contents: req.body.contents,
      },
    },
    async function (err, result) {
      if (err) {
        res.send(err);
      } else {
        article = await Article.findById(req.params.id);
        res.render("articles/article", {
          article: article,
          isLogin: req.isAuthenticated(),
        });
      }
    }
  );
});

router.get("/:id", async function (req, res) {
  //async await
  var article = await Article.findById(req.params.id); //db에서 id에 해당하는 article받을 때까지 기다림
  isAdmin = false;
  if (req.isAuthenticated()) {
    if (String(req.session.passport.user) === process.env.KAKAO_ID)
      isAdmin = true;
  }
  res.render("articles/article", {
    article: article,
    isLogin: req.isAuthenticated(),
    isAdmin: isAdmin,
  });
});

router.post("/", auth, async function (req, res) {
  // 가끔씩 index.ejs에서 글 목록을 출력하는데 오류가 남 -> async await을 통해 데이터베이스에 글이 저장되어야 글목록 출력하게 했음
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    contents: req.body.contents,
  });
  await article.save();
  res.redirect(`/articles/${article.id}`);
});

router.delete("/:id", auth, async function (req, res) {
  await Article.findByIdAndDelete(req.params.id); //데이터베이스에 해당 id 지움
  res.redirect("/");
});

module.exports = router;
