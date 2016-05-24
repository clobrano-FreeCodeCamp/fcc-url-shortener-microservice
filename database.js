//lets require/import the mongodb native drivers.
var mongodb = require('mongodb').MongoClient;
var assert = require('assert');

var mongoAddr = process.env.MONGODB
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://' + mongoAddr + '/little-url';

var connectAndSave = function(id, original) {
    mongodb.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log('Connection established');
        save(db, 'map', {"id": "" + id, "original":original}, function(){
            console.log('Data saved');
            db.close();
        });
    });
}

function save(db, collectionName, data, cbk) {
    var collection = db.collection(collectionName);
    collection.insertOne(data, function(err, r) {
        assert.equal(null, err);
        cbk();
    });
}

var connectAndLoad = function(urlId, callback) {
    mongodb.connect(url, function(err, db) {
        load(err, db, 'map', {id: urlId}, function(){
            callback();
            db.close();
        });
    });
}

var load = function(err, db, collectionName, filter, callback) {
    if (err) {
        console.log('Could not connect to db: ' + err);
        callback(null);
    } else {
        var collection = db.collection(collectionName);
        console.log('Looking for %j', filter);
        collection.findOne(filter, function (err, data) {
            if (err) {
                console.log('Could not find %j: %s', filter, err);
                data = null;
            }
            callback(data);
        });
    }
}

// The database object
var database = function() {
    this.save = connectAndSave;
    this.load = connectAndLoad;
}


module.exports = new database;
