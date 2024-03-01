const express = require('express');
const envelopeRouter = express.Router();

const envelopes = [];
let envelopeCounter = 1;

module.exports = envelopeRouter;

envelopeRouter.get('/', (req, res, next) => {
    res.send(envelopes);
});
