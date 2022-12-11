import withValidate from '@middlewares/withValidateRequest';
import User from '@models/User';
import ch from '@util/createHandler';
import withAllowedMethods from '@middlewares/withAllowedMethods';
import withDatabase from '@middlewares/withDatabase';
import withErrorHandle from '@middlewares/withErrorHandle';
import withLog from '@middlewares/withLog';
import Joi from 'joi';
import { generateJWT } from '@util/jwt';
import logger from '@util/logger';

const login = ch(async (req, res) => {
  const { username, password, email } = req.body;

  const user = await User.findOne({
    $or: [
      {
        username,
      },
      { email },
    ],
    password,
  });

  if (!user) {
    return res.status(404).json({ ok: false, error: 'User not found' });
  }

  const [access, refresh] = generateJWT({
    data: {
      username: user.username,
      email: user.email,
      role: user.role,
    },
    expiresIn: ['2d', '8h'],
  });

  user.tokens.push({ access, refresh });

  await user.save();

  logger.info(`User ${user.username} logged in`);

  return res.status(201).json({
    ok: true,
    data: {
      access,
      refresh,
    },
  });
});

export default login.withMiddlewares(
  withErrorHandle(),
  withAllowedMethods('POST'),
  withLog(),
  withValidate(
    Joi.object({
      body: Joi.object({
        username: Joi.string(),
        password: Joi.string().required(),
        email: Joi.string().email(),
      }).xor('username', 'email'),
    })
  ),
  withDatabase()
);
