import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
import { env } from './env.js'

export async function registerPlugins(app) {
  await app.register(fastifyHelmet)

  await app.register(fastifyCors, {
    origin: env.NODE_ENV === 'production' ? false : true,
    credentials: true
  })

  await app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
    errorResponseBuilder: () => ({
      statusCode: 429,
      error: 'Too Many Requests',
      message: 'Slow down — you are sending too many requests.'
    })
  })

  await app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: { expiresIn: env.JWT_EXPIRES_IN }
  })

  // Auth decorator — call app.authenticate(request, reply) on protected routes
  app.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized', message: 'Invalid or expired token.' })
    }
  })
}
