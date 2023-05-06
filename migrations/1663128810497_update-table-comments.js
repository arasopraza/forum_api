/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql("ALTER TABLE comments DROP COLUMN deleted_at")
    pgm.sql("ALTER TABLE comments ADD COLUMN is_deleted boolean")
};

exports.down = pgm => {
};
