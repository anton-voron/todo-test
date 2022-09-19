import { Controller, UseFilters } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod, RpcException } from '@nestjs/microservices';
import {
  CALCULATOR_SERVICE_NAME,
  ComputeAverageRequest,
  ComputeAverageResponse,
  FindMaximumRequest,
  FindMaximumResponse,
  PrimeNumberDecompositionRequest,
  PrimeNumberDecompositionResponse,
  SquareRootRequest,
  SquareRootResponse,
  SumRequest,
  SumResponse,
} from '@proto-interfaces/calculator';
import { Observable, Subject } from 'rxjs';
import { Metadata, ServerDuplexStream } from '@grpc/grpc-js';
import * as grpc from '@grpc/grpc-js';
import { ExceptionFilter } from '@modules/shared/services/rpc-exception.filter';

@Controller()
export class GrpcCalculatorService {
  @UseFilters(new ExceptionFilter())
  @GrpcMethod(CALCULATOR_SERVICE_NAME, 'Sum')
  public sum(request: SumRequest): SumResponse {
    const x: number = request.firstNumber;
    const y: number = request.secondNumber;

    const response: SumResponse = {
      sumResult: x + y,
    };

    return response;
  }

  @UseFilters(new ExceptionFilter())
  @GrpcMethod(CALCULATOR_SERVICE_NAME, 'PrimeNumberDecomposition')
  public primeNumberDecomposition(
    request: PrimeNumberDecompositionRequest,
    metadata: Metadata,
    call: ServerDuplexStream<PrimeNumberDecompositionRequest, PrimeNumberDecompositionResponse>,
  ): Observable<PrimeNumberDecompositionResponse> {
    const stream = new Observable<PrimeNumberDecompositionResponse>(observer => {
      try {
        let number = request.number;
        let divisor = 2;
        while (number > 1) {
          if (number % divisor === 0) {
            number /= divisor;
            const primeNumberDecompositionResponse: PrimeNumberDecompositionResponse = {
              primeFactor: number,
            };
            observer.next(primeNumberDecompositionResponse);
          } else {
            divisor++;
          }
        }
      } finally {
        observer.complete()
      }
    });
    return  stream;
  }

  @UseFilters(new ExceptionFilter())
  @GrpcStreamMethod(CALCULATOR_SERVICE_NAME, 'ComputeAverage')
  public computeAverage(
    stream: Observable<ComputeAverageRequest>,
    metadata: Metadata,
    call: ServerDuplexStream<any, any>,
  ): Observable<ComputeAverageResponse> {
    const subject = new Subject<ComputeAverageResponse>();
    let sum = 0;
    let count = 0;

    const onNext = (request: ComputeAverageRequest) => {
      sum += request.number;
      count += 1;
    };

    const onComplete = () => {
      const average: ComputeAverageResponse = {
        average: sum / count,
      };
      subject.next(average);
      subject.complete();
    };

    stream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }

  @UseFilters(new ExceptionFilter())
  @GrpcStreamMethod(CALCULATOR_SERVICE_NAME, 'FindMaximum')
  public findMaximum(
    request: Observable<FindMaximumRequest>,
    metadata: Metadata,
    call: ServerDuplexStream<FindMaximumRequest, FindMaximumResponse>,
  ): Observable<FindMaximumResponse> {
    let currentMaximum = 0;
    const subject = new Subject<FindMaximumResponse>();

    const onNext = req => {
      const currentNumber = req.number;
      if (currentNumber > currentMaximum) {
        currentMaximum = currentNumber;
        const response: FindMaximumResponse = {
          maximum: currentMaximum,
        };
        subject.next(response);
      }
      console.log(`Streamed number: ${currentNumber}`);
    };

    const onComplete = () => subject.complete();

    request.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }

  @UseFilters(new ExceptionFilter())
  @GrpcMethod(CALCULATOR_SERVICE_NAME, 'SquareRoot')
  public squareRoot(request: SquareRootRequest): SquareRootResponse {
    const number = request.number;
    if (number >= 0) {
      const numberRoot = Math.sqrt(number);
      const response: SquareRootResponse = {
        numberRoot,
      };
      return response;
    } else {
      throw new RpcException({
        status: grpc.status.CANCELLED,
        message: 'The number been sent is not possitive. Number sent: ' + number,
      });
    }
  }
}
