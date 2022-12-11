import config from 'config';
import logger from './logger';
import jwt from 'jsonwebtoken';

function getSecrets() {
  const { accessSecret, refreshSecret } = config.get('jwt');

  if (!accessSecret || !refreshSecret) {
    throw new Error('Access and refresh secrets are missing');
  }

  return {
    accessSecret,
    refreshSecret,
  };
}

/**
 * Generates JWT tokens for request
 * @param {{
 *          data: any,
 *          expiresIn?: [string | number, string | number]
 *        }} [options]
 * @returns {[string, string]}
 */
export function generateJWT(options) {
  const { data, expiresIn } = options;

  const { accessSecret, refreshSecret } = getSecrets();

  const accessToken = jwt.sign(data, accessSecret, {
    expiresIn: expiresIn[0],
  });
  const refreshToken = jwt.sign(data, accessSecret, {
    expiresIn: expiresIn[1],
  });

  return [accessToken, refreshToken];
}

/**
 * @param {string} token
 * @returns {number} Returns 1 if all ok, 0 if error, -1 if token expired
 */
export function verifyAccess(token) {
  const { accessSecret } = getSecrets();

  try {
    jwt.verify(token, accessSecret);
    return 1;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) return -1;
    return 0;
  }
}

/**
 * @param {string} token
 */
export function verifyRefresh(token) {}
