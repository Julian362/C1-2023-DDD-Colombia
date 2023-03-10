import { EventPublisherBase } from 'src/shared/sofka/interface/event-publisher.base';
import { ItemDomainEntity } from '../../entities/item.domain-entity';
import { Publisher } from './enums/publisher.enum';

/**
 * clase abstracta para publicar el evento de cambio de la descripción del item
 *
 * @export
 * @abstract
 * @class ChangedDescriptionEventPublisher
 * @extends {EventPublisherBase<Response>}
 * @template Response
 */
export abstract class ChangedDescriptionEventPublisher<
  Response = ItemDomainEntity,
> extends EventPublisherBase<Response> {
  /**
   * publica el evento de cambio de la descripción del item
   *
   * @template Result
   * @return {Promise<Result>} retorna una promesa con el resultado
   * @memberof ChangedDescriptionEventPublisher
   */
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      Publisher.ChangedDescription,
      JSON.stringify(this.response),
    );
  }
}
