const process = require('process')
const path = require('path')
const fs = require('fs')
const { MONITOR_ARTICLE_KEY_PREFIX, MONITOR_TAG_KEY_PREFIX, ASSERTS_DIR } = require('../common/constant')
const _ = require('underscore')
const async = require('async')

module.exports.update = module.exports.initFsCache = function(cb)
{
	// 文章
	const fileNameDetails = [];
	const breviaryArticles = [];

	// 标签
	const tagsMap = new Map()
	const tags = [];

	async.waterfall([
 		function(cb) {
			// get breviary artile file name
      fs.readdir(ASSERTS_DIR, (err, files) => {
        if(!!err)
        {
          return cb(err);
        }

        // filter breviaryArticle
        for(let i = 0; i < files.length; i++)
        {
					let fileName = files[i].toString();
					
          // get file type by ext
          const ext = path.extname(fileName).substr(1)
          if(ext === "breviaryArticle")
          {
            const date = fileName.split('_', 1)[0]
            fileNameDetails.push({
              date: date,
              fileName: fileName
            });
          }
        }

        // order by date desc
        fileNameDetails = _.sortBy(fileNameDetails, ele => {
          return -ele.date;
        });

        cb();
      });
    },
    function(cb) {
			// get breviaryArticles and tags
			fileNameDetails.forEach(({ fileName }) => {
				let filePath = path.join(ASSERTS_DIR, fileName)
				let article = JSON.parse(fs.readFileSync(filePath, {encoding: "utf8"}))

				// record article
				breviaryArticles.push(article);

				// compute tag
				for(let i = 0; i < article.tags.length; i++)
				{
					let tag = article.tags[i]

					if (!tagsMap.has(tag))
					{
						tagsMap.set(tag) = 1
					}
					else
					{
						const originCount = tagsMap.get(tag);
						tagsMap.set(tag, originCount + 1);
					}
				}
			})

			// sort tags
			tags = _.sortBy([...tagsMap], entry => {
				return -entry[1]
			}).map(entry => {
				return entry[0]
			})

      cb();
    }], err => {
    	if(!!err)
    	{
    		throw new Error(`init cache failed, ${err}`)
    	}

    	process[Symbol.for("breviaryArticles")] = breviaryArticles;
    	process[Symbol.for("tags")] = tags;

    	process[Symbol.for("stoplight")].go();
    })
}

module.exports.initDbCache = function()
{
	init()

	const intervalTime = 24 * 60 * 60 * 1000;

	setInterval(() => {
		init()
	}, intervalTime);
	
	function init()
	{
		//
		const artilces = []
		const tags = []

		const hotTags = [];
		const hotArticles = []

		process[Symbol.for("db")].createReadStream()
		.on('data', function (data) {
			const key = data.key.toString()
			const value = JSON.parse(data.value.toString())

			const prefixIndex = key.indexOf('_');
			const prefix = key.substr(0, prefixIndex);

			// attach article name or tag name
			value.name = key.substr(prefixIndex + 1);

			if(prefix + '_' === MONITOR_ARTICLE_KEY_PREFIX)
			{
				artilces.push(value)
			}
			else if(prefix + '_' === MONITOR_TAG_KEY_PREFIX)
			{
				tags.push(value)
			}
			else
			{
				throw new Error(`db is dirty, invalid prefix ${prefix}`)
			}
		})
		.on('error', function (err) {
			throw new Error(`db createReadStream failed, ${err}`)
		})
		.on('end', function () {
			// order
			artilces = _.sortBy(artilces, article => {
				return - (article.clickNum * article.weight)
			})
			artilces.forEach(artilce => {
				hotArticles.push(artilce.name)
			})
			process[Symbol.for("hotArticles")] = hotArticles;

			// order
			tags = _.sortBy(tags, tag => {
				return - (tag.clickNum * tag.weight)
			});
			tags.forEach(tag => {
				hotTags.push(tag.name)
			})
			process[Symbol.for("hotTags")] = hotTags;
		})
	}
}