import mongoose from 'mongoose';
const env = process.env.NODE_ENV;
import "dotenv/config";

const db_url = (env == 'production') ? process.env.DB_PRODUCTION_URL : process.env.DB_DEVELOPMENT_URL

mongoose.connect(db_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => {
        console.log("App connected to Mongodb successfully")
        console.log(db_url)
    })
    .catch((e) => {
        console.log("Mongodb connection error " + e.message);
    })