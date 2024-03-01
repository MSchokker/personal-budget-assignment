const { create } = require('domain');
const express = require('express');
const envelopeRouter = express.Router();

const envelopes = [];
let envelopeCounter = 1;

const createEnvelope = (title, budget) => {
    if(title && budget) {
        return {
            id: `${envelopeCounter++}`,
            title: title,
            budget: budget
        } 
    } else {
        return null;
    }
};

module.exports = envelopeRouter;

envelopeRouter.get('/', (req, res, next) => {
    res.send(envelopes);
});

envelopeRouter.post('/', (req, res, next) => {
    const envelope = createEnvelope(req.body.title, Number(req.body.budget));
    if(envelope) {
        envelopes.push(envelope);
        res.status(201).send(envelope);
    } else {
        res.status(400).send();
    }
});
