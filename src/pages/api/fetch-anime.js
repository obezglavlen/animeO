import { ungzip } from 'node-gzip';
import xml2js from 'xml2js';
import Anime from '../../models/Anime';
import logger from '../../util/logger';
import ch from '../../util/createHandler';
import withLog from '../../middlewares/withLog';
import withDatabase from '../../middlewares/withDatabase';
import withErrorHandle from '../../middlewares/withErrorHandle';
import withAllowedMethods from '../../middlewares/withAllowedMethods';
import withProtect from '@middlewares/withProtect';
import mongoose, { mongo } from 'mongoose';

const handler = ch(async (req, res) => {
  const { method } = req;
    logger.debug('Start fetching archive...');

    const gzippedArchive = await fetch('http://0.0.0.0:3000/api/file').then(
      (data) => data.arrayBuffer()
    );

    logger.debug('Achive fetched successfully!');
    logger.debug('Starting unarchiving...');

    const xml = await ungzip(gzippedArchive);

    logger.debug('Unarchiving completed!');
    logger.debug('Starting parsing XML...');

    const unzippedJson = await xml2js.parseStringPromise(xml.toString());

    logger.debug('Parsing completed!');

    let duplicates = 0;
    let added = 0;

    logger.debug('Starting adding to Database...');

    await Promise.all(
      unzippedJson.animetitles.anime.slice(0, 2).map((anime) => {
        const aid = anime.$.aid;
        const titles = anime.title.map(({ _ }) => _);

        const doc = new Anime({
          aid,
          title: titles,
        });

        logger.debug(`Start adding document, aid: ${aid}`);

        return doc
          .save()
          .then(() => {
            logger.debug(`Document aid ${aid} added succesfully!`);
            added++;
          })
          .catch((err) => {
            if (err instanceof mongo.MongoServerError && err.code === 11000) duplicates++;
            else throw err;
          });
      })
    );

    logger.debug('Successfully added documents!');

    return res.status(200).json({
      ok: true,
      data: {
        added,
        duplicates,
      },
    });
});

export default handler.withMiddlewares(
  withErrorHandle(),
  withAllowedMethods('POST'),
  withDatabase(),
  withProtect(),
  withLog(),
);
