import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import { swaggerDocs } from './swagger.js';

import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT||8080;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(cookieParser());


app.use('/', viewsRouter);
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(' Conectado a MongoDB');
  app.listen(PORT, () => console.log(`🚀 Servidor escuchando en el puerto ${PORT}`));
})
.catch((error) => {
  console.error(' Error al conectar a MongoDB:', error);
});

swaggerDocs(app);

export default app;