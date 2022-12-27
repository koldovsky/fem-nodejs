import express from "express";
import morgan from "morgan";
import cors from "cors";

import router from "./router";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/users";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// const customLogger = (message) => (req, res, next) => {
//     console.log(message);
//     next();
// };


// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

// app.get('/', (req, res, next) => {
//     setTimeout(() => {
//         next(new Error('Sample error'));
//     }, 0);
// });

app.get('/', (req, res) => {
    res.status(200);
    res.json({message: 'Hello'});
});

app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signin);

app.use((err, req, res, next) => {
    if (err.type === 'input') {
        res.status(400);
        res.json({message: 'Bad input'});
        return;
    }
    console.error(err);
    res.status(500);
    res.json({message: 'Internal server error'});
});

process.on('uncaughtException', (err) => {
    console.error('uncaughtException', err);
});

process.on('unhandledRejection', (err) => {
    console.error('unhandledRejection', err);
});


export default app;