import pool from "../database/db";
import BalanceRepo from "./balance.model";

class TransactionRepo {
  static async create(
    sender: string,
    receiver_acct_no: string,
    amount: number,
    description: string
  ) {
    const balance = await BalanceRepo.getBalanceByAcctNumber(sender);

    if (balance.amount < amount) {
      throw new Error("Insufficient funds");
    }

    try {
      await pool.query("BEGIN");

      await pool.query(
        `
        UPDATE balance SET amount = amount - $1 WHERE acct_number = $2 RETURNING *
      `,
        [amount, sender]
      );

      const { rows: rows2 }: any = await pool.query(
        `
        INSERT INTO transactions (sender_acct_no, receiver_acct_no, amount, description)
        VALUES($1, $2, $3, $4) RETURNING *
      `,
        [sender, receiver_acct_no, amount, description]
      );

      await pool.query(
        `
        UPDATE balance SET amount = amount + $1 WHERE acct_number = $2
      `,
        [amount, receiver_acct_no]
      );

      await pool.query("COMMIT");

      return rows2[0];
    } catch (e: any) {
      await pool.query("ROLLBACK");
    } finally {
      //   pool.close();
    }
  }

  static async getTransactionByAcctNumber(acct_number: string) {
    const { rows }: any = await pool.query(
      `
      SELECT * FROM transactions WHERE sender_acct_no = $1 OR receiver_acct_no = $1
    `,
      [acct_number]
    );

    return rows;
  }

  static async getDebitTransactions(acct_number: string) {
    const { rows }: any = await pool.query(
      `
      SELECT * FROM transactions WHERE sender_acct_no = $1
    `,
      [acct_number]
    );

    return rows;
  }

  static async getCreditTransactions(acct_number: string) {
    const { rows }: any = await pool.query(
      `
      SELECT * FROM transactions WHERE receiver_acct_no = $1
    `,
      [acct_number]
    );

    return rows;
  }
}

export default TransactionRepo;
