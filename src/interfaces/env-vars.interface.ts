export interface IEnvVarsInterface {
  PORT: number;
  DATABASE_URL: string;
  // PRODUCTS_MICROSERVICES_HOST: string;
  // PRODUCTS_MICROSERVICES_PORT: number;
  // ORDERS_MICROSERVICES_HOST: string;
  // ORDERS_MICROSERVICES_PORT: number;

  NATS_SERVERS: string[];
}
