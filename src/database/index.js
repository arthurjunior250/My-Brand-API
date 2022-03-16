import mongoose from 'mongoose';
const env = process.env.NODE_ENV;
import "dotenv/config";

const dev_db_url = process.env.DB_DEVELOPMENT_URL;
const prod_db_url = process.env.DB_PRODUCTION_URL;
const test_db_url = process.env.DB_TESTING_URL;
const connectionUrl = env == "dev" ? dev_db_url : env == "prod" ? prod_db_url : test_db_url;


mongoose.connect(connectionUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => {
        console.log("App connected to Mongodb successfully")
        console.log(connectionUrl)
    })
    .catch((e) => {
        console.log("Mongodb connection error " + e.message);
    })