const { Router } = require('express');
const router = Router();
const User = require('../models/User');

// api/auth/test
router.get('/test',
    async function (req, res) {
        const allUsers = await User.find();
        res.send({ message: 'hello from test', allUsers });
    });

module.exports = router;