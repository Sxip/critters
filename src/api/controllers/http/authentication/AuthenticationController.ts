import { AuthenticationService } from '@services/authentication/AuthenticationService'
import { LoginValidation } from '@validators/authentication/LoginValidation'
import { RegisterValidation } from '@validators/authentication/RegisterValidation'
import { Body, JsonController, Post } from 'routing-controllers'

@JsonController('/auth')
export class AuthenticationController {
  /**
   * Constructor.
   *
   * @param authenticationService
   * @constructor
   */
  public constructor (
    private readonly authenticationService: AuthenticationService
  ) { }

  /**
   * Authenticates a user.
   *
   * @public
   */
  @Post('/login')
  public async login (@Body() { nickname, password }: LoginValidation): Promise<object> {
    return await this.authenticationService.loginWithNickname(nickname, password)
  }

  /**
   * Registers a user.
   * 
   * @public
   */
  @Post('/register')
  public async register (@Body() { nickname, password }: RegisterValidation): Promise<object> {
    return await this.authenticationService.register(nickname, password)
  }
}
