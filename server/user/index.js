const LocalStrategy = require('passport-local').Strategy;
const { ERR_SERVER_INNER, ERR_LOGIN_FAILED, SUCCESS, USER, PASSWORD } = require('../../common/constant')
const { keccak256, stringToBuffer } = require('../../common/util')
const cookie = require('cookie');

const app = process[Symbol.for("app")];
const passport = process[Symbol.for("passport")];

// password
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },

  function(username, password, done) {
    if(username !== USER)
    {
      return done(null, { message: 'Incorrect username.' });
    }

    if(password !== PASSWORD)
    {
      return done(null, { message: 'Incorrect password.' });
    }

    return done(null, null)
  }
));

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, info) {
    if (err) 
    { 
      return res.json({
        code: ERR_SERVER_INNER,
        msg: `login failed, inner err, ${err}`
      });
    }

    if(info)
    {
      return res.json({
        code: ERR_LOGIN_FAILED,
        msg: `login failed, ${info.message}`
      });
    }

    process[Symbol.for("sid")] = keccak256(stringToBuffer(USER + PASSWORD + Date.now())).toString("hex");

    // Set a new cookie with the name
    res.setHeader('Set-Cookie', cookie.serialize("sid", process[Symbol.for("sid")], {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    }));

    //
    res.json({
      code: SUCCESS,
      msg: ""
    });

  })(req, res, next);
});