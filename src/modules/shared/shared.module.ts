import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@modules/shared/services/config.service';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class SharedModule {}
