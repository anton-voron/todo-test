import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import * as path from 'path';
import * as fs from 'fs';
import { ServerCredentials } from '@grpc/grpc-js/src/server-credentials';
import { CALCULATOR_PACKAGE_NAME } from '@proto-interfaces/calculator';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';


@Injectable()
export class ConfigService {
  private logger: Logger = new Logger(ConfigService.name);

  constructor() {
    const nodeEnv = this.nodeEnv;
    dotenv.config({
      path: `env/.${nodeEnv}.env`,
    });
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'dev';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'prod';
  }

  public get(key: string): string {
    return process.env[key];
  }

  public set(key: string, value: string) {
    return (process.env[key] = value);
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get nodeEnv(): string {
    const env = this.get('NODE_ENV');
    if (!env) throw new Error('NODE_ENV is not set');
    return env;
  }

  get getGrpcCredentials(): ServerCredentials {
    const credentials = grpc.ServerCredentials.createSsl(
      fs.readFileSync(path.join('..', 'cert', 'cert.pem')),
      [
        {
          cert_chain: fs.readFileSync(path.join('..', 'cert', 'cert.pem')),
          private_key: fs.readFileSync(path.join('..', 'cert', 'key.pem')),
        },
      ],
      true,
    );
    return credentials;
  }

  get gRpcUrl(): string {
    const host = this.get('GRPC_HOST');
    const port = this.get('GRPC_PORT');
    return `${host}:${port}`;
  }

  get gRpcProtoFolder(): string {
    return this.get('GRPC_PROTO_FOLDER');
  }

  get gRpcOptions(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        package: [CALCULATOR_PACKAGE_NAME],
        protoPath: [path.join(this.gRpcProtoFolder, this.get('GRPC_SERVICE_PROTO_FOLDER'), this.get('GRPC_SERVICE_PROTO_FILE'))],
        url: this.gRpcUrl,
      },
    };
  }

  get dbOption(): TypeOrmModuleOptions {
    const entities = [path.join(__dirname, '/../../../common/entities/sqlite-db/*.entity{.ts,.js}')];
    const migrations = [path.join(__dirname, '/../../../migrations/sqlite-db/*{.ts,.js}')];
    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: 'sqlite',
      database: this.get('DB_DATABASE'),
      migrationsRun: false,
      synchronize: true,
      logging: ['error'],
    };
  }
}
