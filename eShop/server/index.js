
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv';

import postRouter from './routes/posts.js';
import userRouter from "./routes/user.js";
import saleRouter from "./routes/sales.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRouter);
app.use("/user", userRouter);
app.use('/sales', saleRouter);

app.get('/', (req, res) => {
  res.send('Bienvenido a la eShop')
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} no se ha podido conectar`));

mongoose.set('useFindAndModify', false);