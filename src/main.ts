import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedModule } from '@modules/shared/shared.module';
import { ConfigService } from '@modules/shared/services/config.service';
import { GrpcOptions, MicroserviceOptions } from '@nestjs/microservices';
import { Logger, NestApplicationOptions } from '@nestjs/common';
import { ExpressAdapter } from "@nestjs/platform-express";
import * as fs from "fs";

async function bootstrap() {
  const logger: Logger = new Logger(bootstrap.name);
  const appOptions: NestApplicationOptions = {
    cors: true
  };
  const app = await NestFactory.create(AppModule, new ExpressAdapter(), appOptions);
  const configService = app.select(SharedModule).get(ConfigService);

  //Here above you can define specific transport to use rmq/grpc
  const gRPC: GrpcOptions = configService.gRpcOptions;

  await app.connectMicroservice<MicroserviceOptions>(gRPC);

  app.startAllMicroservices().then(() => {
    logger.verbose(`todo-test +grpc is up and running on the  gRPC: ${gRPC.options.url} `);
  });

  const port = configService.getNumber('PORT');
  const host = configService.get('HOST')
  app.listen(port)

  logger.verbose(`Main App is up and running on the url: http://${host}:${port} `);
}
bootstrap();
