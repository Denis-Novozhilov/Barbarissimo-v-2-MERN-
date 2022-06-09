const { Router } = require('express');
const router = Router();
// const User = require('../models/User');
const CommonPhrase = require('../models/CommonPhrase');

// api/game/allCommonPhrases
router.get('/allcommonphrases',
    async function (req, res) {
        const allCommonPhrases = await CommonPhrase.find();
        res.send({ message: 'hello from api/game', allCommonPhrases });
    });


// api/game/createPhraseTest
// router.get(
//     '/createPhraseTest',
//     [
//         check('email', 'Email is not correct').isEmail(),
//         check('password', 'Min password length - 6 symbols').isLength({ min: 6 })
//     ],


// api/game/createPhraseTest
router.get(
    '/createPhraseTest',
    async (req, res) => {
        try {

            // 1[] get phrase wariants from body
            // 2[] clear phrase from dots and commas
            // 3[] check phrases in DB
            // 4[] if ok - create new phrase

            // const { email, password } = req.body;

            // const newPhrase = {
            //     Russian: `Это интересно.`,
            //     Spanish: `Es entretenido.`,
            //     English: `It is entertaining.`,
            //     German: `Das ist interessant.`,
            //     Additional: `yep`
            // };

            const newPhrase = {
                russian: `Очередная третья фраза.`,
                spanish: `Otra tercera frase`,
                english: `Another third phrase`,
                german: `Noch ein dritter Satz aaa`,
                additional: `leam`
            };

            // const { nick, email, password } = req.body;

            const { russian, spanish, english, german } = newPhrase;
            // CHEKING
            const phraseCandidate_eng = await CommonPhrase.findOne({ english });
            const phraseCandidate_rus = await CommonPhrase.findOne({ russian });
            const phraseCandidate_spa = await CommonPhrase.findOne({ spanish });
            const phraseCandidate_ger = await CommonPhrase.findOne({ german });

            if (phraseCandidate_eng || phraseCandidate_rus || phraseCandidate_spa || phraseCandidate_ger) {
                return res.status(400).json({
                    status: `error`,
                    message: `Phrase already exist. Try another words.`,
                    phrase: {
                        phraseCandidateEN: phraseCandidate_eng,
                        phraseCandidateRU: phraseCandidate_rus,
                        phraseCandidateSP: phraseCandidate_spa,
                        phraseCandidateGR: phraseCandidate_ger
                    }
                })
            }



            // const candidate = await User.findOne({ email });
            // if (candidate) {
            //     return res.status(400).json({ status: `error`, message: `Sign In error. Try another email.` })
            // }

            // const hashedPassword = await bcrypt.hash(password, 7);

            const phrase = new CommonPhrase(newPhrase);

            console.log(`SAVING... ${phrase}`)

            await phrase.save();

            res.status(201).json({ status: `ok`, message: `New Phrase ${phrase.english} created.` });

        } catch (error) {
            res.status(500).json({ status: `error`, message: `[api/game/createPhraseTest] error: ${error.message}` })
        }
    });


// api/game/createCommonPhrase
router.post(
    '/createCommonPhrase',
    async (req, res) => {
        try {

            // 1[] get phrase wariants from body
            const { russian, spanish, english, german } = req.body;

            // 2[] clear phrase from dots and commas



            // const newPhrase = {
            //     Russian: `Это интересно.`,
            //     Spanish: `Es entretenido.`,
            //     English: `It is entertaining.`,
            //     German: `Das ist interessant.`,
            //     Additional: `yep`
            // };

            // const newPhrase = {
            //     russian: `Очередная третья фраза.`,
            //     spanish: `Otra tercera frase`,
            //     english: `Another third phrase`,
            //     german: `Noch ein dritter Satz aaa`,
            //     additional: `leam`
            // };

            // const { nick, email, password } = req.body;

            // const { russian, spanish, english, german } = newPhrase;
            // CHEKING
            // 3[] check phrases in DB
            const phraseCandidate_eng = await CommonPhrase.findOne({ english });
            const phraseCandidate_rus = await CommonPhrase.findOne({ russian });
            const phraseCandidate_spa = await CommonPhrase.findOne({ spanish });
            const phraseCandidate_ger = await CommonPhrase.findOne({ german });

            if (phraseCandidate_eng || phraseCandidate_rus || phraseCandidate_spa || phraseCandidate_ger) {
                return res.status(400).json({
                    status: `error`,
                    message: `Phrase already exist. Try another words.`,
                    phrase: {
                        phraseCandidateEN: phraseCandidate_eng,
                        phraseCandidateRU: phraseCandidate_rus,
                        phraseCandidateSP: phraseCandidate_spa,
                        phraseCandidateGR: phraseCandidate_ger
                    }
                })
            }

            
            // 4[] if ok - create new phrase
            const newPhrase = { english, german, russian, spanish };


            // const candidate = await User.findOne({ email });
            // if (candidate) {
            //     return res.status(400).json({ status: `error`, message: `Sign In error. Try another email.` })
            // }

            // const hashedPassword = await bcrypt.hash(password, 7);

            const phrase = new CommonPhrase(newPhrase);

            console.log(`SAVING... ${phrase}`)

            await phrase.save();

            res.status(201).json({ status: `ok`, message: `New Phrase ${phrase.english} created.` });

        } catch (error) {
            res.status(500).json({ status: `error`, message: `[api/game/createPhraseTest] error: ${error.message}` })
        }
    });

// // api/auth/register
// router.post(
//     '/register',
//     [
//         check('email', 'Email is not correct').isEmail(),
//         check('password', 'Min password length - 6 symbols').isLength({ min: 6 })
//     ],
//     async (req, res) => {
//         try {

//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({
//                     errors: errors.array(),
//                     message: `Authentication error.`
//                 })
//             }

//             const { email, password } = req.body;

//             const candidate = await User.findOne({ email });

//             if (candidate) {
//                 return res.status(400).json({ status: `error`, message: `Sign In error. Try another email.` })
//             }

//             const hashedPassword = await bcrypt.hash(password, 7);

//             const user = new User({ email, password: hashedPassword, role: 'user' });

//             console.log(`SAVING... ${user}`)

//             await user.save();

//             res.status(201).json({ status: `ok`, message: `User ${email} created.` });

//         } catch (error) {
//             res.status(500).json({ status: `error`, message: `Server error: ${error.message}` })
//         }
//     });

/*
// api/admin/test
router.get('/test',
    async function (req, res) {

        let changedItems = { rus: "ABBA_abba_ABBA", changed: true };

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
*/
module.exports = router;