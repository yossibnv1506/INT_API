import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';


let winston = require('winston');
const mongoose= require('mongoose');
const config= require('./config/database');
const index = express();
index.use(cors());
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: true }));

//Connect to DB using config file
const PORT= process.env.DB_PORT;
const IP= process.env.DB_IP;
// mongodb://127.0.0.1:27017/app
const connectionString= 'mongodb://'+ IP +':'+PORT+'/app';
mongoose.connect(config.database);

//On connection event
mongoose.connection.on('connected',()=>{
    console.log('Connected to database '+ connectionString);
});

//On error (connection to DB)
mongoose.connection.on('error',(err)=>{
    console.log('Database error '+ err);
    // exit
    process.exit(1);
});

const userMessage = require('./src/routes/userMessage');
index.use('/postMessage', userMessage);

// Start
index.listen(process.env.APP_PORT, () =>{
        console.log(`Example app listening on port ${process.env.APP_PORT}!`);
}
);

// Index Route
index.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});



