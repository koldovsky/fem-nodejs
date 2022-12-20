import prisma from "../db";
import { comparePasswords, createToken, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password),
            },
        }); 
        const token = createToken(user);
        res.json({ token });
    } catch (e) {
        throw e; // for demo purposes
        e.type = 'input';
        next(e);
    }
}

export const signin = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        },
    });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const valid = await comparePasswords(req.body.password, user.password);
    if (!valid) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const token = createToken(user);
    res.json({ token });
}