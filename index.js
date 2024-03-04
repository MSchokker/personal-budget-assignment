const envelopeList = document.getElementById('envelope-list');

const deleteEnvelope = async (envelopeId) => {
    try {
        console.log(`Trying to delete envelope ${envelopeId}`);
        const response = await fetch(`http://127.0.0.1:3000/envelopes/${envelopeId}/`, {method: 'DELETE', cache: 'no-cache'});
        if(response.ok) {
            window.alert('Envelope is deleted');
        }
    } catch (err) {
        console.log(err);
    }
}

const addEnvelope = (envelope) => {
    const newEnvelope = document.createElement('span');
    newEnvelope.innerText = envelope.title;
    newEnvelope.classList.add('envelope');
    newEnvelope.envelopeId = envelope.id;
    
    const budget = document.createElement('span');
    budget.innerText = envelope.budget;
    budget.classList.add('budget');
    newEnvelope.appendChild(budget);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener('click', (evt) => {
        const envelope = evt.target.parentElement;
        deleteEnvelope(envelope.envelopeId);
        envelopeList.removeChild(envelope);
    });

    newEnvelope.appendChild(deleteButton);

    envelopeList.appendChild(newEnvelope);
}

const getAllEnvelopes = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3000/envelopes/', {cache: 'no-cache'});
        if(response.ok) {
            const responseJSON  = await response.json();
            console.log(responseJSON);
            for (let envelope of responseJSON) {
                addEnvelope(envelope);
            }
        } else {
            console.log('something went wrong: ');
        }
    } catch (err) {
        console.log(err);
    }
};

getAllEnvelopes();