import pool from "../database/db";

class BalanceRepo {
  static async insert(user_id: number) {
    const acctNum = await this.getLastAcct();

    const { rows }: any = await pool.query(
      "INSERT INTO balance (user_id, acct_number) VALUES ($1, $2) RETURNING *",
      [user_id, acctNum]
    );

    return rows[0];
  }

  static async getLastAcct() {
    const { rows }: any = await pool.query(
      "SELECT * FROM balance ORDER BY id DESC LIMIT 1"
    );

    if (rows.length === 0) {
      return "0000000001";
    }

    const newAcct = (parseInt(rows[0].acct_number) + 1).toString();

    return newAcct.padStart(10, "0");
  }

  static async getBalanceByAcctNumber(acctNumber: string) {
    const { rows }: any = await pool.query(
      `SELECT users.id, amount, acct_number, last_name, first_name, d_o_b, email, phone_number
      FROM BALANCE
      JOIN users ON users.id = balance.user_id
      WHERE acct_number = $1`,
      [acctNumber]
    );

    return rows[0];
  }

  static async getBalanceByUserId(userId: number) {
    const { rows }: any = await pool.query(
      `SELECT users.id, amount, acct_number, last_name, first_name, d_o_b, email, phone_number
        FROM BALANCE
        JOIN users ON users.id = balance.user_id
        WHERE balance.user_id = $1`,
      [userId]
    );

    return rows[0];
  }

  static async getAllBalances() {
    const { rows }: any = await pool.query(
      `SELECT users.id, amount, acct_number, last_name, first_name, d_o_b, email, phone_number
       FROM balance
       JOIN
        users ON balance.user_id = users.id`
    );

    return rows;
  }
}

export default BalanceRepo;
