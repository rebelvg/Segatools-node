const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const messages = require('./routes/messages');
const names = require('./routes/names');

app.use('/api/messages', messages);
app.use('/api/names', names);

app.use(function (req, res, next) {
    throw new Error('Not found.');
});

app.use(function (err, req, res, next) {
    res.status(500).json({error: err.message});
});

MongoClient.connect('mongodb://localhost/', {useNewUrlParser: true}, async function (err, client) {
    if (err) throw err;

    app.set('mongoClient', client.db('segatools'));

    app.listen(3000, () => {
        console.log('server is running.');
    });
});