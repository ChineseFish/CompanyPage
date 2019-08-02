const async = require('async')
const { MONITOR_ARTICLE_KEY_PREFIX, MONITOR_TAG_KEY_PREFIX } = require('../depends/constant')

module.exports.recordArticleClick = function(filename)
{
	let key = MONITOR_ARTICLE_KEY_PREFIX + filename

	async.waterfall([
		function(cb) {
			process[Symbol.for("db")].get(key, function (err, value) {
			  if(err) 
			  {
			    if(err.notFound) 
			    {
			      value = {
			      	clickNum: 1,
			      	weight: 1
			      }

			      return cb(null, value)
			    }
			    
			    return cb(err)
			  }

			  cb(null, JSON.parse(value));
			})
		}, 
		function(value, cb) {
			value.clickNum++

			process[Symbol.for("db")].put(key, JSON.stringify(value), err => {
				cb(err)
			});
		}], err => {
			if(!!err) {
				throw new Error(`recordArticleClick failed, ${err}`)
			}
		})
}

module.exports.recordTagClick = function(tag)
{
	let key = MONITOR_TAG_KEY_PREFIX + tag

	async.waterfall([
		function(cb) {
			process[Symbol.for("db")].get(key, function (err, value) {
			  if(err) 
			  {
			    if(err.notFound) 
			    {
			      value = {
			      	clickNum: 1,
			      	weight: 1
			      }

			      return cb(null, value)
			    }
			    
			    return cb(err)
			  }

			  cb(null, JSON.parse(value))
			})
		}, 
		function(value, cb) {
			value.clickNum++

			process[Symbol.for("db")].put(key, JSON.stringify(value), err => {
				cb(err)
			})
		}], err => {
			if(!!err) {
				throw new Error(`recordTagClick failed, ${err}`)
			}
		})
}