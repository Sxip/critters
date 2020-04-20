import { Get, JsonController } from 'routing-controllers'

@JsonController()
export class IndexController {
  /**
   * Displays the API message.
   * 
   * @method GET
   * @public
   */
  @Get()
  public index (): object {
    return { message: 'Server API' }
  }
}
