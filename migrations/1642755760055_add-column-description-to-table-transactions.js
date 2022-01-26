/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
        ALTER TABLE transactions
        ADD COLUMN description VARCHAR(255) NOT NULL
    `);
};

exports.down = (pgm) => {
  pgm.sql("ALTER TABLE transactions DROP COLUMN description");
};
