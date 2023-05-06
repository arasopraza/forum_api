const DeleteComment = require('../../Domains/comments/entities/DeleteComment');

class DeleteCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
		this._threadRepository = threadRepository;
		this._commentRepository = commentRepository;
	}

	async execute(useCasePayload) {
		const deleteComment = new DeleteComment(useCasePayload);
		await this._commentRepository.validateThreadComment(
			deleteComment.threadId,
			deleteComment.commentId,
		);
		await this._commentRepository.validateCommentOwner(
			deleteComment.commentId,
			deleteComment.userId,
		);
		await this._commentRepository.deleteComment(
			deleteComment.commentId
		);
	}
}

module.exports = DeleteCommentUseCase;