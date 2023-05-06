class DetailComment {
	constructor(payload) {
		this._verifyPayload(payload);

		const {
			id, username, inserted_at, content, is_deleted,
		} = payload;

		this.id = id;
		this.username = username;
		this.date = inserted_at;

		if (is_deleted) {
			this.content = '**komentar telah dihapus**';
		} else {
			this.content = content;
		}
	}

	_verifyPayload({
		id, username, content, inserted_at,
	}) {
		if (!id || !username || !content || !inserted_at) {
			throw new Error('DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
		}

		if ([typeof id, typeof username, typeof content, typeof inserted_at]
			.some((type) => type !== 'string')) {
			throw new Error('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
		}
	}
}

module.exports = DetailComment;
