import { randomBytes } from "crypto";
import format from "pg-format";
import migrate from "node-pg-migrate";
import Pool from "../database/db";

const DEFAULT_OPTS = {
  host: "localhost",
  port: 5432,
  database: "transaction-test",
  user: "samuelolumorin",
  password: "",
};

class Context {
  roleName: string;
  static async build() {
    // generate random rolename to connect to pg
    const roleName = "user" + randomBytes(4).toString("hex");

    // connect to pg
    await Pool.connect(DEFAULT_OPTS);

    // create new role
    await Pool.query(
      format("CREATE ROLE %I WITH LOGIN PASSWORD %L;", roleName, roleName)
    );

    // create a schema with the same name
    await Pool.query(
      format("CREATE SCHEMA %I AUTHORIZATION %I;", roleName, roleName)
    );

    // disconnect entirely from pg
    await Pool.close();

    // run migration in schema
    await migrate({
      schema: roleName,
      direction: "up",
      log: () => {},
      noLock: true,
      dir: "migrations",
      databaseUrl: {
        host: "localhost",
        port: 5432,
        database: "transaction-test",
        user: roleName,
        password: roleName,
      },
      migrationsTable: "pgmigrations",
    });

    // connect to pg as a newly created role
    await Pool.connect({
      host: "localhost",
      port: 5432,
      database: "transaction-test",
      user: roleName,
      password: roleName,
    });

    return new Context(roleName);
  }

  constructor(roleName: string) {
    this.roleName = roleName;
  }

  async close() {
    // disconnect from pg
    await Pool.close();

    // reconnect as root user
    await Pool.connect(DEFAULT_OPTS);

    // delete the role and user created
    await Pool.query(format("DROP SCHEMA %I CASCADE;", this.roleName));
    await Pool.query(format("DROP ROLE %I;", this.roleName));

    await Pool.close();
  }

  async reset() {
    return Pool.query(`
        DELETE FROM users
      `);
  }
}

export default Context;
