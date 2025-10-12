import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

/**
 * Unsubscribe from Newsletter DTO
 */
export class UnsubscribeNewsletterDto {
  @ApiProperty({
    description: 'Email address to unsubscribe from newsletter',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;
}

/**
 * Unsubscribe Response DTO
 */
export class UnsubscribeResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'Email that was unsubscribed' })
  email: string;
}
