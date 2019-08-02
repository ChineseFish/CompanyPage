const cookie = require('cookie');
const { ERR_COOKIE_INVALID } = require('../../depends/constant')

module.exports.checkCookie = function (req, res, next) {
  // Parse the cookies on the request
  var cookies = cookie.parse(req.headers.cookie || '');

  // Get the visitor sid set in the cookie
  var sid = cookies.sid;

  if(process[Symbol.for("sid")] && sid === process[Symbol.for("sid")])
  {
    return next();
  }

  res.json({
    code: ERR_COOKIE_INVALID,
    msg: "please login first"
  });
}