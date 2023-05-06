class GetThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  _verifyThreadDetailPayload({ threadId }) {
    if (!threadId) throw new Error('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');

    if (typeof threadId !== 'string') throw new Error('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  }
  
  async execute(useCasePayload) {
    this._verifyThreadDetailPayload(useCasePayload);

    const threadDetail = await this._threadRepository.getDetailById(useCasePayload.threadId);
    threadDetail.comments = await this._commentRepository.getAllCommentByThreadId(useCasePayload.threadId);
  
    return threadDetail;
  }
}

module.exports = GetThreadUseCase;