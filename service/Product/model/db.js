const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const config = require("../config/app.config");
const url = config.mongoDbUrl;
const dbName = config.dbName;

module.exports = (callBack) => {
  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      assert.strictEqual(null, err, config.mongodbConnectionFailureLog);
      console.log(config.mongodbConnectionSuccessLog);
      const db = client.db(dbName);
      db.collection(config.productCollectionName).createIndex({ Title: 1 });
      callBack(db);
    }
  );
};
