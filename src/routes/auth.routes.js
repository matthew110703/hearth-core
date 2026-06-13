// Auth routes — register + login
// Handlers in src/controllers/auth.controller.js
export default async function authRoutes(app) {
  // POST /api/auth/register
  app.post('/register', { schema: { tags: ['auth'] } }, async (request, reply) => {
    reply.code(501).send({ message: 'Not implemented yet' })
  })

  // POST /api/auth/login
  app.post('/login', { schema: { tags: ['auth'] } }, async (request, reply) => {
    reply.code(501).send({ message: 'Not implemented yet' })
  })

  // POST /api/auth/refresh
  app.post('/refresh', { schema: { tags: ['auth'] } }, async (request, reply) => {
    reply.code(501).send({ message: 'Not implemented yet' })
  })
}
