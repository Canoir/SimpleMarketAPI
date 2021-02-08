exports.addUser = async (req, res) => {
  res.app.locals.socketUser.emit(
    "addUser",
    {
      UserPass: req.body.userpass,
      Name: req.body.name,
    },
    (_res) => {
      res.json(_res);
    }
  );
};

exports.addManager = async (req, res) => {
  res.app.locals.socketUser.emit(
    "addManager",
    {
      UserPass: req.body.userpass,
      Name: req.body.name,
    },
    (_res) => {
      res.json(_res);
    }
  );
};
