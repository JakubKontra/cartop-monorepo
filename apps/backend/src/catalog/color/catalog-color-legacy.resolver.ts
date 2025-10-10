import { Resolver, ResolveField, Parent, Context } from '@nestjs/graphql';
import { CatalogColor } from './catalog-color.entity';
import { CatalogLegacyFieldResolver } from '../common/catalog-legacy-field.resolver';

/**
 * Legacy Field Resolver for CatalogColor
 * Handles field-level authorization for legacy fields on CatalogColor entity
 * Note: CatalogColor only has legacySystemId (no legacySlug)
 */
@Resolver(() => CatalogColor)
export class CatalogColorLegacyFieldResolver extends CatalogLegacyFieldResolver {
  @ResolveField('legacySystemId', () => String, { nullable: true })
  resolveLegacySystemId(
    @Parent() entity: CatalogColor,
    @Context() context: any,
  ): string | null {
    return this.checkLegacyFieldAccess(entity.legacySystemId, context);
  }
}
