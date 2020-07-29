import { ILoginMessage } from './ILoginMessage'

export class OutgoingLoginMessage implements ILoginMessage {
  /**
   * Player id.
   * 
   * @public
   */
  public readonly playerId: string

  /**
   * Player nickname.
   * 
   * @public
   */
  public readonly nickname: string

  /**
   * Player nickname color.
   * 
   * @public
   */
  public readonly nicknameColor: string

  /**
   * Player critter id.
   * 
   * @public
   */
  public readonly critterId: string

  /**
   * Player inventory.
   * 
   * @public
   */
  public readonly inventory: string[]

  /**
   * Player gear.
   * 
   * @public
   */
  public readonly gear: object

  /**
   * Player coins.
   * 
   * @public
   */
  public readonly coins: number

  /**
   * Player gems.
   * 
   * @public
   */
  public readonly gems: number

  /**
   * Constructor.
   * 
   * @public
   */
  public constructor (data: ILoginMessage) {
    this.playerId = data.playerId
    this.nickname = data.nickname
    this.nicknameColor = data.nicknameColor
    this.critterId = data.critterId
    this.inventory = data.inventory
    this.gear = data.gear
    this.coins = data.coins
    this.gems = data.gems
  }
}
