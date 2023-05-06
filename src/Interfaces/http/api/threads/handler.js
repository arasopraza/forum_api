const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const GetThreadUseCase = require('../../../../Applications/use_case/GetThreadUseCase');

class ThreadsHandler {
	constructor(container) {
		this._container = container;

		this.postThreadHandler = this.postThreadHandler.bind(this);
		this.getDetailThreadHandler = this.getDetailThreadHandler.bind(this);
	}

	async postThreadHandler(request, h) {
		const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
		const addedThread = await addThreadUseCase.execute({
			...request.payload,
			userId: request.auth.credentials.id,
		});

		const response = h.response({
			status: 'success',
			data: {
				addedThread,
			},
		});
		response.code(201);
		return response;
	}

	async getDetailThreadHandler(request, h) {
		const detailThreadUseCase = this._container.getInstance(GetThreadUseCase.name);
		const thread = await detailThreadUseCase.execute(request.params);

		const response = h.response({
			status: 'success',
			data: {
				thread,
			},
		});

		return response;	
	}
}

module.exports = ThreadsHandler;