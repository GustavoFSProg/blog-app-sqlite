import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function registerComent(req, res) {
  try {
    await prisma.coments.create({
      data: {
        post_id: req.params.id,
        comments: req.body.comments,
        user_name: req.body.user_name,
      },
    })

    return res.status(201).send({ message: 'Comentário Created with success!' })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function getAllComents(req, res) {
  try {
    const data = await prisma.coments.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ message: 'DEU ERRO!' })
  }
}

export default { registerComent, getAllComents }
