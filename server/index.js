const express = require('express');
const router = require('./routes/index')
const cors = require('cors')
const errorHandler = require('./middleware/ErrorHandingMiddleware')

const {PORT} = process.env || 3010;

const app = express();
app.use(cors());
app.use(express.json())

app.use('/api', router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} !!! Happy Hacking :)`)
})
