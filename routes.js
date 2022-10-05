const healthcheck = require('./api/healthcheck/healthcheck.routes')
const user = require('./api/users/users.routes')
const { isAuthenticated } = require('./auth/auth.service')

const authlocal = require('./auth/local/local.routes')
const favorites = require('./api/listFavorites/listFavorite.routes');
const items = require('./api/items/item.routes');

function routes(app){
  app.use('/api/healthcheck', healthcheck)
  app.use('/api/users', user)
  app.use('/api/favs', isAuthenticated, favorites) 
  app.use('/api/items', isAuthenticated, items) 


  // auth routes
  app.use('/api/auth/local', authlocal)
}

module.exports = routes
