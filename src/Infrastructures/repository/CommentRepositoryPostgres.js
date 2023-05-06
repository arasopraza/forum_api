const AddedComment = require('../../Domains/comments/entities/AddedComment');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const DetailComment = require('../../Domains/comments/entities/DetailComment');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(comment) {
    const { userId, content, threadId } = comment;
    const id = `comment-${this._idGenerator()}`;
    const dateNow = new Date();

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $5) RETURNING id, content, owner',
      values: [id, threadId, content, userId, dateNow],
    };

    const result = await this._pool.query(query);

    return new AddedComment({ ...result.rows[0] });
  }

  async deleteComment(commentId) {
    await this._pool.query({
      text: 'UPDATE comments SET is_deleted = true WHERE id = $1 RETURNING id',
      values: [commentId],
    });
  }

  async validateThreadComment(threadId, commentId) {
    const result = await this._pool.query({
      text: 'SELECT id FROM comments WHERE id = $1 AND thread_id = $2',
      values: [commentId, threadId],
    });

    if (!result.rowCount) throw new NotFoundError('Komentar pada thread tidak ditemukan');
  }

  async validateCommentOwner(commentId, owner) {
    const result = await this._pool.query({
      text: 'SELECT id FROM comments WHERE id = $1 AND owner = $2',
      values: [commentId, owner],
    });

    if (!result.rowCount) throw new AuthorizationError('Tidak dapat menghapus komentar yang bukan milik Anda');
  }

  async getAllCommentByThreadId(threadId) {
    const query = {
      text: `SELECT comments.id, users.username, comments.inserted_at, comments.content,
              comments.is_deleted
            FROM comments 
            INNER JOIN users on comments.owner = users.id
            WHERE comments.thread_id = $1 
            ORDER BY comments.inserted_at ASC`,
      values: [threadId],
    };

    const result = await this._pool.query(query);
    return result.rows.map((comment) => new DetailComment(comment));
  }
}

module.exports = CommentRepositoryPostgres;
