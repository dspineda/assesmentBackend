const healthcheck = require('./api/healthcheck/index')
const user = require('./api/users/users.routes')
const favorites = require('./api/favorites/favorites.routes')

function routes(app){
  app.use('/api/healthcheck', healthcheck)
  app.use('/api/users', user)
  app.use('/api/favorites', favorites)  
}

module.exports = routes
