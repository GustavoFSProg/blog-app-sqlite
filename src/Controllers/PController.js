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

async function register(req, res) {
  try {
    const { filename: image } = req.file

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

async function getAll(req, res) {
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

async function getById(req, res) {
  try {
    const { id } = req.params

    const data = await prisma.posts.findFirst({
      where: { id: id },
    })

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function getNumber(req, res) {
  try {
    const { number } = req.params

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

async function updateLikes(req, res) {
  try {
    const { id } = req.params

    const data = await prisma.posts.findFirst({
      where: { id: id },
    })

    const user = await prisma.posts.update({
      where: { id: id },
      data: {
        likes: data.likes + 1,
      },
    })
    console.log(data.likes)

    return res.status(201).send({ msg: 'user created successfuly!' })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROS!!', error })
  }
}

async function updateViews(req, res) {
  try {
    const { id } = req.params

    const data = await prisma.posts.findFirst({
      where: { id: id },
    })

    const user = await prisma.posts.update({
      where: { id: id },
      data: {
        views: data.views + 1,
      },
    })
    console.log(data.views)

    return res.status(201).send({ msg: 'user created successfuly!' })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROS!!', error })
  }
}

export default { register, updateViews, updateLikes, getById, getAll, getNumber }
