class Comment {
    constructor(payload) {
      this._verifyPayload(payload);
  
      const { userId, content, threadId } = payload;
  
      this.userId = userId;
      this.content = content;
      this.threadId = threadId;
    }
  
    _verifyPayload({ content, threadId }) {
      if ( !threadId || !content) {
        throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
      }
  
      if (typeof threadId !== 'string' ||  typeof content !== 'string') {
        throw new Error('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
    }
  }
    
  module.exports = Comment;
    