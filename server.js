'use strict';

import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import {fileURLToPath} from 'url';
import bodyParser from 'body-parser';
import Cards from './schemas/Cards.js';

// Env Config
const __filename = fileURLToPath(import.meta.url),
    __dirname = path.dirname(__filename),
    envPath = __dirname + "/.env";

dotenv.config({path:envPath});

// App Config
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// DB config
try{
    mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
        console.log('Connected to Database.');
    });
}catch (error) {
    console.log('Failed to connect to Database.', error);
}

// API endpoints
app.get('/', (req, res) => {
    res.status(200).send('Hello TheWebDev');
});

app.get('/dating/cards', (req, res) => {
    Cards.find({},(err, data) => {
        if(err){
            res.status(500).send({success: false, error: err});
        }
        res.status(200).send({success: true, cards: data});
    })
})

app.post('/dating/cards', (req, res) => {
    const dbCard = new Cards();
    dbCard.name = req.body.name;
    dbCard.imgUrl = req.body.imgUrl;

    dbCard.save((err) => {
        if(err){
            res.status(500).send({success: false, error: err});
        }
        res.status(200).send({success: true, msg: "Successfully saved Card info."});
    })
})

// Listener
app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`);
});

export default app;