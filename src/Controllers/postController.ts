import { Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'
const { promisify } = require('util')
import fs from 'fs'
const unlink = promisify(fs.unlink)

const prisma = new PrismaClient()

/**
 * ### Description
 * This Controller function must be retrackt a produtc
 * This Controller function must be retrackt a produtc
 * This Controller function must be retrackt a produtc
 * @fucntion getAll This function must paginate the registeres
 */

async function register(req: Request, res: Response) {
  try {
    const { filename: image }: any = req.file

    const [name] = image.split('.')
    const filename = `${name}.jpg`

    await prisma.posts.create({
      data: {
        title: req.body.title,
        autor: req.body.autor,
        image: filename,
        text: req.body.text,
        likes: Number(req.body.likes),
        views: Number(req.body.views),
      },
    })

    return res.status(201).send({ message: 'Product Created with success!' })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const number = 2

    // const { number } = req.params

    const data = await prisma.posts.findMany({
      // take: Number(number),
      // skip: 1,

      orderBy: {
        createdAt: 'desc',
      },
    })
    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ message: 'DEU ERRO!' })
  }
}

async function getNumber(req: Request, res: Response) {
  try {
    // const { number } = req.params
    const number = 2

    const data = await prisma.posts.findMany({
      take: Number(number),
      // skip: 1,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return res.status(200).send({ data })
  } catch (error) {
    return res.status(400).send({ message: 'DEU ERRO!' })
  }
}

export default { register, getAll, getNumber }
