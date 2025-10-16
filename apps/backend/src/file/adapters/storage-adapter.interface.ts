export type PresignedUrl = string;

export interface StorageAdapter {
  upload(
    bucket: string,
    objectKey: string,
    filePath: string,
    contentType?: string,
    isPrivate?: boolean,
  ): Promise<PresignedUrl>;

  getPresignedUploadUrl(
    bucket: string,
    key: string,
    contentType?: string,
    isPrivate?: boolean,
  ): Promise<PresignedUrl>;

  delete(bucket: string, objectKey: string): Promise<void>;
}
