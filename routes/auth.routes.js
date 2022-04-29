const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

// api/auth/register
router.post(
    '/register',
    [
        check('email', 'Email is not correct').isEmail(),
        check('password', 'Min password length - 6 symbols').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: `Authentication error.`
                })
            }

            const { email, password } = req.body;

            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ status: `error`, message: `Sign In error. Try another email.` })
            }

            const hashedPassword = await bcrypt.hash(password, 7);

            const user = new User({ email, password: hashedPassword });

            console.log(`SAVING... ${user}`)

            await user.save();

            res.status(201).json({ status: `ok`, message: `User ${email} created.` });

        } catch (error) {
            res.status(500).json({ status: `error`, message: `Server error: ${error.message}` })
        }
    });

//api/auth/login
router.post(
    '/login',
    [
        check('email', 'Email is not correct').normalizeEmail().isEmail(),
        check('password', 'Min password length - 6 symbols').exists()
    ],
    async (req, res) => {

        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: `Wrong authentication data.`
                })
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: `User ${email} is not found.` })
            }

            const isPassMatch = await bcrypt.compare(password, user.password);

            if (!isPassMatch) {
                return res.status(400).json({ message: `Wrong authentication data.` })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '24h' }
            );

            res.json({ token, userId: user.id, userName: email.split('@')[0] })

        } catch (error) {
            res.status(500).json({ message: `Server error: ${error.message}` })
        }
    });

//api/auth/ping
router.post(
    '/ping',
    async (req, res) => {

        try {
            const checkedToken = jwt.verify(req.body.token, config.get('jwtSecret'));

            const tokenRestTime = ({ iat, exp }) => {
                const age = Math.round(Date.now() / 1000 - iat);
                return exp - iat - age;
            };

            res.status(200).json({ tokenStatus: `ok`, restSeconds: tokenRestTime(checkedToken) })
        } catch (error) {
            res.status(500).json({ tokenStatus: `error`, message: error.message })
        }
    });

module.exports = router;