const express = require('express');

const {PORT} = process.env || 3010;

const app = express();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})