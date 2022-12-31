import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  ENVIROMENT: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  MONGODB_URI: Joi.required(),
  MONGODB_DB: Joi.string().default('pokemons'),
  PORT: Joi.number().default(3000),
  DEFAULT_LIMIT: Joi.number().default(2),
});
