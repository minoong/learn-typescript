import passport from 'passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import passportJWT, { ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import User, { UserModel } from '../models/User';

dotenv.config();

interface LocalStrategyOption extends IStrategyOptions {
  usernameFiled: string;
  passwordFiled: string;
}

const options = <LocalStrategyOption>{
  usernameFiled: 'username',
  passwordFiled: 'password',
};

async function localVerify(username: string, password: string, done: Function) {
  try {
    console.log(username);

    const newUser = new User({
      username,
    });

    await newUser.setPassword(password);
    await newUser.save();

    const user = await User.findOne({ username });

    console.log(`user [${user}]`);

    if (!user) return done(null, false);

    // const isVerify = await user.checkPassword(password);
    const isVerify = true;

    if (!isVerify) return done(null, false);

    return done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
}

const jwtStrategyOption = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_KEY,
};

async function jwtVerify(payload: UserModel, done: Function) {
  try {
    console.log(payload);
    const user = await User.findOne({ username: payload.username });

    if (!user) return done(null, false);

    return done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
}

console.log('####################', process.env.JWT_KEY);

export default () => {
  passport.use(new Strategy(options, localVerify));
  passport.use(new passportJWT.Strategy(jwtStrategyOption, jwtVerify));
};
