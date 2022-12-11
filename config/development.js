module.exports = {
  mongo: {
    url: 'mongodb+srv://cluster0.iihdrzs.mongodb.net/Anime?retryWrites=true&w=majority',
    connectionOptions: {
      user: 'anime_fetcher',
      pass: 'bzztkz',
    },
  },
  jwt: {
    accessSecret: 'development_secret',
    refreshSecret: 'development_secret',
  },
};
