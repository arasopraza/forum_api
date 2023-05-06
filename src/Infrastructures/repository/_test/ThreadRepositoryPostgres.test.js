const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const Thread = require('../../../Domains/threads/entities/Thread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('ThreadRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({});
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  const fakeIdGenerator = () => '123';

  describe('addThread function', () => {
    it('should persist add thread and return added thread correctly', async () => {
      // Arrange
      const thread = new Thread({
        userId: 'user-123',
        title: 'title test',
        body: 'body test',
      });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await threadRepositoryPostgres.addThread(thread);

      // Assert
      const threads = await ThreadsTableTestHelper.findThreadsById('thread-123');
      expect(threads).toHaveLength(1);
    });

    it('should return added thread correctly', async () => {
      // Arrange
      const thread = new Thread({
        userId: 'user-123',
        title: 'title test',
        body: 'body test',
      });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(thread);

      // Assert
      expect(addedThread).toStrictEqual(new AddedThread({
        id: 'thread-123',
        title: 'title test',
        body: 'body test',
        owner: 'user-123',
      }));
    });
  });

  describe('validateId function', () => {
    const threadId = 'thread-123';

    it('should throw NotFoundError if not valid id', async () => {
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      await expect(threadRepository.validateId(threadId))
        .rejects.toThrow(NotFoundError);
    });

    it('should not throw NotFoundError if valid id', async () => {
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      await ThreadsTableTestHelper.addThread({});

      await expect(threadRepository.validateId(threadId))
        .resolves.not.toThrow(NotFoundError);
    });
  });

  describe('getDetailById function', () => {
    const threadId = 'thread-123';

    it('should throw NotFoundError if not valid id', async () => {
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      await expect(threadRepository.getDetailById(threadId))
        .rejects.toThrow(NotFoundError);
    });

    it('should return detailed thread correctly', async () => {
      const threadRepository = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      await ThreadsTableTestHelper.addThread({});
      const thread = await threadRepository.getDetailById(threadId);

      expect(thread).toStrictEqual({
        id: threadId,
        title: 'title test',
        body: 'body test',
        date: '2022-9-9T22:42:14.859+07:00',
        username: 'dicoding',
      });
    });
  });
});
