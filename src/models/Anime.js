import { Schema, model, models } from 'mongoose';

const schema = new Schema({
  aid: { type: Number, unique: true, index: true },
  title: { type: [String], index: 'text' },
});

/**
 * @type {import('@types').Model<schema>}
 */
export default models['animes'] || model('animes', schema);
