'use strict';

const { remove } = require('fs-extra')
	, uploadDirectory = require(__dirname+'/uploadDirectory.js')

module.exports = (files) => {

	//delete all the files and thumbs
	return Promise.all(files.map(async file => {
		return Promise.all([
			remove(`${uploadDirectory}/img/${file.filename}`),
			remove(`${uploadDirectory}/img/thumb-${file.hash}.jpg`)
		]).catch(e => console.error)
	}));

}
