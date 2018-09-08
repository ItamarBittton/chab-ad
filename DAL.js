const mongo = require('mongodb');
const CONNECTION_URL = 'mongodb://sol:solsol44@ds249372.mlab.com:49372/heroku_tjxz75h9';
const DB_NAME = 'heroku_tjxz75h9';

module.exports = {

    // ################### CRUD ################### //

    GetAll: (collection, callback) => {
        try {
            mongo.connect(CONNECTION_URL, {
                useNewUrlParser: true
            }, (err, db) => {
                if (err) {
                    logErrors(err);
                } else {
                    db.db(DB_NAME).collection(collection).find({}).toArray((err, result) => {
                        handleDbResult(err, result, callback);
                    });
                }
            });
        } catch (error) {
            logErrors(error);
        }
    },
    Get: (collection, query, callback) => {
        try {
            mongo.connect(CONNECTION_URL, {
                useNewUrlParser: true
            }, (err, db) => {
                if (err) {
                    logErrors(err);
                } else {
                    db.db(DB_NAME).collection(collection).findOne(query, (err, result) => {
                        handleDbResult(err, result, callback);
                    });
                }
            });
        } catch (error) {
            logErrors(error);
        }
    },
    Insert: (collection, object, callback) => {
        try {
            mongo.connect(CONNECTION_URL, {
                useNewUrlParser: true
            }, (err, db) => {
                if (err) {
                    logErrors(err);
                } else {
                    db.db(DB_NAME).collection(collection).insertOne(object, (err, result) => {
                        handleDbResult(err, result, callback);
                    });
                }
            });
        } catch (error) {
            logErrors(error);
        }
    },
    Update: (collection, query, updateObject, callback) => {
        try {
            mongo.connect(CONNECTION_URL, {
                useNewUrlParser: true
            }, (err, db) => {
                if (err) {
                    logErrors(err);
                } else {
                    db.db(DB_NAME).collection(collection).updateOne(query, updateObject, (err, result) => {
                        handleDbResult(err, result, callback);
                    });
                }
            });
        } catch (error) {
            logErrors(error);
        }
    },
    Delete: (collection, query, callback) => {
        try {
            mongo.connect(CONNECTION_URL, {
                useNewUrlParser: true
            }, (err, db) => {
                if (err) {
                    logErrors(err);
                } else {
                    db.db(DB_NAME).collection(collection).deleteOne(query, (err, result) => {
                        handleDbResult(err, result, callback);
                    });
                }
            });
        } catch (error) {
            logErrors(error);
        }
    }
}

// ################### Private Methods ################### //

function handleDbResult(err, result, callback) {
    if (err) {
        logErrors(err);
    } else {
        callback(result);
    }
}

function logErrors(err) {
    // log somewhere else
    console.log(err);
}