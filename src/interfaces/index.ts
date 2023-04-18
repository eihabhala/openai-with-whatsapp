
import { FastifyRequest } from 'fastify';
// import { Prisma, User } from '@prisma/client';
import { MySQLConnection, MySQLPool, MySQLPromiseConnection, MySQLPromisePool } from '@fastify/mysql'

export interface IUserRequest extends FastifyRequest {
    body: any,
    authUser: any
}

export interface IUserAuthToken {
    id: number;
    email: string;
}

export interface IGetPresign {
    fileName: string;
}

export interface IPutPresign {
    userId: number;
    fileName: string;
}