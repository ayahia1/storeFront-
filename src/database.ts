import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
const { ENV, PG_HOST, PG_USER, PG_PASSWORD, PG_DB_DEV, PG_DB_TEST } =
  process.env;
let client: Pool;
if (ENV == "dev") {
  client = new Pool({
    host: PG_HOST,
    database: PG_DB_DEV,
    user: PG_USER,
    password: PG_PASSWORD,
  });
} else if (ENV == "test") {
  client = new Pool({
    host: PG_HOST,
    database: PG_DB_TEST,
    user: PG_USER,
    password: PG_PASSWORD,
  });
} else {
  throw new Error(`Invalid ENV value`);
}
export default client;
