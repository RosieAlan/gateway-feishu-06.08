import { Module } from '@nestjs/common';
import { CacheModule ,CacheModuleOptions} from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from '@/utils';
import { redisStore } from 'cache-manager-redis-yet';

const RedisCacheOptions: CacheModuleOptions = {
  isGlobal: true,
  store: redisStore,
  host: getConfig("REDIS_CONFIG").host,
  port: getConfig("REDIS_CONFIG").port,
  auth_pass: getConfig("REDIS_CONFIG").auth_pass,
  db: getConfig("REDIS_CONFIG").db,
};
@Module({
  imports: [
    CacheModule.register(RedisCacheOptions),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
