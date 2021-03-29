const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

//create a route for quote route
const quoteApiRouter = express.Router();
app.use('/api', quoteApiRouter );


//endpoint Get Random Quote
quoteApiRouter.get( '/quote/random', (req, res, next) => {

    const elem = getRandomElement(quotes);
    res.status(200).send(elem)
});

//endpoint Get all quotes
quoteApiRouter.get( '/quotes', (req, res, next) => {
    const person = req.query.person;

    if (person) {
       // find index of person
       const index =  quotes.findIndex( quote => quote.person === person );
       res.status(200).send( quotes[index]);
    }
    else res.status(200).send(quotes);
});


app.listen(PORT);