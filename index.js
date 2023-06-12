const express = require('express');
const { connectDB } = require('./src/config/db');
require('dotenv').config();
const mainRouter = require('./src/api/routes/index-routes');

const server = express();
const PORT = Number(process.env.PORT);

connectDB();

server.use(express.json({ limit: '5mb' }));
server.use(express.urlencoded({ limit: '5mb', extended: false }));

// server.use((req, res, next) => {
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
//   res.header('Access-Control-Allow-Headers', 'Content-type');
//   next();
// });

server.disable('x-powered-by');

server.use('/api', mainRouter);

server.use('*', (req, res, next) => {
  return res.status(404).json('Route not found 🙈');
});

// server.use((error, req, res, next) => {
//   return res.status(500).json('Internal Server Error', error);
// });

server.listen(PORT, () => {
  console.log(`Server running in ${PORT} 🏃🏻‍♀️`);
});
