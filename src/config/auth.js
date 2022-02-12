// eslint-disable-next-line import/prefer-default-export
export async function isAuthorized(req, res, next) {
  const token = req.body.token || req.params.token || req.headers['x-access-token']

  if (!token) return res.status(401).send({ error: 'Not authorized' })

  // const { error, decode } = await verifyToken(token)

  res.send({ msg: 'Usuario logado' })

  if (error) return res.status(401).send({ error: 'Invalid token' })
  // req.body.currentUser = await getCurrentUser(decode.email)
  return next()
}
