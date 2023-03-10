import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { Publisher } from './enums/publisher.enum';

/**
 * clase abstracta para publicar el evento de cambio de la url de la imagen
 *
 * @export
 * @abstract
 * @class ChangedImageEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedImageEventPublisher<
  Response,
> extends EventPublisherBase<Response> {
  /**
   * publica el evento de cambio de la url de la imagen
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof ChangedImageEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(Publisher.ChangedName, JSON.stringify(this.response));
  }
}
