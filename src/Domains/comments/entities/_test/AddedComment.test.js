const AddedComment = require('../AddedComment');

describe('an AddedComment entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        const payload = {
            content: 'comment test',
            owner: 'user-123',
        };

        expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        const payload = {
            id: 5432,
            content: true,
            owner: {},
        };

        expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create addedComment object correctly', () => {
        const payload = {
            id: 'comment-123',
            owner: 'user-123',
            content: 'comment test',
        };

        const addComment = new AddedComment(payload);

        expect(addComment.id).toEqual(payload.id);
        expect(addComment.content).toEqual(payload.content);
        expect(addComment.owner).toEqual(payload.owner);
    });
});
