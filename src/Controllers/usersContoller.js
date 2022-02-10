import { PrismaClient } from '@prisma/client'
import md5 from 'md5'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

async function registerUser(req, res) {
  try {
    await prisma.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password, process.env.SECRET),
        role: req.body.role,
      },
    })

    return res.status(201).send({ message: 'Usuario Created with success!' })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function getAllUsers(req, res) {
  try {
    const data = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })
    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ message: 'DEU ERRO!' })
  }
}

export async function generateToken(data) {
  const { email, password } = data
  return jwt.sign({ email, password }, process.env.SECRET, {
    expiresIn: '1d',
  })
}

async function login(req, res) {
  try {
    const { email, password } = req.body

    const user = await prisma.users.findFirst({
      where: {
        email: email,
        password: md5(password, process.env.SECRET),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    if (!user) {
      res.status(401).send({ msg: 'Usuario não enconotrado' })
    }
    const token = await generateToken(user)

    return res.status(200).send({ user, token })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

export default { registerUser, getAllUsers, login }
