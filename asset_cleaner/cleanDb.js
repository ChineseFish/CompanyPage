const levelup = require('levelup')
const leveldown = require('leveldown')
const path = require("path");

const logger = process[Symbol.for("logger")]

const levelDbInstance = levelup(leveldown(path.join(__dirname, '../server/mydb')))

module.exports = async function () {
  //
  const dbArtilcesSet = []
  const dbTagsSet = []

  await new Promise((resolve, reject) => {
    levelDbInstance.createReadStream().on('data', function (data) {
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
    }).on('error', function (err) {
      reject(`cleanDb, db createReadStream failed, ${err}`)
    }).on('end', function () {

      (async () => {

        const validArticlesSet = process[Symbol.for("validArticlesSet")];
        for (let dbArtilce of [...dbArtilcesSet]) {
          if (!validArticlesSet.find(dbArtilce)) {
            await dbDel(dbArtilce);

            logger.info(`cleanDb, clear invalid hot article ${dbArtilce}`)
          }
        }

        const validTagsSet = process[Symbol.for("validTagsSet")];
        for (let dbTag of [...dbTagsSet]) {
          if (!validTagsSet.find(dbTag)) {
            await dbDel(dbTag);

            logger.info(`cleanDb, clear invalid hot tag ${dbTag}`)
          }
        }
      })().then(() => {
        resolve()
      }).catch(err => {
        reject(`cleanDb, throw exception, ${err}`)
      })
    })
  });
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