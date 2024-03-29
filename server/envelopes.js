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

const findEnvelopeIndex = (envelopeId) => {
    const index = envelopes.findIndex((envelope) => {
        return envelope.id === envelopeId;
    });
    return index;
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
    const index = findEnvelopeIndex(envelopeId);
    if (index !== -1) {
        req.envelopeId = envelopeId;
        req.envelopeIndex = index;
        next();
    } else {
        res.status(404).send(`Envelope with id ${envelopeId} was not found.`);
    }
});

envelopeRouter.get('/:envelopeId', (req, res, next) => {
    res.send(envelopes[req.envelopeIndex]);
});

envelopeRouter.put('/:envelopeId', (req, res, next) => {
    const envelope = {
        id: req.envelopeId,
        title: req.body.title,
        budget: req.body.budget
    };
    envelopes[req.envelopeIndex] = envelope;
    res.status(203).send(envelope);    
});

envelopeRouter.delete('/:envelopeId', (req, res, next) => {
    envelopes.splice(req.envelopeIndex, 1);
    res.status(204).send();
});

envelopeRouter.post('/:from/:to', (req, res, next) => {
    const amount = Number(req.headers.amount);
    const indexFrom = findEnvelopeIndex(req.params.from);
    const indexTo = findEnvelopeIndex(req.params.to);
    if(indexFrom === -1 || indexFrom === -1) {
        res.status(404).send('Please enter valid to and from envelopes.');   
    } else if(amount <= 0) {
        res.status(400).send('Please provide a positive amount');
    } else if(envelopes[indexFrom].budget < amount) {
        res.status(400).send('Insufficient funds');
    } else {
        envelopes[indexFrom].budget -= amount;
        envelopes[indexTo].budget += amount;
        res.status(203).send('Transfer completed.');
    }
});