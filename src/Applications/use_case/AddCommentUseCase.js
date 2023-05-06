const Comment = require('../../Domains/comments/entities/Comment');

class AddCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const comment = new Comment(useCasePayload);
    await this._threadRepository.validateId(comment.threadId);
    return this._commentRepository.addComment(comment);
  }
}

module.exports = AddCommentUseCase;
