const DetailThread = require('../DetailThread');

describe('a DetailThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {};

    expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when detail comment is not an array', () => {
    const payload = {
      id: 'thread-123',
      title: 'title test',
      body: 'body test',
      date: '2022-9-9T22:42:14.859+07:00',
      username: 'dicoding',
      comments: true,
    };

    expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create detail thread object correctly', () => {
    const payload = {
      id: 'thread-123',
      title: 'title test',
      body: 'body test',
      date: '2022-9-9T22:42:14.859+07:00',
      username: 'dicoding',
      comments: ['test', 'test'],
    };

    const {
      id,
      title,
      body,
      date,
      username,
      comments,
    } = new DetailThread(payload);

    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(date).toEqual(payload.date);
    expect(username).toEqual(payload.username);
    expect(comments).toEqual(payload.comments);
  });
});
