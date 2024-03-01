const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    res.send('Hello, World');
})

const envelopeRouter = require('./envelopes.js');
app.use('/envelopes', envelopeRouter)

console.log(`Server listening at Port: ${PORT}`);
app.listen(PORT);
