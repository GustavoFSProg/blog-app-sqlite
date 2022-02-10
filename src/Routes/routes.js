import postarRoutes from './PostsRoutes'
import cumRoutes from './CommentsRoutes'
import userRoutes from './UsersRoutes'

const routes = [...postarRoutes, ...cumRoutes, ...userRoutes]

export default routes
