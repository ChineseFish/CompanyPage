const levelup = require('levelup')
const leveldown = require('leveldown')

levelDbInstance = levelup(leveldown('../server/mydb'))

module.exports = function (cb) {
  //
  const dbArtilcesSet = []
  const dbTagsSet = []

  levelDbInstance.createReadStream()
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
      })().then(cb).catch(cb)
    })
}


const dbDel = async key => {
  await new Promise((resolve, reject) => {
    levelDbInstance.del(key, err => {
      if (err) {
        reject(err)
      }

      resolve()
    });
  })
}