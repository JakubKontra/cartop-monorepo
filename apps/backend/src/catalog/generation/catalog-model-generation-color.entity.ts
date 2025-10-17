import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { CatalogModelGeneration } from './catalog-model-generation.entity';
import { CatalogColor } from '../color/catalog-color.entity';

/**
 * CatalogModelGenerationColor Entity
 * Represents color options available for a specific model generation with pricing
 */
@ObjectType()
@Entity('catalog_model_generation_colors')
@Auditable()
export class CatalogModelGenerationColor {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  legacySystemId?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field(() => Int, { description: 'Price in cents' })
  @Column({ type: 'integer' })
  price: number;

  @Field(() => CatalogModelGeneration)
  @ManyToOne(() => CatalogModelGeneration, generation => generation.colors, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'generationId' })
  generation: CatalogModelGeneration;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  generationId: string;

  @Field(() => CatalogColor)
  @ManyToOne(() => CatalogColor, color => color.generationColors, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'colorId' })
  color: CatalogColor;

  @Field()
  @Column({ type: 'uuid' })
  @Index()
  colorId: string;
}
