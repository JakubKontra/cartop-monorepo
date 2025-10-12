import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client as Minio } from 'minio';
import { STORAGE_ADAPTER } from '@/shared/tokens';
import { File } from './file.entity';
import { FileService } from './file.service';
import { FileAdminResolver } from './file-admin.resolver';
import { FilePublicResolver } from './file-public.resolver';
import { MinioStorageAdapter } from './adapters/minio.adapter';
import { S3StorageAdapter } from './adapters/s3.adapter';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([File])],
})
export class FileModule {
  static forRoot(): DynamicModule {
    return {
      module: FileModule,
      imports: [ConfigModule, TypeOrmModule.forFeature([File])],
      providers: [
        FileService,
        FileAdminResolver,
        FilePublicResolver,
        {
          provide: STORAGE_ADAPTER,
          inject: [ConfigService],
          useFactory: (cfg: ConfigService) => {
            const driver = cfg.get<'s3' | 'minio' | 'digitalocean'>(
              'STORAGE_DRIVER',
              's3',
            );

            const validDrivers = ['s3', 'minio', 'digitalocean'];
            if (!validDrivers.includes(driver)) {
              throw new Error(`Unsupported storage driver: ${driver}`);
            }

            console.log('[FileModule] Storage configuration:', {
              driver: cfg.get('STORAGE_DRIVER'),
              endpoint: cfg.get('MINIO_ENDPOINT'),
              port: cfg.get('MINIO_PORT'),
              region: cfg.get('AWS_REGION'),
            });

            if (driver === 's3' || driver === 'digitalocean') {
              const region = cfg.get('AWS_REGION', 'eu-central-1');

              return new S3StorageAdapter(
                region,
                cfg.get('DO_SPACES_KEY') ?? '',
                cfg.get('DO_SPACES_SECRET') ?? '',
              );
            }

            return new MinioStorageAdapter(
              new Minio({
                endPoint: cfg.get('MINIO_ENDPOINT', 'localhost'),
                port: cfg.get<number>('MINIO_PORT', 1483),
                useSSL: false,
                accessKey: cfg.get('MINIO_ROOT_USER', 'pangea'),
                secretKey: cfg.get('MINIO_ROOT_PASSWORD', 'pangea1337'),
              }),
            );
          },
        },
      ],
      exports: [STORAGE_ADAPTER, FileService],
    };
  }
}
