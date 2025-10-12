import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { LeasingCompany } from '../../../leasing-company/leasing-company.entity';
import { File } from '../../../file/file.entity';
import { leasingCompanies } from './seed-utils';

/**
 * Generate leasing companies with realistic data
 */
export async function generateLeasingCompanies(
  dataSource: DataSource,
  count: number,
  files: File[]
): Promise<LeasingCompany[]> {
  const leasingCompanyRepository = dataSource.getRepository(LeasingCompany);

  console.log(`🏦 Generating ${count} leasing companies...`);

  const companies: Partial<LeasingCompany>[] = [];
  const imageFiles = files.filter(f => f.mimeType.startsWith('image/'));

  for (let i = 0; i < count; i++) {
    const companyName = i < leasingCompanies.length
      ? leasingCompanies[i]
      : `${faker.company.name()} Leasing`;

    companies.push({
      name: companyName,
      link: faker.internet.url(),
      logo: imageFiles.length > 0
        ? faker.helpers.arrayElement(imageFiles)
        : undefined,
    });
  }

  const savedCompanies = await leasingCompanyRepository.save(companies);
  console.log(`✅ Generated ${savedCompanies.length} leasing companies`);

  return savedCompanies;
}
