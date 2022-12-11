import mongoose, { Schema, model, models } from 'mongoose';

export const schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['member', 'moderator', 'admin'],
    default: 'member',
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'paused'],
    default: 'pending',
  },
  tokens: [{ access: { type: String }, refresh: { type: String } }],
});

/**
 * @type {import('@types').Model<schema>}
 */
export default models['users'] || model('users', schema);
