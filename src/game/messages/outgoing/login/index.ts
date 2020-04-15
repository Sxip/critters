import { ILoginMessage } from './ILoginMessage'

export class OutgoingLoginMessage implements ILoginMessage {
  /**
   * Player id.
   * 
   * @public
   */
  public playerId: string

  /**
   * Player nickname.
   * 
   * @public
   */
  public nickname: string

  /**
   * Player critter id.
   * 
   * @public
   */
  public critterId: string

  /**
   * Player inventory.
   * 
   * @public
   */
  public inventory: object[]

  /**
   * Player gear.
   * 
   * @public
   */
  public gear: object

  /**
   * Player coins.
   * 
   * @public
   */
  public coins: number

  /**
   * Player gems.
   * 
   * @public
   */
  public gems: number

  /**
   * Constructor.
   * 
   * @public
   */
  public constructor (data: ILoginMessage) {
    this.playerId = data.playerId
    this.nickname = data.nickname
    this.critterId = data.critterId
    this.inventory = data.inventory
    this.gear = data.gear
    this.coins = data.coins
    this.gems = data.gems
  }
}
