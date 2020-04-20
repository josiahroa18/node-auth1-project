const express = require('express');
const userRouter = require('./api/userRouter');
const port = process.env.PORT || 5000;

const server = express();

server.use(express.json());
server.use('/api', userRouter);

server.listen(port, () => console.log(`Server listening on port ${port}`));