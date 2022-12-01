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

app.get('/', (req, res) => {
    res.status(200);
    res.json({message: 'Hello'});
});

app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signin);

export default app;