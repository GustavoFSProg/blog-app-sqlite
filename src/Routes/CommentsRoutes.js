// import postController from './Controllers/PController'
import comentController from '../Controllers/CommentsController'
import { Router } from 'express'

const route = Router()

const cumRoutes = [
  route.get('/coment/post', comentController.getAllComents),
  route.post('/comments-register/:id', comentController.registerComent),
]

export default cumRoutes
