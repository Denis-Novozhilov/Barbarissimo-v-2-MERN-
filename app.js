const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require("cors");
// const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'))

app.use(express.json());

// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.append('Access-Control-Allow-Methods', 'POST', 'GET', 'OPTIONS');
//     res.append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
//     res.append('Access-Control-Allow-Credentials', 'true');
//     next();
// });

// app.use(bodyParser.json());

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoURL'), {});
        /*  useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true */

        app.listen(PORT, () => console.log(`App_started_on_PORT: ${PORT}`))
    } catch (error) {
        console.log(`Server error: ${error.message}`);
        process.exit(1);
    }
}

start()
