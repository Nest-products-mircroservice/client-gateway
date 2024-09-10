import 'dotenv/config';
import * as joi from 'joi';
import { IEnvVarsInterface } from 'src/interfaces/env-vars.interface';

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    PRODUCTS_MICROSERVICES_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICES_PORT: joi.number().required(),
    ORDERS_MICROSERVICES_HOST: joi.string().required(),
    ORDERS_MICROSERVICES_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: IEnvVarsInterface = value;

export const envs = {
  port: envsVars.PORT,
  databaseUrl: envsVars.DATABASE_URL,
  productsMicroservicesHost: envsVars.PRODUCTS_MICROSERVICES_HOST,
  productsMicroservicesPort: envsVars.PRODUCTS_MICROSERVICES_PORT,
  ordersMicroservicesHost: envsVars.ORDERS_MICROSERVICES_HOST,
  ordersMicroservicesPort: envsVars.ORDERS_MICROSERVICES_PORT
};
