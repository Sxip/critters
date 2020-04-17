import { User } from '@/database/models/User'
import { ChatEvent, IChatEvent } from '@/game/events/ChatEvent'
import { IJoinEvent, JoinEvent } from '@/game/events/JoinEvent'
import { ILeaveEvent, LeaveEvent } from '@/game/events/LeaveEvent'
import { IMoveEvent, MoveEvent } from '@/game/events/MoveEvent'
import { OutgoingChatMessage } from '@/game/messages/outgoing/chat'
import { OutgoingLoginMessage } from '@/game/messages/outgoing/login'
import { OutgoingMovementMessage } from '@/game/messages/outgoing/move'
import { OutgoingPlayerJoinMessage } from '@/game/messages/outgoing/playerJoin/OutgoingPlayerJoinMessage'
import { OutgoingPlayerLeaveMessage } from '@/game/messages/outgoing/playerLeave/OutgoingPlayerJoinMessage'
import { OutgoingJoinMessage } from '@/game/messages/outgoing/room/OutgoingJoinMessage'
import { PlayerSocket } from '@/types/PlayerSocket'
import { IPlayerCrumbs } from '@game/entities/IEntity'
import { classToPlain } from 'class-transformer'
import { PlayerBase } from './Base'

export class Player extends PlayerBase {
  /**
   * Constructor.
   * 
   * @constructor
   */
  public constructor (
    public readonly socket: PlayerSocket
  ) {
    super()
  }

  /**
   * Initializes the player events.
   * 
   * @protected
   */
  protected initialize (): void {
    this.on(JoinEvent, this.onJoinRoom.bind(this))
    this.on(LeaveEvent, this.onLeaveRoom.bind(this))
    this.on(MoveEvent, this.onMove.bind(this))
    this.on(ChatEvent, this.onChat.bind(this))
  }

  /**
   * Models the the player data.
   * 
   * @param user 
   * @public
   */
  public model (user: User): this {
    this.id = user.id
    this.nickname = user.nickname
    this.nicknameColor = user.nicknameColor
    this.c = user.critterId
    this.coins = user.coins
    this.gems = user.gems

    // Current equipped items
    this.head = user.head?.itemId
    this.mask = user.eyes?.itemId
    this.mask = user.body?.itemId
    return this
  }

  /**
   * Sends a event to the player socket.
   * 
   * @param event 
   * @param packet 
   */
  public sendToSocket (event: string, message: object): boolean {
    return this.socket.emit(event, classToPlain(message))
  }

  /**
   * Emits the login event to the player socket.
   * 
   * @public
   */
  public login (): void {
    this.sendToSocket('login', new OutgoingLoginMessage({
      playerId: this.id.toString(),
      nickname: this.nickname,
      critterId: this.c,
      inventory: [],
      nicknameColor: this.nicknameColor,
      gear: {},
      coins: this.coins,
      gems: this.gems,
    }))
  }

  /**
   * Emits the join room event to the player socket.
   * 
   * @param event 
   * @private
   */
  private onJoinRoom (event: IJoinEvent): void {
    if (event.player !== this) {
      this.sendToSocket('A', new OutgoingPlayerJoinMessage(
        event.player.getCrumbs()
      ))
    } else {
      const PlayerCrumbs: IPlayerCrumbs[] = []

      for (const player of event.room.players) PlayerCrumbs.push(player.getCrumbs())

      this.sendToSocket('joinRoom', new OutgoingJoinMessage({
        RoomId: event.room.id,
        PlayerCrumbs,
      }))
    }
  }

  /**
   * Emits the movement event to the player socket.
   * 
   * @param event 
   * @private
   */
  private onMove (event: IMoveEvent): void {
    this.sendToSocket('X', new OutgoingMovementMessage({
      i: event.sender.id,
      x: event.x,
      y: event.y,
      r: event.r,
    }))
  }

  /**
   * Emits the chat event to the player socket.
   * 
   * @param event 
   * @private
   */
  private onChat (event: IChatEvent): void {
    this.sendToSocket('M', new OutgoingChatMessage({
      i: event.sender.id,
      n: event.sender.nickname,
      m: event.message,
    }))
  }

  /**
   * Emits the room leave event to the player socket.
   * 
   * @param event 
   * @private
   */
  private onLeaveRoom (event: ILeaveEvent): void {
    this.sendToSocket('R', new OutgoingPlayerLeaveMessage({
      i: event.player.id,
    }))
  }
}
