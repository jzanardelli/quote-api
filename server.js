const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

//create a route for quote route
const quoteApiRouter = express.Router();
app.use('/api/quote', quoteApiRouter );


//endpoint Get Random Quote
quoteApiRouter.get( '/', (req, res, next) => {

    const elem = getRandomElement(quotes);
    res.status(200).send(elem)
});

app.listen(PORT);