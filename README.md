# Faker Factory
Read Documentation [on docs folder](https://github.com/raidenz/faker-factory/tree/master/docs)

Dummy Mockup Server Generator

This repo was inspired from [json schema faker](https://github.com/json-schema-faker/json-schema-faker), i use it before but iam an SQL minded, i need to set relationship between user and post or user and role, so i create a simple script that run in my way.

This Project Use [json server](https://github.com/typicode/json-server) and [faker.js](https://github.com/marak/Faker.js/)

Well ok, i know nothing special about this project, its basically just a _json file generator_ and use [json server](https://github.com/typicode/json-server) Engine. Just It. I hope it can safe someone out there to start creating dummy data.


## Getting Started
Run this program
```bash
$ npm install
$ npm run generate
$ npm start
```

### Editing dummy schema
you can specify and create your own dummy server on schema folder

### Add custom routes

Edit routes.json file. Pay attention to start every route with /.

```json
{
  "/api/": "/",
  "/sample/:resource": "/:resource",
  "/sample/:resource/:id": "/:resource/:id",
  "/blog/:resource": "/:resource?_embed=comment",
  "/blog/post/id/:id": "/post/:id/?_embed=comment",
  "/blog/post/:slug": "/post/?slug=:slug&_embed=comment"
}
```

it will create
```
/api/sample/{post, user, comment}
/api/sample/{post, user, comment}/id
/api/post/id/{number} #show post by id
/api/post/{slug} #show post by slug

```

read [this](https://github.com/typicode/json-server#add-custom-routes) for details

### Setting port
You can setting port and config from json-server.json
```json
{
  "port": 3001,
  "routes": "routes.json"
}
```
test mode