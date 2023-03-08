import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';

export abstract class ChangedImageEventPublisher<
  Response,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'producto.url-imagen-modificada',
      JSON.stringify(this.response),
    );
  }
}
