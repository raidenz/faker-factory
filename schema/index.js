/**
 * Note:
 * Im note Sure what im doing
 * If you found any Error Or IDEA
 * Please Share and let Me Know
 */

var faker = require('faker');
var exports = module.exports = {};

/**
 * NOTE:
 * just use:
 * module.exports = () => {}
 * to send default export.
 * you can exports different
 * object here without creating new file.
 */
exports.fakeUser = (x, id) => {
	/**
	 * Prevent Duplication data
	 */
	let name = faker.internet.userName();
	return {
		id: id + 1,
		name: name,
		email: name.toLowerCase()+'@example.com', // email base on name
		role: faker.helpers.randomize(Array.from({length: 5}, (v, k) => k+1)), // example randomize role
	}
}

exports.fakePost = (x, id) => {
	let title = faker.lorem.words();
	return {
		id: id + 1,
		title: title,
		slug: faker.helpers.slugify(title),
		body: faker.lorem.sentence(20),
		user: faker.helpers.randomize(Array.from({length: 20}, (v, k) => k+1) ), // example randomize User
	}
}

exports.fakeComment = (x, id) => {
	// prevent duplicate
	let name = faker.internet.userName();
	return {
		id: id + 1,
		body: faker.lorem.sentence(20),
		postId: faker.helpers.randomize(Array.from({length: 20}, (v, k) => k+1)),
	}
}