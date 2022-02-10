import { PrismaClient } from '@prisma/client'
import md5 from 'md5'

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

export default { registerUser, getAllUsers }
