module.exports = {
  mongoDbUrl: "mongodb://localhost:27017",
  dbName: "SimpleMarketAPI_ProductCategory",
  mongodbConnectionFailureLog: "Mongodb connection failed!",
  mongodbConnectionSuccessLog: "Connected successfully to Mongodb!",
  maxSocketConnections: 1,
  port: 3002,
  categoryCollectionName: "product_category",
  hashRounds: 8,
  successCode: 200,
  failureCode: 503,
  duplicateKey: 501,
};
