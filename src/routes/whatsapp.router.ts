import { FastifyInstance } from 'fastify'
import { createGetSchema, postSchema } from '../schema'
import * as controllers from '../controllers'

async function whatsappRouter(fastify: FastifyInstance) {
  fastify.decorateRequest('authUser', '')

  fastify.route({
    method: 'GET',
    url: '/webhook',
    schema: createGetSchema,
    handler: controllers.getTicketList,
  })

  fastify.route({
    method: 'POST',
    url: '/webhook',
    schema: postSchema,
    handler: controllers.getTickets,
  })

//   fastify.route({
//     method: 'POST',
//     url: '/edit',
//     schema: postSchema,
//     handler: controllers.updateClient,
//   })

}

export default whatsappRouter
