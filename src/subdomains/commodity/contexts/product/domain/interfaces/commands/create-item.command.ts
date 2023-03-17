/**
 * interfaz para crear un item
 *
 * @export
 * @interface ICreateItemCommand
 */
export interface ICreateItemCommand {
  /**
   * identificador del item
   *
   * @type {string}
   * @memberof ICreateItemCommand
   */
  itemId: string;
  /**
   * nombre del item
   *
   * @type {string}
   * @memberof ICreateItemCommand
   */
  name: string;
  /**
   * descripción del item
   *
   * @type {string}
   * @memberof ICreateItemCommand
   */
  description: string;
  /**
   * precio del item
   *
   * @type {number}
   * @memberof ICreateItemCommand
   */
  price: number;
  /**
   * imagen del item
   *
   * @type {string}
   * @memberof ICreateItemCommand
   */
  image: string;
  /**
   * estado del item
   *
   * @type {boolean}
   * @memberof ICreateItemCommand
   */
  state: boolean;
  /**
   * vendedor del item
   *
   * @type {{
   *     sellerId: string;
   *     email: string;
   *     name: string;
   *     state: boolean;
   *   }}
   * @memberof ICreateItemCommand
   */
  seller: {
    /**
     * identificador del vendedor
     *
     * @type {string}
     */
    sellerId: string;
    /**
     * email del vendedor
     *
     * @type {string}
     */
    email: string;
    /**
     * nombre del vendedor
     *
     * @type {string}
     */
    name: string;
    /**
     * estado del vendedor
     *
     * @type {boolean}
     */
    state: boolean;
  };
  /**
   * categorías del item
   *
   * @type {{
   *     categoryId: string;
   *     name: string;
   *     state: boolean;
   *     description: string;
   *   }[]}
   * @memberof ICreateItemCommand
   */
  categories: {
    /**
     * identificador de la categoría
     *
     * @type {string}
     */
    categoryId: string;
    /**
     * nombre de la categoría
     *
     * @type {string}
     */
    name: string;
    /**
     * estado de la categoría
     *
     * @type {boolean}
     */
    state: boolean;
    /**
     * descripción de la categoría
     *
     * @type {string}
     */
    description: string;
  }[];
}
