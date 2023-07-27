require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const mainRouter = require('./src/api/routes/index-routes');
const { configCloudinary } = require('./src/middlewares/uploadImg-middleware');
const cors = require('cors');

const server = express();
const PORT = Number(process.env.PORT);

connectDB();
configCloudinary();

server.use(express.json({ limit: '5mb' }));
server.use(express.urlencoded({ limit: '5mb', extended: false }));

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-type');
  next();
});

const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['Content-Length', 'Authorization', 'X-Powered-By'],
};

server.use(cors(corsOptions));


server.disable('x-powered-by');

server.use('/api', mainRouter);

server.use('*', (req, res, next) => {
  return res.status(404).json('Route not found 🙈');
});

server.listen(PORT, () => {
  console.log(`Server running in ${PORT} 🏃🏻‍♀️`);
});
