import './config.app';
import express, { urlencoded, json, text } from 'express'
import connectionDB from './config/dbConnection';
import Routes from './routes/index';
import cors from 'cors'

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    })
);
app.use(text());
app.use(json({ limit: '1150mb' }));
app.use(urlencoded({ extended: false, limit: '1150mb' }));

const PORT = process.env.PORT

// app.get('/check', async(_req, res) => {
//     return 'Hello World';
// });
connectionDB();

app.get('/status', async(_req, res) => {
    let healthcheck: any;
    try {
        healthcheck = {
            uptime: process.uptime(),
            message: "OK",
            timestamp: Date.now(),
        };
        res.send(healthcheck);
    } catch (error) {
        healthcheck.message = error;
        res.status(503).send(healthcheck);
    }
});

app.use('/api', Routes);

app.listen(PORT, () => {
    console.log(`Server habitask runing ${PORT}`)
})
