// app.js

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const helmet = require('helmet');
const { NotFoundError, errorHandler } = require('./utils/errorUtil');
const authRouter = require('./router/authRouter');
const characterRouter = require('./router/characterRouter');
const chatRouter = require('./router/chatRouter');
const userRouter = require('./router/userRouter');
const pool = require('./config/database');
const mybatis = require('./config/mapper');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const swaggerOptions = require('./config/swaggerOptions');
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());

// // Set up MyBatis
// mybatis.createMapper({
//     mapperLocations: [__dirname + '/mapper/*.xml'],
//     configLocation: __dirname + '/mybatis-config.xml',
//     pool: pool,
// });

// Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/characters', characterRouter);
app.use('/chats', chatRouter);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling
app.use((req, res, next) => {
    const error = new NotFoundError('Resource not found');
    next(error);
});

app.use(errorHandler);

module.exports = app;
