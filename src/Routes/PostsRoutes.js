// import postController from './Controllers/PController'
import postController from '../Controllers/PController'
import { Router } from 'express'

import uploadConfig from '../config/uploadConfig'

import multer from 'multer'
import { isAuthorized } from '../config/auth'

const upload = multer(uploadConfig)

const route = Router()

const postarRoutes = [
  route.get('/', (req, res) => {
    res.status(200).send({ msg: 'Api Blog version: 1.0.0' })
  }),
  route.get('/pegar', postController.getAll),
  route.get('/id/:id', postController.getById),
  route.put('/likes/:id', postController.updateLikes),
  route.put('/views/:id', postController.updateViews),
  route.get('/:number', postController.getNumber),
  route.post('/register/:token', isAuthorized, upload.single('image'), postController.register),
]

export default postarRoutes
