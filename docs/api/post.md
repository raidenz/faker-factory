### Post
```js
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
```
