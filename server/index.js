const express = require('express');
const router = require('./routes/index')

const {PORT} = process.env || 3010;

const app = express();
app.use('/api', router)


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
