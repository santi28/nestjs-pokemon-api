export const AppConfig = () => ({
  enviroment: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
  mongodbDb: process.env.MONGODB_DB || 'pokemons',
  port: parseInt(process.env.PORT, 10) || 3000,
  defaultlimit: parseInt(process.env.DEFAULT_LIMIT, 10) || 2,
});
