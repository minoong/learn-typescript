import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user)
      return res.status(200).json({
        code: 400,
        message: '사용자 정보가 없습니다.',
      });

    console.log(user);

    req.login(user, { session: false }, (error) => {
      if (error) next(error);

      const token = jwt.sign(
        {
          username: user.username,
        },
        process.env.JWT_KEY || '',
        { expiresIn: '5m' },
      );

      return res.json({ token });
    });
  })(req, res);
});

export default router;
