/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
        ALTER TABLE balance ADD COLUMN acct_number VARCHAR(255) NOT NULL
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
        ALTER TABLE balance DROP COLUMN acct_number;
    `);
};
