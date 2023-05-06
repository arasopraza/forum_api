class CommentRepository {
	async addComment(newComment) {
		throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
	}

	async deleteComment(commentId) {
		throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
	}

	async validateThreadComment(threadId, commentId) {
		throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
	}

	async validateCommentOwner(commentId, owner) {
		throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
	}

	async getAllCommentByThreadId(threadId) {
		throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
	}
}
  
module.exports = CommentRepository;