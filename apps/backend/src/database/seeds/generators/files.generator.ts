import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { File } from '../../../file/file.entity';
import { User } from '../../../model/user/user.entity';
import * as crypto from 'crypto';

/**
 * Generate fake file metadata records
 * Note: This doesn't create actual files, just database records
 */
export async function generateFiles(
  dataSource: DataSource,
  count: number
): Promise<File[]> {
  const fileRepository = dataSource.getRepository(File);
  const userRepository = dataSource.getRepository(User);

  console.log(`📁 Generating ${count} file records...`);

  // Get random users for uploadedBy field
  const users = await userRepository.find();
  const files: Partial<File>[] = [];

  const extensions = ['jpg', 'png', 'webp', 'pdf', 'svg'];
  const mimeTypes = {
    jpg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    pdf: 'application/pdf',
    svg: 'image/svg+xml',
  };

  for (let i = 0; i < count; i++) {
    const extension = faker.helpers.arrayElement(extensions);
    const mimeType = mimeTypes[extension];
    const isImage = mimeType.startsWith('image/');
    const fileName = `${faker.system.fileName()}.${extension}`;
    const year = faker.date.past({ years: 2 }).getFullYear();
    const month = String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0');
    const relativePath = `uploads/${year}/${month}/${fileName}`;

    // Generate SHA256 checksum (fake but realistic format)
    const checksum = crypto
      .createHash('sha256')
      .update(fileName + i)
      .digest('hex');

    files.push({
      relativePath,
      name: fileName,
      extension,
      size: faker.number.int({ min: 10000, max: 5000000 }),
      mimeType,
      checksum,
      width: isImage ? faker.number.int({ min: 400, max: 4000 }) : undefined,
      height: isImage ? faker.number.int({ min: 300, max: 3000 }) : undefined,
      alt: isImage ? faker.lorem.sentence() : undefined,
      title: isImage ? faker.lorem.words(3) : undefined,
      thumbnailPath: isImage
        ? `uploads/${year}/${month}/thumb_${fileName}`
        : undefined,
      uploadedBy: users.length > 0 ? faker.helpers.arrayElement(users) : undefined,
    });
  }

  const savedFiles = await fileRepository.save(files);
  console.log(`✅ Generated ${savedFiles.length} file records`);

  return savedFiles;
}
