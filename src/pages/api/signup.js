import withAllowedMethods from '@middlewares/withAllowedMethods';
import withDatabase from '@middlewares/withDatabase';
import withErrorHandle from '@middlewares/withErrorHandle';
import withLog from '@middlewares/withLog';
import withValidate from '@middlewares/withValidateRequest';
import User from '@models/User';
import ch from '@util/createHandler';
import logger from '@util/logger';
import Joi from 'joi';
import mongoose from 'mongoose';

const signUp = ch(async (req, res) => {
  const { username, password, email } = req.body;

  const user = new User({ username, password, email });

  try {
    await user.save();
  } catch (err) {
    logger.debug(JSON.stringify(err));
    if (err.code === 11000)
      return res.status(409).json({
        ok: false,
        error: `User with this ${Object.keys(err.keyPattern)[0]} already exist`,
      });
    else throw err;
  }

  return res.status(201).json({
    ok: true,
    data: {
      username: user.username,
      email: user.email,
      status: user.status,
    },
  });
});

export default signUp.withMiddlewares(
  withErrorHandle(),
  withAllowedMethods('POST'),
  withLog(),
  withValidate(
    Joi.object({
      body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
      }),
    })
  ),
  withDatabase()
);
