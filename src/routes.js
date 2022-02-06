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

route.get('/', postController.getAll)
route.put('/update/:id', postController.update)
route.get('/:number', postController.getNumber)
route.post('/register', upload.single('image'), postController.register)

export default route
