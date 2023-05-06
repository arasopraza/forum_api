const Comment = require('../Comment');

describe('a Comment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
			content: 'comment test',
    };

    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      userId: 'user-123',
      content: true,
      threadId: ['threadId'],
    };

    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create thread object correctly', () => {
    // Arrange
    const payload = {
      userId: 'user-123',
			content: 'comment test',
      threadId: 'thread-123',
    };

    // Action
    const { userId, content, threadId } = new Comment(payload);

    // Assert
    expect(userId).toEqual(payload.userId);
    expect(content).toEqual(payload.content);
    expect(threadId).toEqual(payload.threadId);
  });
});
