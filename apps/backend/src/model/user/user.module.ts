import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { File } from '../../file/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, File]), // Include File entity for avatar relation
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
