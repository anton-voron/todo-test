/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { util, configure } from "protobufjs/minimal";
import * as Long from "long";
import { Observable } from "rxjs";
import { Metadata } from "@grpc/grpc-js";

export const protobufPackage = "calculator";

export interface SumRequest {
  firstNumber: number;
  secondNumber: number;
}

export interface SumResponse {
  sumResult: number;
}

export interface PrimeNumberDecompositionRequest {
  number: number;
}

export interface PrimeNumberDecompositionResponse {
  primeFactor: number;
}

export interface ComputeAverageRequest {
  number: number;
}

export interface ComputeAverageResponse {
  average: number;
}

export interface FindMaximumRequest {
  number: number;
}

export interface FindMaximumResponse {
  maximum: number;
}

export interface SquareRootRequest {
  number: number;
}

export interface SquareRootResponse {
  numberRoot: number;
}

export const CALCULATOR_PACKAGE_NAME = "calculator";

export interface CalculatorServiceClient {
  /** Unary API */

  sum(
    request: SumRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<SumResponse>;

  /** Server Streaming API */

  primeNumberDecomposition(
    request: PrimeNumberDecompositionRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<PrimeNumberDecompositionResponse>;

  /** Client Stream API */

  computeAverage(
    request: Observable<ComputeAverageRequest>,
    metadata: Metadata,
    ...rest: any
  ): Observable<ComputeAverageResponse>;

  /** BiDi Stream API */

  findMaximum(
    request: Observable<FindMaximumRequest>,
    metadata: Metadata,
    ...rest: any
  ): Observable<FindMaximumResponse>;

  /**
   * Error handling
   * This RPC will throw an exception if the number is negative
   */

  squareRoot(
    request: SquareRootRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<SquareRootResponse>;
}

export interface CalculatorServiceController {
  /** Unary API */

  sum(
    request: SumRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<SumResponse> | Observable<SumResponse> | SumResponse;

  /** Server Streaming API */

  primeNumberDecomposition(
    request: PrimeNumberDecompositionRequest,
    metadata: Metadata,
    ...rest: any
  ): Observable<PrimeNumberDecompositionResponse>;

  /** Client Stream API */

  computeAverage(
    request: Observable<ComputeAverageRequest>,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<ComputeAverageResponse>
    | Observable<ComputeAverageResponse>
    | ComputeAverageResponse;

  /** BiDi Stream API */

  findMaximum(
    request: Observable<FindMaximumRequest>,
    metadata: Metadata,
    ...rest: any
  ): Observable<FindMaximumResponse>;

  /**
   * Error handling
   * This RPC will throw an exception if the number is negative
   */

  squareRoot(
    request: SquareRootRequest,
    metadata: Metadata,
    ...rest: any
  ):
    | Promise<SquareRootResponse>
    | Observable<SquareRootResponse>
    | SquareRootResponse;
}

export function CalculatorServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "sum",
      "primeNumberDecomposition",
      "squareRoot",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("CalculatorService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = ["computeAverage", "findMaximum"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("CalculatorService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const CALCULATOR_SERVICE_NAME = "CalculatorService";

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
