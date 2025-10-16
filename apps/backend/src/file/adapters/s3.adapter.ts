import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'node:fs';
import { PresignedUrl, StorageAdapter } from './storage-adapter.interface';

export class S3StorageAdapter implements StorageAdapter {
  private readonly client: S3Client;

  constructor(
    private readonly region: string,
    private readonly accessKeyId: string,
    private readonly secretAccessKey: string,
  ) {
    this.client = new S3Client({
      region: this.region,
      endpoint: `https://${this.region}.digitaloceanspaces.com`,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }

  async getPresignedUploadUrl(
    bucket: string,
    key: string,
    contentType = 'application/octet-stream',
    isPrivate = false,
  ): Promise<PresignedUrl> {
    const cmd = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
      ACL: isPrivate ? 'private' : 'public-read',
    });

    const url = await getSignedUrl(this.client, cmd, { expiresIn: 3600 });
    return url;
  }

  async upload(
    bucket: string,
    key: string,
    file: string,
    type = 'application/octet-stream',
    isPrivate = false,
  ): Promise<PresignedUrl> {
    const cmd = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: fs.readFileSync(file),
      ContentType: type,
      ACL: isPrivate ? 'private' : 'public-read',
    });
    await this.client.send(cmd);
    const url = await getSignedUrl(this.client, cmd, { expiresIn: 3600 });
    return url;
  }

  async delete(bucket: string, key: string) {
    await this.client.send(
      new DeleteObjectCommand({ Bucket: bucket, Key: key }),
    );
  }
}
