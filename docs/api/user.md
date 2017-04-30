### User
```js
exports.fakeUser = (x, id) => {
  let name = faker.internet.userName();
  return {
    id: id + 1,
    name: name,
    email: name.toLowerCase()+'@example.com', // email base on name
    role: faker.helpers.randomize(Array.from({length: 5}, (v, k) => k+1)), // example randomize role
  }
}
```
