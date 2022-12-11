import fs from 'fs';
import path from 'path';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 * @returns
 */
export default function (req, res) {
  const filePath = path.resolve('./src/pages/api/file/anime-titles.xml.gz');
  const file = fs.readFileSync(filePath);

  return res.status(200).send(file);
}
