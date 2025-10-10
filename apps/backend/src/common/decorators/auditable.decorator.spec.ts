import 'reflect-metadata';
import { Auditable, isAuditable, AUDITABLE_METADATA } from './auditable.decorator';

describe('@Auditable Decorator', () => {
  describe('Auditable', () => {
    it('should mark entity as auditable', () => {
      @Auditable()
      class TestEntity {}

      const metadata = Reflect.getMetadata(AUDITABLE_METADATA, TestEntity);

      expect(metadata).toBe(true);
    });

    it('should work with multiple entities', () => {
      @Auditable()
      class Entity1 {}

      @Auditable()
      class Entity2 {}

      class Entity3 {}

      expect(Reflect.getMetadata(AUDITABLE_METADATA, Entity1)).toBe(true);
      expect(Reflect.getMetadata(AUDITABLE_METADATA, Entity2)).toBe(true);
      expect(Reflect.getMetadata(AUDITABLE_METADATA, Entity3)).toBeUndefined();
    });

    it('should not affect entity properties or methods', () => {
      @Auditable()
      class TestEntity {
        id: string;
        name: string;

        getName(): string {
          return this.name;
        }
      }

      const instance = new TestEntity();
      instance.id = '123';
      instance.name = 'Test';

      expect(instance.id).toBe('123');
      expect(instance.name).toBe('Test');
      expect(instance.getName()).toBe('Test');
    });
  });

  describe('isAuditable', () => {
    it('should return true for auditable entity instance', () => {
      @Auditable()
      class TestEntity {}

      const instance = new TestEntity();

      expect(isAuditable(instance)).toBe(true);
    });

    it('should return false for non-auditable entity instance', () => {
      class TestEntity {}

      const instance = new TestEntity();

      expect(isAuditable(instance)).toBe(false);
    });

    it('should return false for null/undefined', () => {
      expect(isAuditable(null)).toBe(false);
      expect(isAuditable(undefined)).toBe(false);
    });

    it('should return false for plain objects', () => {
      const plainObject = { id: '123', name: 'Test' };

      expect(isAuditable(plainObject)).toBe(false);
    });

    it('should work correctly with inheritance', () => {
      @Auditable()
      class BaseEntity {}

      class DerivedEntity extends BaseEntity {}

      const baseInstance = new BaseEntity();
      const derivedInstance = new DerivedEntity();

      expect(isAuditable(baseInstance)).toBe(true);
      // Note: Derived entities inherit the metadata from their parent class
      expect(isAuditable(derivedInstance)).toBe(true);
    });

    it('should distinguish between different entity types', () => {
      @Auditable()
      class AuditableEntity {}

      class NonAuditableEntity {}

      const auditableInstance = new AuditableEntity();
      const nonAuditableInstance = new NonAuditableEntity();

      expect(isAuditable(auditableInstance)).toBe(true);
      expect(isAuditable(nonAuditableInstance)).toBe(false);
    });
  });

  describe('integration scenarios', () => {
    it('should work with TypeORM entity pattern', () => {
      // Simulate TypeORM entity with multiple decorators
      @Auditable()
      class CatalogBrand {
        id: string;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
      }

      const brand = new CatalogBrand();
      brand.id = 'brand-1';
      brand.name = 'BMW';

      expect(isAuditable(brand)).toBe(true);
      expect(brand.name).toBe('BMW');
    });

    it('should support multiple decorated entities in same module', () => {
      @Auditable()
      class User {
        id: string;
        email: string;
      }

      @Auditable()
      class Product {
        id: string;
        name: string;
      }

      class Category {
        id: string;
        name: string;
      }

      const user = new User();
      const product = new Product();
      const category = new Category();

      expect(isAuditable(user)).toBe(true);
      expect(isAuditable(product)).toBe(true);
      expect(isAuditable(category)).toBe(false);
    });
  });
});
