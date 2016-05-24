//lets require/import the mongodb native drivers.
var mongodb = require('mongodb').MongoClient;
var assert = require('assert');

var mongoAddr = process.env.MONGODB
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://' + mongoAddr + '/little-url';

var save = function(id, original) {
    mongodb.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log('Connection established');
        mongoInsert(db, 'map', {"id": id, "original":original}, function(){
            console.log('Data saved');
            db.close();
        });
    });
}

function mongoInsert(db, collectionName, data, cbk) {
    var collection = db.collection(collectionName);
    collection.insertOne(data, function(err, r) {
        assert.equal(null, err);
        cbk();
    });
}

// The database object
var database = function() {
    this.save = save;
}


module.exports = new database;
