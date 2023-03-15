/**
 * enum con los nombres de los eventos publicados
 *
 * @export
 * @enum {number} Publisher
 */
export enum Publisher {
  ChangedDescriptionCategory = 'product.changed-description-category',
  ChangedDescription = 'product.changed-description',
  ChangedName = 'product.changed-name',
  ChangedEmail = 'product.changed-email',
  changedImage = 'product.changed-image',
  ChangedState = 'product.changed-state',
  ChangeNameCategory = 'product.changed-name-category',
  ChangeNameSeller = 'product.changed-name-seller',
  ChangedStateCategory = 'product.changed-state-category',
  ChangedStateSeller = 'product.changed-state-seller',
  CreatedItem = 'product.created-item',
  DecreasePrice = 'product.decrease-price',
  IncreasePrice = 'product.increase-price',
  GotCategory = 'product.got-category',
  GotItem = 'product.got-item',
  GotSeller = 'product.got-seller',
}
