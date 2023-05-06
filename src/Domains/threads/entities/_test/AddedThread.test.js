const AddedThread = require('../AddedThread');

describe('an AddedThread entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        const payload = {
            title: 'title test',
            owner: 'user-123',
        };

        expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        const payload = {
            id: 5432,
            title: 'title test',
            owner: {},
        };

        expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create addedThread object correctly', () => {
        const payload = {
            id: 'thread-123',
            title: 'title test',
            owner: 'user-123',
        };

        const addThread = new AddedThread(payload);

        expect(addThread.id).toEqual(payload.id);
        expect(addThread.title).toEqual(payload.title);
        expect(addThread.owner).toEqual(payload.owner);
    });
});
