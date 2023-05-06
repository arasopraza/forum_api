/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');
const UsersTableTestHelper = require('./UsersTableTestHelper');
const CommentsTableTestHelper = require('./CommentsTableTestHelper');

const ThreadsTableTestHelper = {
  async addThread({
    id = 'thread-123',
    title = 'title test', 
    body = 'body test',
    owner = 'user-123',
    insertedAt = '2022-9-9T22:42:14.859+07:00',
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5, $5)',
      values: [id, title, body, owner, insertedAt],
    };

    await pool.query(query);
  },

  async findThreadsById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM threads WHERE 1=1');
  },

  async addThreadComments() {
    await UsersTableTestHelper.addUser({});
    await UsersTableTestHelper.addUser({
      id: 'user-234',
      username: 'comentator',
      fullname: 'A Commentator',
    });

    await ThreadsTableTestHelper.addThread({});

    await CommentsTableTestHelper.addComment({
      owner: 'user-234',
      deletedAt: '2022-9-9T22:45:14.859+07:00',
    });

    await CommentsTableTestHelper.addComment({
      id: 'comment-234',
      owner: 'user-234',
      insertedAt: '2022-9-9T22:42:14.859+07:00',
    });
  },
};

module.exports = ThreadsTableTestHelper;
