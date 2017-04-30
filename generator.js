const { populate, saveDb } = require('./helper');
const {
	fakeUser,
	fakePost,
	fakeComment
} = require('./schema');

let user = populate(2000, fakeUser);
let post = populate(2000, fakePost);
let comment = populate(2000, fakeComment);

Promise.all([user, post, comment]).then(([user , post, comment]) => {
	saveDb({user, post, comment});
});
