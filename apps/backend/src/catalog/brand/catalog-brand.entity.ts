import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { Watch } from '../../common/decorators/watch/watch.decorator';

@ObjectType()
@Entity('catalog_brands')
@Auditable()

@Watch({
  name: 'cache_catalog_brand_watch',
  watch: [
    'name',
    'slug',
    'isActive',
    'isHighlighted',
    'isRecommended',
    'description',
  ],
  webhook: process.env.CACHE_INVALIDATION_URL,
  selection: ['id', 'slug'],
  headers: {
    Authorization: `Bearer ${process.env.CACHE_INVALIDATION_SECRET || 'dev-secret-change-in-production'}`,
  },
  debounce: {
    delay: 1000,
    maxWait: 5000,
  },
  retry: {
    attempts: 3,
    delay: 2000,
    backoff: 'exponential',
  },
})
export class CatalogBrand {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  legacySystemId?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  updatedAt?: Date;

  @Field()
  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()
  slug: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  legacySlug?: string;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  @Index()
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field()
  @Column({ type: 'boolean', default: false })
  @Index()
  isActive: boolean;

  @Field()
  @Column({ type: 'boolean', default: false })
  isHighlighted: boolean;

  @Field()
  @Column({ type: 'boolean', default: false })
  isRecommended: boolean;
}
