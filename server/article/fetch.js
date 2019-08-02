const path = require('path')
const fs = require('fs')
const { ERR_ARTICLE_NOT_EXIST, ERR_SERVER_INNER, SUCCESS, ERR_PARAM, ASSERTS_DIR } = require('../../depends/constant')
const _ = require('underscore')
const async = require('async')
const { checkCookie } = require("../user/cookie")
const { recordArticleClick, recordTagClick } = require('../monitor')

const app = process[Symbol.for("app")];

app.get('/getArticle', function (req, res) {
  if (!req.query.filename) {
    return res.json({
      code: ERR_PARAM,
      msg: 'getArticle, invalid param, need filename'
    })
  }

  const filePath = path.join(ASSERTS_DIR, req.query.filename)

  // check filepath
  try {
    fs.accessSync(filePath, fs.constants.F_OK)
  } catch {
    return res.json({
      code: ERR_ARTICLE_NOT_EXIST,
      msg: `getArticle, article ${req.query.filename} not exists`
    })
  }

  // get article
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      return res.json({
        code: ERR_SERVER_INNER,
        msg: `getArticle, read file is failed, ${err}`
      })
    }

    res.json({
      code: SUCCESS,
      msg: '',
      data: JSON.parse(data)
    })

    recordArticleClick(req.query.filename)
  })
});

app.get('/getBreviaryArticleList', function (req, res) {

  if(!req.query.page) {
    return res.json({
      code: ERR_PARAM,
      msg: 'getBreviaryArticleList, invalid param, need page'
    })
  }


  if(!req.query.pageNum) {
    return res.json({
      code: ERR_PARAM,
      msg: 'getBreviaryArticleList, invalid param, need pageNum'
    })
  }

  if (req.query.page <= 0)
  {
    return res.json({
      code: ERR_PARAM,
      msg: 'getBreviaryArticleList, page should bigger than 0'
    })
  }

  if (req.query.pageNum <= 0) {
    return res.json({
      code: ERR_PARAM,
      msg: 'getBreviaryArticleList, pageNum should bigger than 0'
    })
  }

  req.query.title = req.query.title || ""
  req.query.tags = req.query.tags || "[]"

  // parse tags
  try
  {
    req.query.tags = JSON.parse(req.query.tags);
  }
  catch
  {
    return res.json({
      code: ERR_PARAM,
      msg: 'getBreviaryArticleList, invalid param, param tags must be an array string'
    })
  }

  // check tags
  if(!Array.isArray(req.query.tags))
  {
    return res.json({
      code: ERR_PARAM,
      msg: 'getBreviaryArticleList, invalid param, param tags must be an array'
    })
  }

  let breviaryArticles = process[Symbol.for("breviaryArticles")];
 
  // filter tags
  let filteredTagsArticles = []
  let i, j;
  for(i = 0; i < breviaryArticles.length; i++)
  {
    for(j = 0; j < req.query.tags.length; j++)
    {
      if (breviaryArticles[i].tags.find(tag => tag === req.query.tags[j]))
      {
        break;
      }
    }

    if (j !== req.query.tags.length || req.query.tags.length === 0)
    {
      filteredTagsArticles.push(breviaryArticles[i])
    }
  }

  // filter title
  let filteredTitleArticles = []
  for(let i = 0; i < filteredTagsArticles.length; i++)
  {
    if (req.query.title === "" || filteredTagsArticles[i].title.indexOf(req.query.title) >= 0)
    {
      filteredTitleArticles.push(filteredTagsArticles[i])
    }
  }

  //
  const total = filteredTitleArticles.length;

  // range
  filteredTitleArticles = filteredTitleArticles.splice((req.query.page - 1) * req.query.pageNum, req.query.pageNum);

  res.json({
    code: SUCCESS,
    msg: "",
    data: {
      total: total,
      data: filteredTitleArticles
    }
  });

  for(let i= 0; i < req.query.tags.length; i++)
  {
    recordTagClick(req.query.tags[i])
  }
})


app.post('/delArticle', checkCookie, function (req, res) {
  if (!req.body.filename) {
    return res.json({
      code: ERR_PARAM,
      msg: 'delArticle, invalid param, need filename'
    })
  }

  const filePath = path.join(ASSERTS_DIR, req.body.filename)

  // check filepath
  try {
    fs.accessSync(filePath, fs.constants.F_OK)
  } catch {
    return res.json({
      code: ERR_ARTICLE_NOT_EXIST,
      msg: `delArticle, article ${req.body.filename} not exists`
    })
  }

  async.waterfall([
    function(cb) {
      // del article
      fs.unlink(filePath, cb)
    },
    function(cb) {
      // del breviary article
      const breviaryFileName = req.body.filename.split('.', 1)[0] + ".breviaryArticle"
      const breviaryFilePath = path.join(ASSERTS_DIR, breviaryFileName)
    
      fs.unlink(breviaryFilePath, cb)
    }], err => {
      if (!!err) {
        return res.json({
          code: ERR_SERVER_INNER,
          msg: `delArticle, del file is failed, ${err}`
        })
      }

      process[Symbol.for("cache")].update();

      res.json({
        code: SUCCESS,
        msg: ''
      })
    })
});

app.get('/getTags', function (req, res) {
  if (!req.query.num) {
    return res.json({
      code: ERR_PARAM,
      msg: 'getTags invalid param, need num'
    })
  }

  res.json({
    code: SUCCESS,
    msg: '',
    data: process[Symbol.for("tags")].slice(0, req.query.num)
  })
});


app.get('/getHotArticles', function (req, res) {
  if (!req.query.num) {
    return res.json({
      code: ERR_PARAM,
      msg: 'getHotArticles, invalid param, need num'
    })
  }

  res.json({
    code: SUCCESS,
    msg: '',
    data: process[Symbol.for("hotArticles")].slice(0, req.query.num)
  })
});

app.get('/getHotTags', function (req, res) {
  if (!req.query.num) {
    return res.json({
      code: ERR_PARAM,
      msg: 'getHotArticles, invalid param, need num'
    })
  }

  res.json({
    code: SUCCESS,
    msg: '',
    data: process[Symbol.for("hotTags")].slice(0, req.query.num)
  })
});