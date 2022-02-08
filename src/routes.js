import postController from './Controllers/PController'
import { Router } from 'express'

import uploadConfig from './config/uploadConfig'
import multer from 'multer'

/**
 * ### Description
 * This Controller function must be retrackt a produtc
 * This Controller function must be retrackt a produtc
 * This Controller function must be retrackt a produtc
 * @function postController.getAll This function must paginate the registeres
 * @since v1.0.0
 */

const upload = multer(uploadConfig)

const route = Router()

route.get('/', (req, res) => {
  res.status(200).send({ msg: 'Api Blog version: 1.0.0' })
})
route.get('/pegar', postController.getAll)
route.get('/id/:id', postController.getById)
route.put('/likes/:id', postController.updateLikes)
route.put('/views/:id', postController.updateViews)
route.get('/:number', postController.getNumber)
route.post('/register', upload.single('image'), postController.register)

export default route
