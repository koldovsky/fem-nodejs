import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
}

export const hashPassword = (password: string) => bcrypt.hash(password, 5);


export const createToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username },
        process.env.JWT_SECRET, { expiresIn: '1h' });
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    const [, token] = bearer.split(' ');
    if (!token) {
        return res.status(401).json({ message: 'Not valid token' });
    }


    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'No access' });
    }
}