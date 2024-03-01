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

envelopeRouter.param('envelopeId', (req, res, next, envelopeId) => {
    const envelope = envelopes.find((item) => {
        return item.id === envelopeId;
    });
    if (envelope) {
        req.envelopeId = envelopeId;
        req.envelope = envelope;
        next();
    } else {
        res.status(404).send(`Envelope with id ${envelopeId} was not found.`);
    }
});

envelopeRouter.get('/:envelopeId', (req, res, next) => {
    res.send(req.envelope);
});
