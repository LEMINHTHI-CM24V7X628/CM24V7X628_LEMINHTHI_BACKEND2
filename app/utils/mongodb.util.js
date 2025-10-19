// app/utils/mongodb.util.js

const { MongoClient } = require("mongodb");

class MongoDB {
    // 1. Khai báo client là static property
    static client = null; 

    static connect = async (uri) => {
        if (this.client) return this.client;
        
        // 2. Sử dụng await cho MongoClient.connect()
        this.client = await MongoClient.connect(uri); 
        return this.client;
    };
}
module.exports = MongoDB;