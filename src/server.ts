import express from "express";
import morgan from "morgan";

import router from "./router";

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200);
    res.json({message: 'Hello'});
});

app.use('/api', router);

export default app;