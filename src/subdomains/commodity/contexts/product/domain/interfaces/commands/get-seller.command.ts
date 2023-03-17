/**
 * interfaz para obtener un vendedor
 *
 * @export
 * @interface IGetSellerCommand
 */
export interface IGetSellerCommand {
  /**
   * identificador del vendedor
   *
   * @type {string}
   * @memberof IGetSellerCommand
   */
  sellerId: string;
}
