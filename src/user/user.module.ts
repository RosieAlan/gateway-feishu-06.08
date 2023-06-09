import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/common/database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProviders } from './user.providers';
import { FeishuController } from './feishu/feishu.controller';
import { FeishuService } from './feishu/feishu.service';
// import { User } from './user.mongo.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    DatabaseModule,
    // TypeOrmModule.forFeature([User]), // 将User实体注入到模块中
  ],
  controllers: [
    FeishuController,
    UserController
  ],
  providers: [...UserProviders, UserService, FeishuService],
  exports: [UserService],
})
export class UserModule { }