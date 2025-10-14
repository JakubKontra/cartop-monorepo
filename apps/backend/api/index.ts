import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '../src/app.module';

let fastifyInstance: import('fastify').FastifyInstance;

async function bootstrap() {
  const adapter = new FastifyAdapter({ logger: false });
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);
  await app.init();
  return app.getHttpAdapter().getInstance();
}

export default async function handler(req: any, res: any) {
  if (!fastifyInstance) {
    fastifyInstance = await bootstrap();
    await fastifyInstance.ready();
  }
  fastifyInstance.server.emit('request', req, res);
}
