import { InputType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UploadDocumentInput {
  @Field()
  @IsUUID()
  documentTemplateId: string;

  @Field()
  @IsUUID()
  fileId: string;
}
