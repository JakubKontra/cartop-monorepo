import { Client as Minio } from 'minio';
import { PresignedUrl, StorageAdapter } from './storage-adapter.interface';

export class MinioStorageAdapter implements StorageAdapter {
  constructor(private readonly client: Minio) {}

  async upload(
    bucket: string,
    key: string,
    filePath: string,
  ): Promise<PresignedUrl> {
    await this.client.fPutObject(bucket, key, filePath);
    return this.client.presignedGetObject(bucket, key, 60 * 60);
  }

  async getPresignedUploadUrl(
    bucket: string,
    key: string,
  ): Promise<PresignedUrl> {
    return this.client.presignedPutObject(bucket, key, 60 * 60);
  }

  async delete(bucket: string, key: string): Promise<void> {
    await this.client.removeObject(bucket, key);
  }
}
