import knex from "knex";
import "dotenv/config";

const connection = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "12345678",
    database: "todo_list",
    multipleStatements: true,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./src/sql/migrations",
  },
});

export default connection;
