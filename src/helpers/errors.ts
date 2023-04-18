import { FastifyReply } from "fastify"
import { ERROR500 } from "./constants"

export const ERRORS = {
  invalidToken: 'Token is invalid.',
  userExists: 'User already exists',
  userNotExists: 'User not exists',
  userCredError: 'Invalid credential',
  tokenError: 'Invalid Token',
}

export function handleServerError(reply: FastifyReply, error: any) {
  return reply.status(ERROR500.statusCode).send(ERROR500);
}