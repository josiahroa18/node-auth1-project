const express = require('express');
const session = require('express-session');

const userRouter = require('./api/users/userRouter');
const authRouter = require('./api/auth/authRouter');
const authenticator = require('./api/authenticator');

const port = process.env.PORT || 5000;

const server = express();

const sessionConfig = {
    name: 'auth',
    secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
    resave: false,
    saveUninitialized: process.env.SEND_COOKIES || true,
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: process.env.USE_SECURE_COOKIES || false, // Set to true in deployment
        httpOnly: true
    }
}

server.use(express.json());
server.use(session(sessionConfig));
server.use('/api/auth', authRouter);
server.use('/api/users', authenticator, userRouter);

server.listen(port, () => console.log(`Server listening on port ${port}`));