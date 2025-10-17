import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Auditable } from '../../common/decorators/auditable.decorator';
import { CatalogColorType } from '../../common/enums/catalog/catalog-color-type.enum';
import { CatalogModelGenerationColor } from '../generation/catalog-model-generation-color.entity';

// Register enum for GraphQL
registerEnumType(CatalogColorType, {
  name: 'CatalogColorType',
  description: 'Type of catalog color (exterior or interior)',
});

/**
 * CatalogColor Entity
 * Represents color definitions for vehicles (both exterior and interior)
 */
@ObjectType()
@Entity('catalog_colors')
@Auditable()
export class CatalogColor {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
  legacySystemId?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 255, unique: true })
  @Index()
  slug: string;

  @Field({ nullable: true, description: 'Hex color code (e.g., #FFFFFF)' })
  @Column({ type: 'varchar', length: 7, nullable: true })
  color?: string;

  @Field(() => CatalogColorType)
  @Column({
    type: 'enum',
    enum: CatalogColorType,
  })
  type: CatalogColorType;

  @Field(() => [CatalogModelGenerationColor], { nullable: true })
  @OneToMany(() => CatalogModelGenerationColor, generationColor => generationColor.color)
  generationColors?: CatalogModelGenerationColor[];
}
