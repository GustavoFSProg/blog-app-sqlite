// import postController from './Controllers/PController'
import userController from '../Controllers/usersContoller'
import { Router } from 'express'

const route = Router()

const userRoutes = [
  route.get('/user/post', userController.getAllUsers),
  route.post('/user-register', userController.registerUser),
  route.post('/login', userController.login),
]

export default userRoutes
