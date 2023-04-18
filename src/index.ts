import Fastify from 'fastify';
import cors from '@fastify/cors'
import pino from 'pino';
import loadConfig from './config'
import whatsappRouter from './routes/whatsapp.router';
loadConfig()

const port = +process.env.API_PORT || 5000;

const startServer = async () => {
  try {
    const server = Fastify({
      logger: pino({ level: 'info' }),
    })
    server.register(cors, {
      origin: "*",
      methods: ['GET', 'PUT', 'POST']
    });
    server.register(whatsappRouter, { prefix: '/api/whatsapp' })
    server.setErrorHandler((error, request, reply) => {
      server.log.error(error);
    })
    server.get('/', (request, reply) => {
      reply.send({ name: 'fastify-typescript' })
    })

    if (process.env.NODE_ENV === 'production') {
      for (const signal of ['SIGINT', 'SIGTERM']) {
        process.on(signal, () =>
          server.close().then((err) => {
            console.log(`close application on ${signal}`)
            process.exit(err ? 1 : 0)
          }),
        )
      }
    }
    server.listen({ port, host: '0.0.0.0' })
  } catch (e) {
    console.error(e)
  }
}

process.on('unhandledRejection', (e) => {
  console.error(e)
  process.exit(1)
})

startServer()
