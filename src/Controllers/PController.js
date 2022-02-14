import { PrismaClient } from '@prisma/client'
const { promisify } = require('util')
import fs from 'fs'
const unlink = promisify(fs.unlink)
var cloudinary = require('cloudinary')

const prisma = new PrismaClient()

import dotenv from 'dotenv'

dotenv.config()

var imagem = ''
var resultado = ''

async function register(req, res) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    cloudinary.uploader.upload(req.file.path, function (result, error) {
      imagem = result.secure_url
      resultado = result
      console.log(resultado)
    })

    await prisma.posts.create({
      data: {
        title: req.body.title,
        autor: req.body.autor,
        image: imagem,
        text: req.body.text,
        description: req.body.description,
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
    return res.status(400).send({ message: 'ERROR no controller getall!' })
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
    return res.status(400).json({ message: 'ERROR no controller getaById!' })
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
    return res.status(400).send({ message: 'ERROR no controller getNumber!' })
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

async function updatePosts(req, res) {
  try {
    const { id } = req.params

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    cloudinary.uploader.upload(req.file.path, function (result, error) {
      imagem = result.secure_url
      resultado = result
      console.log(resultado)
    })

    const user = await prisma.posts.update({
      where: { id: id },
      data: {
        title: req.body.title,
        autor: req.body.autor,
        image: imagem,
        text: req.body.text,
        description: req.body.description,
        likes: Number(req.body.likes),
        views: Number(req.body.views),
      },
    })
    console.log(user)

    return res.status(201).send({ msg: 'Post Editado successfuly!' })
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

export default { register, updateViews, updatePosts, updateLikes, getById, getAll, getNumber }
