docute.init({
  homes: 'README.md',
  telo: 'README.md',
  // landing: 'README.md',
	nav: [
    // homepage
    {title: 'Home', path: '/'},
    {title: 'Api Endpoint', type: 'dropdown', items: [
      {type: 'label', title: 'Dummy data'},
      {title: 'user', path: '/api/user'},
      {title: 'post', path: '/api/post'},
      {title: 'comment', path: '/api/comment'},
      {type: 'sep'},
      {type: 'label', title: 'Help'},
      {title: 'Clone Me', path: 'https://github.com/raidenz/faker-factory'},
      {title: 'Json-server doc', path: '/api/json-server'},
    ]}
  ],
  icons: [{
    icon: 'github',
    label: 'Contribute on GitHub',
    link: 'https://github.com/raidenz/faker-factory'
  }]
})
