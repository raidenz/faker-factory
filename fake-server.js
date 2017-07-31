const jsonServer = require('json-server')
const jsend = require('jsend')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
server.use(jsend.middleware)

// Add custom routes before JSON Server router
server.get('/test', (req, res) => {
	res.jsend.success(
		req.query
	)
})


// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
	if (req.method === 'POST') {
		req.body.createdAt = Date.now()
	}
	console.log(req)
	next()
})

// Rewrite The URL
// Add this before server.use(router)
server.use(jsonServer.rewriter({
	'/api/*': '/$1',
	// '/blog/:resource': '/:resource?_embed=comment',
	'/blog/post': '/post?_page=1?limit=10', // list post by pagination
	'/blog/post/page/:num': '/post?_page=:num?limit=10', // list post by pagination
	'/blog/post/list': '/post', // list all post
	'/blog/post/id/:id': '/post/:id/?_embed=comment',
	'/blog/post/:slug': '/post/?slug=:slug&_embed=comment'
}))

// status send witht jsend format
router.render = (req, res) => {
	res.jsonp({
		status: 'success',
		data: {
			result: res.locals.data
		}
	})
}

// Use default router
server.use(router)
server.listen(3030, () => {
	console.log(`JSON Server is running on http://localhost:3030`)
})