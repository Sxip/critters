import { IPlayerJoinMessage } from './IPlayerJoinMessage'

export class OutgoingPlayerJoinMessage implements IPlayerJoinMessage {
  /**
   * Identity of the player.
   *
   * @public
   */
  public i: string

  /**
   * Player nickname.
   */
  public n: string

  /**
   * Player gear.
   * 
   * @public
   */
  public g: string[]

  /**
   * Player nickname color.
   * 
   * @public
   */
  public nicknameColor: string

  /**
   * Player critter type.
   *
   * @public
   */
  public c: string

  /**
   * Coordinates of the player.
   * 
   * @public
   */
  public x: number
  public y: number
  public r: number
  public s: number

  /**
   * Constructor.
   * 
   * @constructor
   */
  public constructor (data: IPlayerJoinMessage) {
    this.i = data.i
    this.n = data.n
    this.g = data.g
    this.nicknameColor = data.nicknameColor
    this.c = data.c
    this.x = data.x
    this.y = data.y
    this.r = data.r
    this.s = data.s
  }
}
