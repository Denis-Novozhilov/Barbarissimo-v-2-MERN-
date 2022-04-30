const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/game', require('./routes/game.routes'));

app.use(express.json());

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoURL'), {});

        app.listen(PORT, () => console.log(`App_started_on_PORT: ${PORT}`))
    } catch (error) {
        console.log(`Server error: ${error.message}`);
        process.exit(1);
    }
}

start()
