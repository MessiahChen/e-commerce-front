const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  userName: state => state.user.userName,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  addRoutes: state => state.permission.addRoutes,
  routers: state => state.permission.routes
}
export default getters
