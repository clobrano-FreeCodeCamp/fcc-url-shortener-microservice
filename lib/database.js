//lets require/import the mongodb native drivers.
var mongodb = require('mongodb').MongoClient;
var assert = require('assert');

var mongoAddr = process.env.MONGODB
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://' + mongoAddr + '/little-url';

var connect = function(action, data) {
    mongodb.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log('Connection established');
        if (action)
            action(db,
                   data,
                   function(){db.close()}
            );
    });
}

var connectAndSave = function(id, original) {
    var data = {
        "collection": "map",
        "item": {"id": id, "original": original},
        "err": null
        }
    connect(save, data);
}

function save(db, data, callback) {
    var collection = db.collection(data.collection);
    collection.insertOne(data.item, function(err, r) {
        assert.equal(null, err);
        callback();
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
            } else {
                console.log("Found %j", data);
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
