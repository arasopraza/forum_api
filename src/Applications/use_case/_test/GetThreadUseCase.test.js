const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const GetThreadUseCase = require('../GetThreadUseCase');
const DetailThread = require('../../../Domains/threads/entities/DetailThread');
const DetailComment = require('../../../Domains/comments/entities/DetailComment');

describe('GetThreadUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
	 it('should orchestrating the thread details action correctly', async () => {
		// Arange
		const useCasePayload = {
			threadId: 'thread-123',
		};

		const expectedDetail = new DetailThread({
			id: useCasePayload.threadId,
			title: 'title test',
			body: 'body test',
			date: '2022-9-9T22:42:14.859+07:00',
			username: 'dicoding',
			comments: [],
		});

		const expectedComments = [
			new DetailComment({
				id: 'comment-123',
				username: 'user B',
				inserted_at: '2022-9-10T22:42:14.859+07:00',
				content: 'comment A',
			  }),
			new DetailComment({
				id: 'comment-456',
				username: 'user B',
				inserted_at: '2022-9-10T22:42:14.859+07:00',
				content: 'comment B',
			}),
		]

		/** creating dependency of use case */
		const mockThreadRepository = new ThreadRepository();
		const mockCommentRepository = new CommentRepository();

		/** mocking needed function */
		mockThreadRepository.getDetailById = jest.fn(() => Promise.resolve(new DetailThread({
			id: useCasePayload.threadId,
			title: 'title test',
			body: 'body test',
			date: '2022-9-9T22:42:14.859+07:00',
			username: 'dicoding',
			comments: [],
		})));
		mockCommentRepository.getAllCommentByThreadId = jest
			.fn(() => Promise.resolve([
				new DetailComment({
					id: 'comment-123',
					username: 'user B',
					inserted_at: '2022-9-10T22:42:14.859+07:00',
					content: 'comment A',
				}),
				new DetailComment({
					id: 'comment-456',
					username: 'user B',
					inserted_at: '2022-9-10T22:42:14.859+07:00',
					content: 'comment B',
				})
		]));

		/** creating use case instance */
		const getDetailThreadUseCase = new GetThreadUseCase({
			threadRepository: mockThreadRepository,
			commentRepository: mockCommentRepository,
		});
	
		// Action
		const detailThreadResult = await getDetailThreadUseCase.execute(useCasePayload);

		// Assert
		expect(detailThreadResult).toEqual(new DetailThread({
			...expectedDetail, comments: expectedComments,
		}));
		expect(mockThreadRepository.getDetailById).toBeCalledWith(useCasePayload.threadId);
		expect(mockCommentRepository.getAllCommentByThreadId).toBeCalledWith(useCasePayload.threadId);
	});

	it('shoud return error cause not contrain needed property', async () => {
		const useCasePayload = {
			inValid: '',
		};

		const threadUseCase = new GetThreadUseCase({
			threadRepository: {},
			commentRepository: {},
		});

		await expect(threadUseCase.execute(useCasePayload)).rejects.toThrowError('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
	});

	it('shoud return error cause not meet data type spec', async () => {
		const useCasePayload = {
			threadId: true,
		};

		const threadUseCase = new GetThreadUseCase({
			threadRepository: {},
			commentRepository: {},
		});

		await expect(threadUseCase.execute(useCasePayload)).rejects.toThrowError('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
	});
});
