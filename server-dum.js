const jsonServer = require('json-server')
// const jsend = require('jsend')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
// server.use(jsend)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp({
  	status: "success",
  	data: req.query
  })
  // res.jsonp(req.query)
  // jsend.success({ foo: 'bar' })
})


// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // if (req.method === 'GET') {
  // }

  // console.log(res.locals.data)
  // Continue to JSON Server router
  next()
})

// MIDDLEWARE (Outside)
// module.exports = (req, res, next) => {
// server.use ((req, res, next) => {
//   res.header('X-Hello', 'World')
//   next()
// })

// Add this before server.use(router)
server.use(jsonServer.rewriter({
  	'/api/*': '/$1',
  	// '/blog/:resource/:id/show': '/:resource/:id',
  	'/blog/:resource': '/:resource?_embed=comment',
	'/blog/post/id/:id': '/post/:id/?_embed=comment',
	'/blog/post/:slug': '/post/?slug=:slug&_embed=comment'
}))

router.render = (req, res) => {
  res.jsonp({
  	status: 'success',
    data: res.locals.data
  })
}

// Use default router
server.use(router)
server.listen(3030, () => {
  console.log(`JSON Server is running on http://localhost:3030`)
})