const express = require('express');
const cors = require('cors');
const app = express();

// CORS 설정
app.use(cors());

// JSON 파싱 설정
app.use(express.json());

// 라우팅 설정
const userRoutes = require('../router/userRouter');
const chatRoutes = require('../router/chatRouter');
const characterRoutes = require('../router/characterRouter');
app.use('/api/users', userRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/chats', chatRoutes);

// 에러 핸들링 미들웨어
const errorUtil = require('../utils/errorUtil');
app.use(errorUtil.errorHandler);

module.exports = app;
