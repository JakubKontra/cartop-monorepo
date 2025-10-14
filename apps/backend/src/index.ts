import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

let fastifyApp: import('fastify').FastifyInstance | null = null;

async function bootstrap() {
  const adapter = new FastifyAdapter({ logger: false });
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);
  await app.init(); // don't call listen() on Vercel
  return app.getHttpAdapter().getInstance(); // Fastify instance
}

export default async function handler(req: any, res: any) {
  if (!fastifyApp) {
    fastifyApp = await bootstrap();
    await fastifyApp.ready();
  }
  // hand off the raw Node req/res to Fastify
  fastifyApp.server.emit('request', req, res);
}
