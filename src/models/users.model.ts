import pool from "../database/db";
import BalanceRepo from "./balance.model";

class UsersRepo {
  static async insert(
    firstName: string,
    lastName: string,
    dob: string,
    email: string,
    phoneNumber: string
  ) {
    const { rows }: any = await pool.query(
      `
        INSERT INTO users (first_name, last_name, d_o_b, email, phone_number)
        VALUES ($1, $2, $3, $4, $5) RETURNING *
      `,
      [firstName, lastName, dob, email, phoneNumber]
    );

    const balance = await BalanceRepo.insert(rows[0].id);

    // console.log(balance, "***");

    return { user: rows[0], balance: balance };
  }

  static async getAll() {
    const { rows }: any = await pool.query(
      `
        SELECT * FROM users
        JOIN balance ON users.id = balance.user_id
      `
    );

    return rows;
  }

  static async findById(id: number) {
    console.log(id);

    const { rows }: any = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    return rows[0];
  }

  static async findByIdAndUpdate(
    id: number,
    { first_name, last_name, d_o_b, email, phoneNumber }: Record<string, string>
  ) {
    const prev = await this.findById(id);

    if (!prev) {
      throw new Error("User not found");
    }

    const firstName = first_name || prev.first_name;
    const lastName = last_name || prev.last_name;
    const dob = d_o_b || prev.d_o_b;
    const mail = email || prev.email;
    const phone = phoneNumber || prev.phone_number;
    const createdAt = prev.created_at;
    const updatedAt = new Date().toISOString();

    const { rows }: any = await pool.query(
      `UPDATE users
       SET
        first_name = $1, last_name = $2, d_o_b = $3, email = $4, phone_number = $5, created_at = $6, updated_at = $7
       WHERE
        id = $8 RETURNING *`,
      [firstName, lastName, dob, mail, phone, createdAt, updatedAt, id]
    );

    return rows[0];
  }

  static async delete(id: number) {
    const { rows }: any = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id]
    );

    return rows[0];
  }
}

export default UsersRepo;
