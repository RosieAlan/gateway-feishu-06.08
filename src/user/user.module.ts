import { forwardRef, Module } from '@nestjs/common';
import { FeishuService } from './feishu/feishu.service';
import { FeishuController } from './feishu/feishu.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register()
  ],
  controllers: [FeishuController],
  providers: [FeishuService],
})
export class UserModule {}
