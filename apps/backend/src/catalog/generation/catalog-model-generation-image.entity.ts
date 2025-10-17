import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int, registerEnumType } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { CatalogModelGeneration } from './catalog-model-generation.entity';
import { File } from '../../file/file.entity';
import { CatalogColor } from '../color/catalog-color.entity';
import { CatalogImageType } from '../../common/enums/catalog/catalog-image-type.enum';

// Register enum for GraphQL
registerEnumType(CatalogImageType, {
  name: 'CatalogImageType',
  description: 'Type/purpose of a catalog image',
});

/**
 * CatalogModelGenerationImage Entity
 * Represents images associated with a model generation with ordering and color combinations
 * Supports various image types including 360° galleries
 */
@ObjectType()
@Entity('catalog_model_generation_images')
@Auditable()
export class CatalogModelGenerationImage {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  legacySystemId?: string;

  @Field(() => Int, { description: 'Display order' })
  @Column({ type: 'integer', default: 0 })
  order: number;

  @Field()
  @Column({ type: 'boolean', default: false })
  @Index()
  active: boolean;

  @Field(() => CatalogImageType, { description: 'Type/purpose of this image' })
  @Column({
    type: 'enum',
    enum: CatalogImageType,
    default: CatalogImageType.EXTERIOR
  })
  @Index()
  imageType: CatalogImageType;

  @Field({ nullable: true, description: 'Description/alt text for SEO' })
  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true, description: '360 gallery frame position (0-35 for 36 frames)' })
  @Column({ type: 'integer', nullable: true })
  galleryPosition?: number;

  @Field(() => CatalogModelGeneration)
  @ManyToOne(() => CatalogModelGeneration, generation => generation.images, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'generationId' })
  generation: CatalogModelGeneration;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  generationId: string;

  @Field(() => File)
  @ManyToOne(() => File, file => file.generationImages, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'imageId' })
  image: File;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  imageId: string;

  @Field(() => CatalogColor, { nullable: true, description: 'Exterior color for this image' })
  @ManyToOne(() => CatalogColor, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'exteriorColorId' })
  exteriorColor?: CatalogColor;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  exteriorColorId?: string;

  @Field(() => CatalogColor, { nullable: true, description: 'Interior color for this image' })
  @ManyToOne(() => CatalogColor, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'interiorColorId' })
  interiorColor?: CatalogColor;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  @Index()
  interiorColorId?: string;
}
