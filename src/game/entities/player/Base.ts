import { ChatEvent, IChatEvent } from '@/game/events/ChatEvent'
import { IMoveEvent, MoveEvent } from '@/game/events/MoveEvent'
import { IRoom } from '@/game/rooms/IRoom'
import { EventEmitter } from 'events'
import { IPlayerCrumbs, IPlayerGear } from '../IEntity'
import { IEntityPlayer } from '../IEntityPlayer'
import { IInventory } from './inventory/IInventory'
import { Inventory } from './inventory/Inventory'

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
  public cape?: string
  public mask?: string
  public ears?: string
  public body?: string
  public head?: string

  /**
   * Coordinates of the player.
   * 
   * @public
   */
  public x: number = 0
  public y: number = 0
  public r: number = 0

  /**
   * Player coins.
   * 
   * @public
   */
  public coins: number = 0

  /**
   * Player gems.
   * 
   * @public
   */
  public gems: number = 0

  /**
   * Size of the player.
   * 
   * @public
   */
  public readonly s: number = 100

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
   * Player inventory.
   * 
   * @public
   */
  public readonly inventory: IInventory = new Inventory()

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

  /**
   * Broadcasts the movement event to the room.
   * 
   * @param x 
   * @param y 
   * @param r 
   * @public
   */
  public move (x: number, y: number, r: number): void {
    const event: IMoveEvent = {
      sender: this,
      x,
      y,
      r,
    }

    this.room.broadcast(MoveEvent, event)

    this.x = x
    this.y = y
    this.r = r
  }

  /**
   * Broadcasts the chat event to the room.
   * 
   * @param message 
   * @public
   */
  public sendMessage (message: string): void {
    const event: IChatEvent = {
      sender: this,
      message,
    }

    this.room.broadcast(ChatEvent, event)
  }
}
