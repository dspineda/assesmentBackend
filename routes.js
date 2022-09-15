const healthcheck = require('./api/healthcheck/healthcheck.routes')
const user = require('./api/users/users.routes')

const authlocal = require('./auth/local/local.routes')
const favorites = require('./api/listFavorites/listFavorite.routes');

function routes(app){
  app.use('/api/healthcheck', healthcheck)
  app.use('/api/users', user)
  app.use('/api/favs', favorites)  


  // auth routes
  app.use('/api/auth/local', authlocal)
}

module.exports = routes
