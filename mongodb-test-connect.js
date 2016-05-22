//lets require/import the mongodb native drivers.
var mongodb = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://172.17.0.4:27017/urlshort';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});
