const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const Stoplight = require('flow-stoplight')
const cache = require('./cache')
const levelup = require('levelup')
const leveldown = require('leveldown')
const cors = require("cors");

const log4js = require('./logConfig')
const logger = process[Symbol.for("logger")] = log4js.getLogger()
const errlogger = process[Symbol.for("errLogger")] = log4js.getLogger('err')
const othlogger = process[Symbol.for("othLogger")] = log4js.getLogger('oth')

// express
const app = express()
app.use('/', express.static(path.resolve('dist')))
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json({ limit: '20mb' }))
app.use(passport.initialize())

// 
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8000', // web前端服务器地址
}));

//
process[Symbol.for("passport")] = passport
process[Symbol.for("app")] = app
process[Symbol.for("stoplight")] = new Stoplight()
process[Symbol.for("cache")] = cache
process[Symbol.for("breviaryArticles")] = []
process[Symbol.for("tags")] = []
process[Symbol.for("db")] = levelup(leveldown(path.join(__dirname, './mydb')))
process[Symbol.for("hotArticles")] = [];
process[Symbol.for("hotTags")] = [];

// logger
log4js.useLogger(app, logger)

//
process.on('uncaughtException', function (err) {
  errlogger.error(err.stack)
  
  process.exit(1);
});

require('./user')
require('./article')
require('./photo')

// init cache
cache.initFsCache()
cache.initDbCache()

process[Symbol.for("stoplight")].await(() => {
  const server = app.listen(8080, function () {
    let host = server.address().address
    console.log('server listening at http://%s:%s', host, 8080)
  })
})

