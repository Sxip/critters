import { IRoom } from '@/game/rooms/IRoom'
import { EventEmitter } from 'events'
import { IPlayerCrumbs, IPlayerGear } from '../IEntity'
import { IEntityPlayer } from '../IEntityPlayer'

export abstract class PlayerBase extends EventEmitter implements IEntityPlayer {
  /**
   * Identity of the player.
   * 
   * @public
   */
  public id!: number

  /**
   * Nickname of the player.
   * 
   * @public
   */
  public nickname!: string

  /**
   * Nickname color.
   * 
   * @public
   */
  public nicknameColor: string = 'white'

  /**
   * Current gear of the player.
   * 
   * @public
   */
  public cape!: string
  public mask!: string
  public ears!: string
  public body!: string
  public head!: string

  /**
   * Coordinates of the player.
   * 
   * @public
   */
  public x: number = 0
  public y: number = 0
  public r: number = 0

  /**
   * Size of the player.
   * 
   * @public
   */
  public s: number = 100

  /**
   * Player critter type.
   * 
   * @public
   */
  public c: string = 'hamster'

  /**
   * Current room the player is in.
   * 
   * @public
   */
  public room!: IRoom

  /**
   * Initializes the player events.
   * 
   * @protected
   */
  protected abstract initialize(): void

  /**
   * Constructor.
   * 
   * @constructor
   */
  protected constructor () {
    super()

    this.initialize()
  }

  /**
   * Returns the gear of the player.
   *
   * @public
   */
  public getGear (): IPlayerGear {
    return {
      cape: this.cape,
      mask: this.mask,
      ears: this.ears,
      body: this.body,
      head: this.head,
    }
  }

  /**
   * Returns the crumps of the player.
   *
   * @public
   */
  public getCrumbs (): IPlayerCrumbs {
    return {
      g: this.getGear(),
      i: this.id.toString(),
      n: this.nickname,
      nicknameColor: this.nicknameColor,
      c: this.c,
      x: this.x,
      y: this.y,
      r: this.r,
      s: this.s,
    }
  }
}
