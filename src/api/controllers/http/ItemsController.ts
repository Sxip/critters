import { Get, JsonController } from 'routing-controllers'

@JsonController('/data/items')
export class ItemsController {
  /**
   * Displays the available items in the database.
   * 
   * @method GET
   * @public
   */
  @Get('')
  public index (): void {
    return
  }
}
