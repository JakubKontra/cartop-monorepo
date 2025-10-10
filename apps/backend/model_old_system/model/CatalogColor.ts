import { c } from "@contember/schema-definition";
import { CatalogModelGenerationColor } from "./CatalogModelGenerationColor";
import { Gallery } from "./Image";
import { catalogManagerRole, salesRepresentativeRole } from "./acl";

export const catalogColorType = c.createEnum("exterior", "interior");

@c.Allow(salesRepresentativeRole, {
  read: true,
})
@c.Allow(catalogManagerRole, {
  read: true,
  create: true,
  update: true,
})
export class CatalogColor {
  legacySystemId = c.stringColumn().nullable().unique();
  name = c.stringColumn().notNull();
  slug = c.stringColumn().unique();

  createdAt = c.dateTimeColumn().notNull().default("now");

  color = c.stringColumn().nullable().default(null);
  type = c.enumColumn(catalogColorType);
  modelGenerationColors = c.oneHasMany(
    CatalogModelGenerationColor,
    "catalogColor"
  );
}
