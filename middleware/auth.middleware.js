const config = require("../config/app.config");
//
exports.login = async (req, res) => {
  res.app.locals.socketAuth.emit(
    "login",
    {
      UserPass: req.body.userpass,
    },
    (_res) => {
      res.json(_res);
    }
  );
};
exports.roleManager = (roles) => {
  return (req, res, next) => {
    if (req.headers["authorization"])
      _verify(
        res,
        req.headers["authorization"].split(" ")[1],
        (verifyResult) => {
          let access = false;
          if (verifyResult && verifyResult.code === config.successCode) {
            roles.forEach((el) => {
              if (el == verifyResult.roleId) access = true;
            });
            if (access == true) {
              res.locals.username = verifyResult._id;
              next();
            } else res.json({ code: config.accessDeniedCode });
          } else {
            if (verifyResult) res.json({ code: verifyResult.code });
            else res.json({ code: config.failureCode });
          }
        }
      );
    else res.json({ code: config.accessDeniedCode });
  };
};
async function _verify(res, token, callback) {
  res.app.locals.socketAuth.emit(
    "verify",
    {
      JWT: token,
    },
    callback
  );
}
