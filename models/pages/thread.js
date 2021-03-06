'use strict';

const { buildThread } = require(__dirname+'/../../helpers/tasks.js');

module.exports = async (req, res, next) => {

	let html;
    try {
		html = await buildThread({
			threadId: res.locals.thread.postId,
			board: res.locals.board
		});
    } catch (err) {
        return next(err);
	}

	return res.send(html);

}
