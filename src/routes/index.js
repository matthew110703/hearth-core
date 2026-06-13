import authRoutes from './auth.routes.js'
import soulRoutes from './soul.routes.js'
import echoRoutes from './echo.routes.js'
import traitRoutes from './trait.routes.js'
import sparkRoutes from './spark.routes.js'

export async function registerRoutes(app) {
  app.get('/health', async () => ({ status: 'ok', ts: new Date().toISOString() }))

  await app.register(authRoutes,  { prefix: '/api/auth' })
  await app.register(soulRoutes,  { prefix: '/api/souls' })
  await app.register(echoRoutes,  { prefix: '/api/echoes' })
  await app.register(traitRoutes, { prefix: '/api/traits' })
  await app.register(sparkRoutes, { prefix: '/api/sparks' })
}
