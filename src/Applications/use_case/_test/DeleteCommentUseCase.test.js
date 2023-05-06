const DeleteComment = require('../../../Domains/comments/entities/DeleteComment');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
	/**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
	it('should orchestrating the add comment action correctly', async () => {
		// Arange
		const useCasePayload = {
			userId: 'user-123',
			threadId: 'thread-123',
			commentId: 'comment-123',
		};

		//** creating dependency of use case */
		const mockThreadRepository = new ThreadRepository();
		const mockCommentRepository = new CommentRepository();

		//** mocking needed function */
		mockCommentRepository.validateThreadComment= jest.fn(() => Promise.resolve());
		mockCommentRepository.validateCommentOwner = jest.fn(() => Promise.resolve());
		mockCommentRepository.deleteComment = jest.fn(() => Promise.resolve());

		//** creating use case instance */
		const getCommentUseCase = new DeleteCommentUseCase({
			threadRepository: mockThreadRepository,
			commentRepository: mockCommentRepository,
		});

		// Action
		const deletedComment = await getCommentUseCase.execute(useCasePayload);

		// Assert
		expect(mockCommentRepository.validateThreadComment)
			.toBeCalledWith(useCasePayload.threadId, useCasePayload.commentId);
		expect(mockCommentRepository.validateCommentOwner)
			.toBeCalledWith(useCasePayload.commentId, useCasePayload.userId);
		expect(mockCommentRepository.deleteComment)
			.toBeCalledWith(useCasePayload.commentId);
	})
})
