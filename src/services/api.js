const mode = process.env.NODE_ENV

export default {
  development: {
    login: '/users/login',
    order: '/order'
  }
}[mode]
