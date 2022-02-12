// eslint-disable-next-line import/prefer-default-export
export async function isAuthorized(req, res, next) {
  const token = req.body.token || req.params.token || req.headers['x-access-token']

  if (!token) return res.status(401).send({ error: 'Not authorized' })

  res.send({ msg: 'Usuario logado' })

  return next()
}
