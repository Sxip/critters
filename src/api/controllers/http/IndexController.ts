import { Controller, Get, Render } from 'routing-controllers'

@Controller()
export class IndexController {
  /**
   * Renders the index page.
   * 
   * @method GET
   * @public
   */
  @Get()
  @Render('homepage')
  public index () { }

  /**
   * Renders the play page.
   * 
   * @method GET
   * @public
   */
  @Get('/play')
  @Render('play')
  public play () { }
}
