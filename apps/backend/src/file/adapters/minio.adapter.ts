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
    // MinIO presignedPutObject doesn't support setting Content-Type in the presigned URL
    // The client must set Content-Type header when using the presigned URL
    // Note: contentType parameter is accepted for interface compatibility but not used
    return this.client.presignedPutObject(bucket, key, 60 * 60);
  }

  async delete(bucket: string, key: string): Promise<void> {
    await this.client.removeObject(bucket, key);
  }
}
