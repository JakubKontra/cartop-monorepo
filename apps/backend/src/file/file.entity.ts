import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Auditable } from '../common/decorators/auditable.decorator';
import { User } from '../model/user/user.entity';

/**
 * File Entity
 * Universal file storage for images, documents, and other assets
 * Image-specific fields (width, height, alt) are nullable for non-image files
 */
@ObjectType()
@Entity('files')
@Index(['mimeType', 'createdAt'])
@Auditable()
export class File {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  legacySystemId?: string;

  // === Path and Name ===

  @Field()
  @Column({ type: 'varchar', length: 500 })
  relativePath: string; // "uploads/2024/03/logo.png"

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string; // "logo.png"

  @Field()
  @Column({ type: 'varchar', length: 50 })
  @Index()
  extension: string; // "png"

  // === File Metadata ===

  @Field(() => Int)
  @Column({ type: 'integer' })
  size: number; // bytes

  @Field()
  @Column({ type: 'varchar', length: 100 })
  @Index()
  mimeType: string; // "image/png"

  @Field()
  @Column({ type: 'varchar', length: 64 })
  @Index()
  checksum: string; // SHA256 hash for duplicate detection

  // === Image-specific fields (nullable for non-images) ===

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  width?: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  height?: number;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  alt?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  title?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 500, nullable: true })
  thumbnailPath?: string; // "uploads/2024/03/logo_thumb.png"

  // === Audit ===

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'uploadedById' })
  uploadedBy?: User;

  @Column({ type: 'uuid', nullable: true })
  uploadedById?: string;

  // === Computed fields (GraphQL only) ===

  @Field()
  get url(): string {
    // Returns full URL (can be configured with CDN prefix)
    const cdnUrl = process.env.CDN_URL || '';
    return `${cdnUrl}/${this.relativePath}`;
  }

  @Field({ nullable: true })
  get thumbnailUrl(): string | null {
    if (!this.thumbnailPath) return null;
    const cdnUrl = process.env.CDN_URL || '';
    return `${cdnUrl}/${this.thumbnailPath}`;
  }

  @Field()
  get isImage(): boolean {
    return this.mimeType.startsWith('image/');
  }

  @Field(() => String)
  get sizeFormatted(): string {
    const bytes = this.size;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
}
