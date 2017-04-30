### Comment
```js
exports.fakeComment = (x, id) => {
  // prevent duplicate
  let name = faker.internet.userName();
  return {
    id: id + 1,
    body: faker.lorem.sentence(20),
    postId: faker.helpers.randomize(Array.from({length: 20}, (v, k) => k+1)),
  }
}
```
