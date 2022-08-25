const healthcheck = require('./api/healthcheck/index')
const user = require('./api/users/users.routes')
const favorites = require('./api/favorites/favorites.routes')
const authlocal = require('./auth/local/local.routes')

function routes(app){
  app.use('/api/healthcheck', healthcheck)
  app.use('/api/users', user)
  app.use('/api/favorites', favorites)  

  // auth routes
  app.use('/api/auth/local', authlocal)
}

module.exports = routes
