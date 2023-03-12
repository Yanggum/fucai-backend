// app.js

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const helmet = require('helmet');
const { NotFoundError, errorHandler } = require('./utils/errorUtil');
const pool = require('./config/database');
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

const path = require('path');

// Routes
app.use('/api/v1', require('./router/userRouter'));
app.use('/api/v1', require('./router/characterRouter'));
app.use('/api/v1', require('./router/chatRouter'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling
// app.use((req, res, next) => {
//     const error = new NotFoundError('Resource not found');
//     next(error);
// });

app.use(errorHandler);

module.exports = app;
