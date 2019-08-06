const log4js = require('./logConfig')
const logger = process[Symbol.for("logger")] = log4js.getLogger();
const errlogger = process[Symbol.for("errLogger")] = log4js.getLogger('err');

const cleanDb = require("./cleanDb");
const cleanFs = require("./cleanFs");

(async () => {
    await cleanFs();
    await cleanDb();
})().then().catch(err => {
    errlogger.error(`clean invalid asset throw exception, ${err.stack ? err.stack : err}`);
})