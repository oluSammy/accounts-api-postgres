import pg from "pg";

class Pool {
  __pool: pg.Pool | null = null;

  connect(config: pg.ClientConfig) {
    this.__pool = new pg.Pool(config);

    return this.__pool.query("SELECT 1 + 1");
  }

  close() {
    return this.__pool?.end();
  }

  query(query: string, values?: any[]) {
    return this.__pool?.query(query, values);
  }
}

export default new Pool();
