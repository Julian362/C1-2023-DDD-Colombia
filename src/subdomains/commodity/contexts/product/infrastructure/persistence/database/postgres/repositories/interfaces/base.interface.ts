/**
 * interface base para los repositorios
 *
 * @export
 * @interface IBase
 * @template Entity
 */
export interface IBase<Entity> {
  /**
   * crea un nuevo registro
   *
   * @param {Entity} entity
   * @return {Promise<Entity>} retorna el registro creado
   * @memberof IBase
   */
  create(entity: Entity): Promise<Entity>;
  /**
   * actualiza un registro
   *
   * @param {string} id
   * @param {Entity} entity
   * @return {Promise<Entity>} retorna el registro actualizado
   * @memberof IBase
   */
  update(id: string, entity: Entity): Promise<Entity>;
  /**
   * elimina un registro
   *
   * @param {string} id
   * @return {Promise<boolean>} retorna true si se elimino el registro
   * @memberof IBase
   */
  delete(id: string): Promise<boolean>;
  /**
   * busca todos los registros
   *
   * @param {string} id
   * @return {Promise<Entity>} retorna el registro encontrado
   * @memberof IBase
   */
  findById(id: string): Promise<Entity>;
}
