const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // const token = req.header('auth-token');
    const token = req.cookies.authtoken
    if (!token) return res.status(401).send('Access Denied, you need to login first.');

    try {
        const verified = jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
};