const { MongoClient } = require('mongodb');

let mongoDB;

const setupDB = (callback) => {
  const uri = 'mongodb+srv://daniboomerang:win2000d@cluster0-ramcf.mongodb.net/test?retryWrites=true&w=majority';

  MongoClient.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      mongoDB = client.db('MERG-BE');

      if (err) {
        return callback(err);
      }
      return callback('DB OK');
    },
  );
};

const getDB = () => mongoDB;

module.exports = { setupDB, getDB };
