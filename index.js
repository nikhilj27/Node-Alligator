require('./config/config');
require('./models/db');
require('./config/passport.config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const routerIndex = require('./routes/index.router');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', routerIndex);

// Error Handler middleware
app.use((err, req, res, next) => {
    if (err.name === 'ValidaionError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => err.errors[key].message);
        res.status(422).send(valErrors);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT: ${process.env.PORT}`);
});

