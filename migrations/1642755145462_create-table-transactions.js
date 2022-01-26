/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
        CREATE TABLE transactions (
            ref SERIAL PRIMARY KEY,
            sender_acct_no VARCHAR(255) NOT NULL,
            receiver_acct_no VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            amount INTEGER NOT NULL
        )
    `);
};

exports.down = (pgm) => {
  pgm.sql("DROP TABLE transactions");
};
