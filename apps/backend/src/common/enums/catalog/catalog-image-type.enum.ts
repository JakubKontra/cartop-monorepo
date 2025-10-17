/**
 * Catalog Image Type Enum
 * Defines the type/purpose of an image in the catalog
 */
export enum CatalogImageType {
  EXTERIOR = 'exterior',           // Exterior view of the vehicle
  INTERIOR = 'interior',           // Interior view of the vehicle
  DETAIL = 'detail',               // Detail shot (steering wheel, seats, dashboard, etc.)
  GALLERY_360 = 'gallery_360',     // 360-degree gallery frame
  THUMBNAIL = 'thumbnail',         // Thumbnail image for listings
  HERO = 'hero',                   // Main hero/featured image
}
