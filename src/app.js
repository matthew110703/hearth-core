import Fastify from 'fastify'
import { connectDB } from './config/db.js'
import { registerPlugins } from './config/plugins.js'
import { registerRoutes } from './routes/index.js'
import { env } from './config/env.js'

const app = Fastify({
  logger: {
    level: env.LOG_LEVEL,
    ...(env.NODE_ENV === 'development' && {
      transport: { target: 'pino-pretty' }
    })
  }
})

await connectDB()
await registerPlugins(app)
await registerRoutes(app)

try {
  await app.listen({ port: env.PORT, host: '0.0.0.0' })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
