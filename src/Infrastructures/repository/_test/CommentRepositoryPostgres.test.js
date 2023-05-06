const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const Comment = require('../../../Domains/comments/entities/Comment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const DetailComment = require('../../../Domains/comments/entities/DetailComment');

describe('CommentRepositoryPostgres', () => {
	beforeEach(async () => {
		await UsersTableTestHelper.addUser({});
		await ThreadsTableTestHelper.addThread({});
	})

  afterEach(async () => {
		await CommentsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });
  
  const fakeIdGenerator = () => '123';

  describe('addComment function', () => {
    it('should persist add comment and return added comment correctly', async () => {
      // Arrange
      const comment = new Comment({
				userId: 'user-123',
				content: 'comment test',
				threadId: 'thread-123',
      });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await commentRepositoryPostgres.addComment(comment);

      // Assert
      const comments = await CommentsTableTestHelper.findCommentById('comment-123');
      expect(comments).toBeDefined();
    });

    it('should return added comment correctly', async () => {
      // Arrange
      const comment = new Comment({
				userId: 'user-123',
				content: 'comment test',
				threadId: 'thread-123',
      });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedComment = await commentRepositoryPostgres.addComment(comment);

      // Assert
      expect(addedComment).toStrictEqual(new AddedComment({
        id: 'comment-123',
				content: comment.content,
        owner: comment.userId,
      }));
    });
  });

  describe('deleteComment function', () => {
    it('should persist delete comment and return deleted comment correctly', async () => {
      const commentId = 'comment-123';

      await CommentsTableTestHelper.addComment({commentId: commentId, isDeleted: true});

      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      await commentRepository.deleteComment(commentId);
      const comment = await CommentsTableTestHelper.findCommentById(commentId);

      expect(comment.is_deleted).toBe(true);
    });
  });

  describe('verifyThreadComment function', () => {
    it('should throw NotFoundError when thread comment not found', async () => {
      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      const threadId = 'thread-123';
      const commentId = 'comment-123';

      await expect(commentRepository.validateThreadComment(threadId, commentId))
        .rejects.toThrow(NotFoundError);
    });

    it('should not throw NotFoundError when thread comment exists', async () => {
      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      const threadId = 'thread-123';
      const commentId = 'comment-123';

      await CommentsTableTestHelper.addComment({});

      await expect(commentRepository.validateThreadComment(threadId, commentId))
        .resolves.not.toThrow(NotFoundError);
    });
  });

  describe('validateCommentOwner function', () => {
    it('should throw AuthorizationError when not the owner of comment', async () => {
      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      const commentId = 'comment-123';
      const owner = 'user-234';

      await CommentsTableTestHelper.addComment({});

      await expect(commentRepository.validateCommentOwner(commentId, owner))
        .rejects.toThrow(AuthorizationError);
    });

    it('should not throw AuthorizationError when owned the comment', async () => {
      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      const commentId = 'comment-123';
      const owner = 'user-123';

      await CommentsTableTestHelper.addComment({});

      await expect(commentRepository.validateCommentOwner(commentId, owner))
        .resolves.not.toThrow(AuthorizationError);
    });
  });

  describe('getAllCommentByThreadId function', () => {
    const threadId = 'thread-123';

    it('should return empty array when comment not exists on the thread', async () => {
      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      const comments = await commentRepository.getAllCommentByThreadId(threadId);

      expect(comments).toStrictEqual([]);
    });

    it('should return array of comments correctly', async () => {
      await CommentsTableTestHelper.addComment({});

      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      
      const comments = await commentRepository.getAllCommentByThreadId(threadId);

      expect(comments).toHaveLength(1);
      expect(comments[0]).toStrictEqual(new DetailComment(
        {
          id: 'comment-123',
          username: 'dicoding',
          content: 'comment test',
          inserted_at: '2022-9-9T22:42:14.859+07:00',
          is_deleted: false,
        },
      ));
    });
  });
});
