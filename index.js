const express = require('express');
const router = require('./routes');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const fileupload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandingMiddleware');

const {PORT} = process.env || 3010;

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'uploads')));
app.use(fileupload({ createParentPath: true }));
app.use('/api', router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} !!! Happy Hacking :)`)
})
