export default ({ store, route, redirect }) => {
  const isAuthorized = store.getters.isAuthorized
  
  if (route.path === '/login' && isAuthorized) {
    redirect('/')
  }

  route.meta.map(({ authRequired }) => {
    if (!isAuthorized && authRequired) {
      redirect('/login?redirect=' + route.path)
    }
  })
}
