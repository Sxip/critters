import { User } from '@/database/models/User'
import { IJoinEvent, JoinEvent } from '@/game/events/JoinEvent'
import { OutgoingLoginMessage } from '@/game/messages/outgoing/login'
import { OutgoingPlayerJoinMessage } from '@/game/messages/outgoing/playerJoin/OutgoingPlayerJoinMessage'
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
    return this
  }

  /**
   * Sends a event to the player socket.
   * 
   * @param event 
   * @param packet 
   */
  public sendToSocket (event: string, message: object) {
    return this.socket.emit(event, classToPlain(message))
  }

  /**
   * Emits the login event to the player socket.
   * 
   * @public
   */
  public login () {
    return this.sendToSocket('login', new OutgoingLoginMessage({
      playerId: this.id.toString(),
      nickname: this.nickname,
      critterId: this.c,
      inventory: [],
      gear: {},
      coins: 0,
      gems: 0,
    }))
  }

  /**
   * Emits the join room event to the player socket.
   * 
   * @
   */
  public onJoinRoom (event: IJoinEvent): void {
    if (event.player !== this) this.sendToSocket('A', new OutgoingPlayerJoinMessage(
      event.player.getCrumbs()
    ))
    else {
      const PlayerCrumbs: IPlayerCrumbs[] = []

      for (const player of event.room.players) PlayerCrumbs.push(player.getCrumbs())

      this.sendToSocket('joinRoom', new OutgoingJoinMessage({
        RoomId: event.room.id,
        PlayerCrumbs,
      }))
    }
  }
}
