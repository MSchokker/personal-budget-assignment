const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// app.use((req, res, next) => {
//     console.log(req);
//     next();
// })

const envelopeRouter = require('./envelopes.js');
app.use('/envelopes', envelopeRouter);

console.log(`Server listening at Port: ${PORT}`);
app.listen(PORT);
