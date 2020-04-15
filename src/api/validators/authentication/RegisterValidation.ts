import { IsNotEmpty, IsString } from 'class-validator'

export class RegisterValidation {
  /**
   * Username field.
   *
   * @public
   */
  @IsNotEmpty({ message: 'Nickname field cannot be left empty!' })
  @IsString()
  public readonly nickname!: string

  /**
   * Password field.
   *
   * @public
   */
  @IsNotEmpty({ message: 'Password field cannot be left empty!' })
  @IsString()
  public readonly password!: string
}
