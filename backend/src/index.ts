import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cookiePaser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import passport from 'passport';
import passportConfig from './passport/index';
import mongoose from 'mongoose';
import { User } from './entity/User';
import authRouter from './routes/auth';

dotenv.config();

createConnection()
  .then(async (connection: Connection) => {
    // console.log('Inserting a new user into the database...');
    // const user = new User();
    // user.firstName = 'Timber';
    // user.lastName = 'Saw';
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log('Saved a new user with id: ' + user.id);

    console.log('Loading users from the database...');
    const users = await connection.manager.find(User);
    console.log('Loaded users: ', users);

    console.log('Here you can setup and run express/koa/any other framework.');
  })
  .catch((error) => console.log(error));

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI || '', {
    useNewUrlParser: true,
    useFindAndModify: false,
    dbName: 'api3',
  })
  .then(() => {
    console.log();
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

const app: express.Application = express();
app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser(process.env.COOKIE_KEY));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_KEY || 'LMW',
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);

app.use(passport.initialize());
passportConfig();
// session 사용시
// app.use(passport.session());

app.use('/auth', authRouter);

// jwt test
app.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('hello');

    res.status(200).json({
      code: 200,
      message: 'logined',
    });
  },
);

app.listen(app.get('port'), () => {
  console.log(`server is started [${app.get('port')}]`);
});
