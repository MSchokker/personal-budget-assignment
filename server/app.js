const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    res.send('Hello, World');
})

console.log(`Server listening at Port: ${PORT}`);
app.listen(PORT);
