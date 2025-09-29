const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const token = req.cookies?.uid || req.headers['authorization']?.split('Bearer ')[1];

    if (!token) {
        return res.status(401).redirect('/login'); // Or res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Now available as req.user.id, req.user.role, etc.
        next();
    } catch (err) {
        return res.status(401).send('Invalid or expired token');
    }
};

const restrictedTo = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).send('Access Denied: Insufficient permissions');
        }
        next();
    };
};

module.exports = { authMiddleware , restrictedTo };