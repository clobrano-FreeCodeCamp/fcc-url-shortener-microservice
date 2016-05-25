//lets require/import the mongodb native drivers.
var mongodb = require('mongodb').MongoClient;
var assert = require('assert');

var debugLocation = process.env.MONGODB

if (debugLocation) {
    // Connection URL. This is where your mongodb server is running.
    var url = 'mongodb://' + debugLocation + '/little-url';
} else {
    var user = process.env.MONGO_USER;
    var pass = process.env.MONGO_PASSWORD;
    var url = 'mongodb://' + user + ':' + pass + '@ds023520.mlab.com:23520/little-url';
}

var connect = function(action, data) {
    mongodb.connect(url, function(err, db) {
        if (err) {
            console.log('Could not connect to %s', url);
            assert.equal(null, err);
        }
        console.log('Connection established');
        if (action)
            action(db, data);
    });
}

var connectAndSave = function(id, original) {
    var data = {
        "collection": "map",
        "item": {"id": id, "original": original},
        "err": null
        };
    connect(save, data);
}

function save(db, data) {
    console.log('Saving %j', data);
    var collection = db.collection(data.collection);
    collection.insertOne(data.item, function(err, r) {
        assert.equal(null, err);
        console.log('Save done');
        db.close();
    });
}

function connectAndLoad(urlId, callback) {
    var data = {
        "urlId": urlId,
        "collection": "map",
        "callback": callback
    };
    connect(load, data);
}

function load(db, data) {
    var collection = db.collection(data.collection);
    var filter = {"id": parseInt(data.urlId)};
    console.log('Looking for %j', filter);
    collection.findOne(filter, function (err, item) {
        if (err) {
            console.log('Could not find %j: %s', filter, err);
            data = null;
        } else {
            console.log("Found %j", item);
        }
        data.callback(item);
    });
}

// The database object
var database = function() {
    this.save = connectAndSave;
    this.load = connectAndLoad;
}


module.exports = new database;
