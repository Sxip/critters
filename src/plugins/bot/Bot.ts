import { IEntityPlayer } from '@/game/entities/IEntityPlayer'
import { PlayerBase } from '@/game/entities/player/Base'
import { ChatEvent, IChatEvent } from '@/game/events/player/ChatEvent'
import { IMoveEvent, MoveEvent } from '@/game/events/player/MoveEvent'

/**
 * Bot options interface.
 * 
 * @interface
 */
export interface IBotOptions {
  readonly id: number
  readonly nickname?: string
  readonly defaultX: number
  readonly defaultY: number
  readonly sender: IEntityPlayer
}

export class Bot extends PlayerBase {
  /**
   * Player Nickname color.
   * 
   * @public
   */
  public readonly nicknameColor = 'orange'

  /**
   * Chat event.
   * 
   * @private
   */
  private readonly sender!: IEntityPlayer

  /**
   * Default x coordinate
   * 
   * @private
   */
  private readonly defaultX!: number

  /**
   * Default y coordinate
   * 
   * @private
   */
  private readonly defaultY!: number

  /**
   * Player equipment.
   * 
   * @public
   */
  public readonly body = 'monk'
  public readonly head = 'pot'

  /**
   * Constructor.
   * 
   * @param param0 
   * @constructor
   */
  public constructor ({
    id,
    nickname = 'bot',
    defaultX,
    defaultY,
    sender,
  }: IBotOptions) {
    super()

    this.id = id
    this.nickname = nickname

    this.defaultX = defaultX
    this.defaultY = defaultY
    this.sender = sender
  }

  /**
   * Initializes the player events.
   * 
   * @protected
   */
  protected initialize () {
    this.on(ChatEvent, this.onChat.bind(this))
    this.on(MoveEvent, this.onMove.bind(this))
  }

  /**
   * Handles the chat event.
   * 
   * @param event 
   * @private
   */
  private onChat (event: IChatEvent): void {
    if (event.sender !== this && !(event.sender instanceof Bot)) {
      this.sendMessage('you said: ' + event.message)
    }
  }

  /**
   * Handles the move event.
   * 
   * @param botEvent 
   * @private
   */
  private onMove (event: IMoveEvent): void {
    if (event.sender === this.sender) {
      this.move(
        event.x + this.defaultX,
        event.y + this.defaultY,
        event.r
      )
    }
  }
}
