import migrate from "node-pg-migrate";
console.log("about to run migration");

migrate({
  direction: "up",
  log: () => {},
  noLock: true,
  dir: "migrations",
  databaseUrl: {
    host: process.env.PG_HOST as string,
    port: 5432,
    database: process.env.PG_DB_NAME as string,
    user: process.env.PG_USER as string,
    password: process.env.PG_PASSWORD as string,
    ssl: { rejectUnauthorized: false },
  },
  migrationsTable: "pgmigrations",
})
  .then(() => {
    console.log("migration complete");
  })
  .catch((err) => {
    console.log("migration failed", err);
  });
