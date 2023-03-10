const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const secretKey = 'your-secret-key'; // JWT 시크릿 키

// 비밀번호 암호화
async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

// 비밀번호 비교
async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

// JWT 생성
function generateToken(payload) {
    const options = { expiresIn: '1d' };
    return jwt.sign(payload, secretKey, options);
}

// JWT 검증
function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null;
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
};
