const { Router } = require('express');
const router = Router();
const User = require('../models/User');

// api/admin/allusers
router.get('/allusers',
    async function (req, res) {
        const allUsers = await User.find();
        res.send({ message: 'hello from test', allUsers });
    });

// api/admin/test
router.get('/test',
    async function (req, res) {

        let changedItems = { English: "ABBA_abba_ABBA", Russian: "АББА_абба_АББА", changed: true };

        let userObj = await User.findOne({ email: "denmatuha001@gmail.com" });

        let newUserObj = JSON.parse(JSON.stringify(userObj));

        let phraseToUpdate = newUserObj.userPhrases.filter(el => el.id === 'x_10')[0];

        updatedPhrase = { ...phraseToUpdate, ...changedItems };

        newUserObj.userPhrases = newUserObj.userPhrases.map(objPh => objPh.id === 'x_10' ? updatedPhrase : objPh);

        await User.findOneAndUpdate(
            { email: "denmatuha001@gmail.com" },
            newUserObj
        );

        const allUsers = await User.find();

        res.send({ message: 'hello from test', allUsers });
    });

// api/admin/test-create-user-phrase
router.post(
    '/test-create-user-phrase',
    async (req, res) => {
        try {

            let userObj = await User.findOne({ email: `${req.body.mail}` });
            
            userObj.userPhrases.push(req.body.phrase)

            await userObj.save();

            res.send({ message: `Phrase created — \'${req.body.phrase.English}\'`});

        } catch (error) {
            res.status(500).json({ status: `error`, message: `Server [test-create-user-phrase] error: ${error.message}` })
        }
    });

module.exports = router;