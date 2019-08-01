const cleanFs = function (cb) {
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

    fs.readdir(ASSERTS_DIR, (err, files) => {
        if (!!err) {
            return cb(err);
        }

        for (let i = 0; i < files.length; i++) {
            let fileName = files[i].toString();

            // get file type by ext
            const ext = path.extname(fileName).substr(1)

            //
            const fileNameWithoutExt = path.split('.')[0];

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
                for(let tag of article.tags)
                {
                    validTagsSet.push(tag)
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
        for(let img of [...allImgsSet])
        {
            if (!validImgsSet.find(img))
            {
                fs.unlink(path.join(ASSERTS_DIR, img))
            }
        }

        // clear invalid article
        for (let breviaryArticle of [...breviaryArticlesSet])
        {
            if (!articlesSet.find(breviaryArticle))
            {
                fs.unlink(path.join(ASSERTS_DIR, `${breviaryArticle}.article`))
            }
        }
        for (let article of [...articlesSet]) {
            if (!breviaryArticlesSet.find(article)) {
                fs.unlink(path.join(ASSERTS_DIR, `${article}.breviaryArticle`))
            }
            else {
                validArticlesSet.add(article);
            }
        }

        //
        process[Symbol.for("validTagsSet")] = validTagsSet;
        process[Symbol.for("validArticlesSet")] = validArticlesSet;

        cb();
    });
}


const cleanTags = function (cb) {
    //
    const dbArtilcesSet = []
    const dbTagsSet = []

    process[Symbol.for("db")].createReadStream()
        .on('data', function (data) {
            const key = data.key.toString()
            const value = JSON.parse(data.value.toString())

            const prefixIndex = key.indexOf('_');
            const prefix = key.substr(0, prefixIndex);

            // attach article name or tag name
            value.name = key.substr(prefixIndex + 1);

            if (prefix + '_' === MONITOR_ARTICLE_KEY_PREFIX) {
                dbArtilcesSet.add(value)
            }
            else if (prefix + '_' === MONITOR_TAG_KEY_PREFIX) {
                dbTagsSet.add(value)
            }
            else {
                throw new Error(`db is dirty, invalid prefix ${prefix}`)
            }
        })
        .on('error', function (err) {
            throw new Error(`db createReadStream failed, ${err}`)
        })
        .on('end', function () {

            (async () => {
                const validTagsSet = process[Symbol.for("validTagsSet")];
                for (let dbArtilce of [...dbArtilcesSet]) {
                    if (!validTagsSet.find(dbArtilce)) {
                        await dbDel(dbArtilce);
                    }
                }

                const validArticlesSet = process[Symbol.for("validArticlesSet")];
                for (let dbTag of [...dbTagsSet]) {
                    if (!validArticlesSet.find(dbTag)) {
                        await dbDel(dbTag);
                    }
                }
            }).then(cb).catch(cb)
            
        })
}


const dbDel = async key => {
    await new Promise((resolve, reject) => {
        process[Symbol.for("db")].del(key, err => {
            if(err)
            {
                reject(err)
            }

            resolve()
        });
    })
}