const cleanDb = require("./cleanDb");
const cleanFs = require("./cleanFs");
const async = require("async");

async.waterfall([
    function(cb) {
        cleanFs(cb)
    },

    function(cb) {
        cleanDb(cb);
    }
])