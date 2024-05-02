import express, { Request, Response } from 'express';
import tableStandingsRouter from "./api/routes/tableStandingsRouter";
import fixturesRouter from "./api/routes/fixturesRouter";
import bootstrapRouter from "./api/routes/bootstrapRouter";
import templateRouter from "./api/routes/templateRouter";
import { connectDB } from './database/db';
import gameRouter from "./api/routes/gameRouter";
import userRouter from "./api/routes/userRouter";
import gameBetRouter from "./api/routes/gameBetRouter";
require('dotenv').config();

const admin = require('firebase-admin');
const serviceAccount = require('../../../Secure/footy-b32b1-firebase-adminsdk-d4wsd-a136526a86.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const cors = require('cors');

connectDB();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use("/api", tableStandingsRouter);
app.use("/api", fixturesRouter);
app.use("/api", bootstrapRouter);
app.use("/api", templateRouter);
app.use("/api", gameRouter);
app.use("/api/users", userRouter);
app.use('/api', gameBetRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
