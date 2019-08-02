const path = require("path");
const fs = require("fs");
const { ASSERTS_DIR } = require("../depends/constant");

const logger = process[Symbol.for("logger")]

module.exports = async function (cb) {
  // 文章
  const breviaryArticlesSet = new Set();

  //
  const articlesSet = new Set()

  // 
  const validArticlesSet = new Set();

  //
  const allImgsSet = new Set()

  // 图片
  const validImgsSet = new Set();

  // 标签
  const validTagsSet = new Set();


  const files = await new Promise((resolve, reject) => {
    fs.readdir(ASSERTS_DIR, (err, files) => {
      if (!!err) {
        reject(err);
      }

      resolve(files)
    })
  })

  for (let i = 0; i < files.length; i++) {
    let fileName = files[i].toString();

    // get file type by ext
    const ext = path.extname(fileName).substr(1)

    //
    const fileNameWithoutExt = fileName.split('.')[0];

    if (ext === "article") {

      let filePath = path.join(ASSERTS_DIR, fileName)
      let article = JSON.parse(fs.readFileSync(filePath, { encoding: "utf8" }));

      // record valid img(header)
      validImgsSet.add(article.img);

      // record valid img(data)
      articleData = article.data;
      for (let item of article.data) {
        if (item.type === "imgUpload") {
          validImgsSet.add(item.data);
        }
      }

      // record valid tags
      for (let tag of article.tags) {
        validTagsSet.add(tag)
      }

      articlesSet.add(fileNameWithoutExt)
    }
    else if (ext === "breviaryArticle") {
      breviaryArticlesSet.add(fileNameWithoutExt)
    }
    else {
      allImgsSet.add(fileName)
    }
  }

  // clear invalid img
  for (let img of [...allImgsSet]) {
    if (!validImgsSet.has(img)) {
      removeFile(path.join(ASSERTS_DIR, img))

      logger.info(`cleanFs, clear invaid img, ${img}`)
    }
  }

  // clear invalid article
  for (let breviaryArticle of [...breviaryArticlesSet]) {
    if (!articlesSet.has(breviaryArticle)) {
      removeFile(path.join(ASSERTS_DIR, `${breviaryArticle}.article`))

      logger.info(`cleanFs, clear invaid article, ${breviaryArticle}.article`)
    }
  }
  for (let article of [...articlesSet]) {
    if (!breviaryArticlesSet.has(article)) {
      removeFile(path.join(ASSERTS_DIR, `${article}.breviaryArticle`))

      logger.info(`cleanFs, clear invaid breviary article, ${breviaryArticle}.breviaryArticle`)
    }
    else {
      validArticlesSet.add(article);
    }
  }

  //
  process[Symbol.for("validTagsSet")] = validTagsSet;
  process[Symbol.for("validArticlesSet")] = validArticlesSet;
}

const removeFile = async fileName => {
  await new Promise((resolve, reject) => {
    fs.unlink(fileName, err => {
      if(!!err)
      {
        reject(err);
      }

      resolve()
    })
  })
}