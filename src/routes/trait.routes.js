export default async function traitRoutes(app) {
  app.addHook('onRequest', app.authenticate)

  app.get('/',        async (req, reply) => reply.code(501).send({ message: 'Not implemented yet' }))
  app.post('/',       async (req, reply) => reply.code(501).send({ message: 'Not implemented yet' }))
  app.delete('/:id',  async (req, reply) => reply.code(501).send({ message: 'Not implemented yet' }))
}
