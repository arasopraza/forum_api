const DetailComment = require('../DetailComment');

describe('a DetailComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      userId: 'user-123',
      isDeleted: true,
    };

    expect(() => new DetailComment(payload)).toThrowError('DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
        id: [''],
        username: ['dicoding'],
        content: 'comment test',
        inserted_at: '2022-9-9T22:42:14.859+07:00',
    };

    expect(() => new DetailComment(payload)).toThrowError('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create detailComment object correctly', () => {
    const payload = {
        id: 'comment-123',
        username: 'dicoding',
        inserted_at: '2022-9-9T22:42:14.859+07:00',
        content: 'comment test',
        is_deleted: true,
    };

    const { id, username, content, date } = new DetailComment(payload);

    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(content).toEqual('**komentar telah dihapus**');
    expect(date).toEqual(payload.inserted_at);
  });
});
