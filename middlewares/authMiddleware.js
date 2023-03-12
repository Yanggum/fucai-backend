const jwt = require('jsonwebtoken');
const env = require('../env');
const { UnauthorizedError } = require('../utils/errorUtil');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, env.JWT_SECRET);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        throw new UnauthorizedError('Authentication failed');
    }
};

module.exports = authMiddleware;
