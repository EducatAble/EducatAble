//Dependencies
import * as dotenv from 'dotenv';

dotenv.config();

import * as express from 'express';
import * as mongoose from 'mongoose';
import { routes } from './routes';

//Express setup
const app = express();
const PORT = 3000;

//Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Avoid using default session cookie name
app.set('trust proxy', 1);

//Routes
app.use(routes);

// Connect to the Mongo DB
const MONGODB_URI = 'mongodb://mongo:27017/educateable';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
