const path = require('path')
const fs = require('fs')
const { ERR_ARTICLE_NOT_EXIST, ERR_ARTICLE_HAS_EXIST, ERR_SERVER_INNER, SUCCESS, ERR_PARAM, ASSERTS_DIR } = require('../../common/constant')
const { keccak256, stringToBuffer } = require('../../common/util')
const async = require("async")
const { checkCookie } = require("../user/cookie")
const { recordArticleClick, recordTagClick } = require('../monitor')

const app = process[Symbol.for("app")]

app.post('/uploadArticle', checkCookie, function (req, res) {
  if (!req.body.data) {
    return res.json({
      code: ERR_PARAM,
      msg: 'uploadArticle, invalid param, need data'
    })
  }

  //
  let uploadArticleDetail;

  // check type
  try {
    if (typeof req.body.data === 'string') {
      uploadArticleDetail = JSON.parse(req.body.data)
    } else {
      return res.json({
        code: ERR_PARAM,
        msg: 'uploadArticle, invalid argument type, argument data should be a JSON string'
      })
    }
  } catch {
    return res.json({
      code: ERR_PARAM,
      msg: 'uploadArticle, invalid argument type, argument data should be a JSON string'
    })
  }

  if(!uploadArticleDetail.title)
  {
    return res.json({
      code: ERR_PARAM,
      msg: `uploadArticle, invalid json string, need title`
    })
  }

  if (!uploadArticleDetail.desc) {
    return res.json({
      code: ERR_PARAM,
      msg: `uploadArticle, invalid json string, need desc`
    })
  }

  if(!uploadArticleDetail.publisher)
  {
    return res.json({
      code: ERR_PARAM,
      msg: `uploadArticle, invalid json string, need publisher`
    })
  }

  if(!uploadArticleDetail.createTime)
  {
    return res.json({
      code: ERR_PARAM,
      msg: `uploadArticle, invalid json string, need createTime`
    })
  }

  if(!uploadArticleDetail.updateTime)
  {
    return res.json({
      code: ERR_PARAM,
      msg: `uploadArticle, invalid json string, need updateTime`
    })
  }

  if(!uploadArticleDetail.img)
  {
    return res.json({
      code: ERR_PARAM,
      msg: `uploadArticle, invalid json string, need img`
    })
  }

  if(!uploadArticleDetail.tags || !Array.isArray(uploadArticleDetail.tags))
  {
    return res.json({
      code: ERR_PARAM,
      msg: `uploadArticle, invalid json string, need tags and tags should be an Array`
    })
  }

  if (!uploadArticleDetail.data || !Array.isArray(uploadArticleDetail.data)) {
    return res.json({
      code: ERR_PARAM,
      msg: `uploadArticle, invalid json string, need data and data should be an Array`
    })
  }

  // generate filename
  const fileName = Date.now() + "_" + keccak256(stringToBuffer(req.body.data)).toString('hex') + '.article'
  const filePath = path.join(ASSERTS_DIR, fileName)
  uploadArticleDetail.filename = fileName;

  // check filepath
  try {
    fs.accessSync(filePath, fs.constants.F_OK)
  } catch {
    async.waterfall([
      function(cb) {
        const data = {
          "filename": uploadArticleDetail.filename,
          "title": uploadArticleDetail.title,
          "desc": uploadArticleDetail.desc,
          "publisher": uploadArticleDetail.publisher,
          "createTime": uploadArticleDetail.createTime,
          "updateTime": uploadArticleDetail.updateTime,
          "img": uploadArticleDetail.img,
          "tags": uploadArticleDetail.tags,
          "data": uploadArticleDetail.data
        }

        // save article
        fs.writeFile(filePath, JSON.stringify(data), function (err) {
          if (!!err) {
            res.json({
              code: ERR_SERVER_INNER,
              msg: `uploadArticle, write article is failed, ${err}`
            })

            return cb(err)
          }

          cb()
        })
      },
      function(cb) {
        // generate breviary article filename
        const breviaryFileName = fileName.split('.', 1)[0] + ".breviaryArticle"
        const breviaryFilePath = path.join(ASSERTS_DIR, breviaryFileName)

        //
        const data = {
          "filename": uploadArticleDetail.filename,
          "title": uploadArticleDetail.title,
          "desc": uploadArticleDetail.desc,
          "publisher": uploadArticleDetail.publisher,
          "createTime": uploadArticleDetail.createTime,
          "updateTime": uploadArticleDetail.updateTime,
          "img": uploadArticleDetail.img,
          "tags": uploadArticleDetail.tags
        }

        // save article breviary
        fs.writeFile(breviaryFilePath, JSON.stringify(data), function (err) {
          if (!!err) {
            res.json({
              code: ERR_SERVER_INNER,
              msg: `uploadArticle, write breviary article is failed, ${err}`
            })

            // del article
            fs.unlink(filePath, unlinkErr => {
              if(!!unlinkErr)
              {
                return cb(unlinkErr)
              }

              return cb(err)
            })
          }

          cb()
        })
      }], err => {
        if(!!err) {

          throw new Error(`uploadArticle, throw exception ${err}`);
        }

        // update
        process[Symbol.for("cache")].update();


        // record article click
        recordArticleClick(fileName)

        // record tag click
        for(let i = 0; i < uploadArticleDetail.tags.length; i++)
        {
          recordTagClick(uploadArticleDetail.tags[i])
        }
        
        res.json({
          code: SUCCESS,
          msg: '',
          data: fileName
        })
      })

    return;
  }

  res.json({
    code: ERR_ARTICLE_HAS_EXIST,
    msg: `uploadArticle, article ${fileName} has exists`
  })
})

app.post('/updateArticle', checkCookie, function (req, res) {
  if (!req.body.data) {
    return res.json({
      code: ERR_PARAM,
      msg: 'updateArticle, invalid param, need data'
    })
  }

  //
  let updateArticleDetail;

  // check type
  try {
    if (typeof req.body.data === 'string') {
      updateArticleDetail = JSON.parse(req.body.data)
    } else {
      return res.json({
        code: ERR_PARAM,
        msg: 'updateArticle, invalid argument type, argument data should be a JSON string'
      })
    }
  } catch {
    return res.json({
      code: ERR_PARAM,
      msg: 'updateArticle, invalid argument type, argument data should be a JSON string'
    })
  }

  if (!updateArticleDetail.filename) {
    return res.json({
      code: ERR_PARAM,
      msg: `updateArticle, invalid json string, need filename`
    })
  }

  if (!updateArticleDetail.title) {
    return res.json({
      code: ERR_PARAM,
      msg: `updateArticle, invalid json string, need title`
    })
  }

  if (!updateArticleDetail.desc) {
    return res.json({
      code: ERR_PARAM,
      msg: `updateArticle, invalid json string, need desc`
    })
  }

  if (!updateArticleDetail.publisher) {
    return res.json({
      code: ERR_PARAM,
      msg: `updateArticle, invalid json string, need publisher`
    })
  }

  if (!updateArticleDetail.createTime) {
    return res.json({
      code: ERR_PARAM,
      msg: `updateArticle, invalid json string, need createTime`
    })
  }

  if (!updateArticleDetail.updateTime) {
    return res.json({
      code: ERR_PARAM,
      msg: `updateArticle, invalid json string, need updateTime`
    })
  }

  if (!updateArticleDetail.img) {
    return res.json({
      code: ERR_PARAM,
      msg: `updateArticle, invalid json string, need img`
    })
  }

  if (!updateArticleDetail.tags || !Array.isArray(updateArticleDetail.tags)) {
    return res.json({
      code: ERR_PARAM,
      msg: `updateArticle, invalid json string, need tags and tags should be an Array`
    })
  }

  if (!updateArticleDetail.data || !Array.isArray(updateArticleDetail.data)) {
    return res.json({
      code: ERR_PARAM,
      msg: `updateArticle, invalid json string, need data and data should be an Array`
    })
  }

  const filePath = path.join(ASSERTS_DIR, updateArticleDetail.filename)

  // check filepath
  try {
    fs.accessSync(filePath, fs.constants.F_OK)
  } catch {
    
    return res.json({
      code: ERR_ARTICLE_NOT_EXIST,
      msg: `updateArticle, article ${fileName} not exists`
    })
  }

  async.waterfall([
    function (cb) {
      const data = {
        "filename": updateArticleDetail.filename,
        "title": updateArticleDetail.title,
        "desc": updateArticleDetail.desc,
        "publisher": updateArticleDetail.publisher,
        "createTime": updateArticleDetail.createTime,
        "updateTime": updateArticleDetail.updateTime,
        "img": updateArticleDetail.img,
        "tags": updateArticleDetail.tags,
        "data": updateArticleDetail.data
      }

      // save article
      fs.writeFile(filePath, JSON.stringify(data), function (err) {
        if (!!err) {
          res.json({
            code: ERR_SERVER_INNER,
            msg: `updateArticle, write article is failed, ${err}`
          })

          return cb(err)
        }

        cb()
      })
    },
    function (cb) {
      // generate breviary article filename
      const breviaryFileName = updateArticleDetail.filename.split('.', 1)[0] + ".breviaryArticle"
      const breviaryFilePath = path.join(ASSERTS_DIR, breviaryFileName)

      //
      const data = {
        "filename": updateArticleDetail.filename,
        "title": updateArticleDetail.title,
        "desc": updateArticleDetail.desc,
        "publisher": updateArticleDetail.publisher,
        "createTime": updateArticleDetail.createTime,
        "updateTime": updateArticleDetail.updateTime,
        "img": updateArticleDetail.img,
        "tags": updateArticleDetail.tags
      }

      // save article breviary
      fs.writeFile(breviaryFilePath, JSON.stringify(data), function (err) {
        if (!!err) {
          res.json({
            code: ERR_SERVER_INNER,
            msg: `updateArticle, write breviary article is failed, ${err}`
          })

          // del article
          fs.unlink(filePath, unlinkErr => {
            if (!!unlinkErr) {
              return cb(unlinkErr)
            }

            return cb(err)
          })
        }

        cb()
      })
    }], err => {
      if (!!err) {

        throw new Error(`updateArticle, throw exception ${err}`);
      }

      // update
      process[Symbol.for("cache")].update();

      res.json({
        code: SUCCESS,
        msg: '',
        data: fileName
      })
    })
})
