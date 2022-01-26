/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
        ALTER TABLE users
        ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
        ALTER TABLE users
        DROP COLUMN created_at,
        DROP COLUMN updated_at;
    `);
};
