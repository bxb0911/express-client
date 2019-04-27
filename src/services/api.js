const mode = process.env.NODE_ENV

export default {
  development: {
    login: '/users/login',
    logout: '/users/logout',
    order: '/order'
  }
}[mode]
