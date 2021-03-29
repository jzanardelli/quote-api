const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

//create a route for quote route
const quoteApiRouter = express.Router();
app.use('/api', quoteApiRouter );


//Endpoint: get random quote
quoteApiRouter.get( '/quotes/random', (req, res, next) => {

    const elem = getRandomElement(quotes);
    res.status(200).send({quote : elem})
});

//Endpoint: get all quotes
quoteApiRouter.get( '/quotes', (req, res, next) => {
    const person = req.query.person;


    if (person) {
       // find index of person
       const quotesFiltered = quotes.filter( quote => quote.person === person );

       res.status(200).send( {quotes : quotesFiltered } );
    }
    else res.status(200).send({quotes : quotes});
});

//Endpoint: post a quote
quoteApiRouter.post( '/quotes', (req, res, next) => {
    const person = req.query.person;
    const quote = req.query.quote;

    if (person && quote) {
        quotes.push( { person: person, quote: quote} );
        res.status(200).send({quote : { person: person, quote: quote} });
    }
    else res.status(400).send();
});



app.listen(PORT);