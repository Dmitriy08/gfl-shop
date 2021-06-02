const express = require('express');
const router = require('./routes/index');
const bodyParser = require('body-parser')
const cors = require('cors');
const fileupload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandingMiddleware');

const {PORT} = process.env || 3010;

const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(fileupload({}));
app.use('/api', router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} !!! Happy Hacking :)`)
})
