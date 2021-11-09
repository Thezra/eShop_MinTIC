
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postRouter from './routes/posts.js';
import userRouter from "./routes/user.js";
import saleRouter from "./routes/sales.js";

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRouter);
app.use("/user", userRouter);
app.use('/sales', saleRouter);

const CONNECTION_URL = 'mongodb+srv://eventasmaster:eventasmaster123@cluster0.jbdn6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);