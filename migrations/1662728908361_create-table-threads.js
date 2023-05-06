/* eslint-disable camelcase */
exports.up = (pgm) => {
	pgm.createTable('threads', {
		id: {
			type: 'VARCHAR(50)',
			primaryKey: true,
		},
		title: {
			type: 'VARCHAR(50)',
			notNull: true,
		},
		body: {
			type: 'TEXT',
			notNull: true,
		},
    owner: {
			type: 'VARCHAR(50)',
			notNull: true,
    },
    inserted_at: {
			type: 'varchar(30)',
			notNull: true,
		},
		updated_at: {
			type: 'varchar(30)',
			notNull: true,
		},
		deleted_at: {
			type: 'varchar(30)',
			notNull: false,
		},
  });

  pgm.addConstraint('threads', 'fk_threads.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};
  
exports.down = (pgm) => {
  pgm.dropTable('threads');
};