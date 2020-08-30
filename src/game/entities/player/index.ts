import { UserService } from '@/api/services/UserService'
import { User } from '@/database/models/User'
import { ChatEvent, IChatEvent } from '@/game/events/player/ChatEvent'
import { IMoveEvent, MoveEvent } from '@/game/events/player/MoveEvent'
import { IUpdateGearEvent, UpdateGearEvent } from '@/game/events/player/UpdateGearEvent'
import { IJoinEvent, JoinEvent } from '@/game/events/room/JoinEvent'
import { ILeaveEvent, LeaveEvent } from '@/game/events/room/LeaveEvent'
import { IncomingUpdateGearMessage } from '@/game/messages/incoming/gear'
import { OutgoingMessagesTypes } from '@/game/messages/outgoing'
import { OutgoingChatMessage } from '@/game/messages/outgoing/chat'
import { OutgoingGearMessage } from '@/game/messages/outgoing/gear'
import { OutgoingLoginMessage } from '@/game/messages/outgoing/login'
import { OutgoingMovementMessage } from '@/game/messages/outgoing/move'
import { OutgoingPlayerJoinMessage } from '@/game/messages/outgoing/playerJoin/OutgoingPlayerJoinMessage'
import { OutgoingPlayerLeaveMessage } from '@/game/messages/outgoing/playerLeave/OutgoingPlayerJoinMessage'
import { OutgoingJoinMessage } from '@/game/messages/outgoing/room/OutgoingJoinMessage'
import { PlayerSocket } from '@/types/PlayerSocket'
import { IPlayerCrumbs, IPlayerGear } from '@game/entities/IEntity'
import { classToPlain } from 'class-transformer'
import Container from 'typedi'
import { PlayerBase } from './Base'

export class Player extends PlayerBase {
  /**
   * Constructor.
   * 
   * @param socket 
   * @param userService 
   * @constructor
   */
  public constructor (
    public readonly socket: PlayerSocket,
    public readonly userService: UserService = Container.get(UserService)
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
    this.on(UpdateGearEvent, this.onUpdateGear.bind(this))
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
    this.c = user.mascot
    this.coins = user.coins
    this.gems = user.gems

    // Current equipped items
    this.head = user.head?.itemId
    this.body = user.body?.itemId
    this.mask = user.eyes?.itemId
    this.mask = user.body?.itemId

    for (const item of user.inventory) {
      this.inventory.add({
        uid: item.id.toString(),
        itemId: item.item.id.toString(),
        slot: item.item.slot,
        uses: item.item.uses,
      })
    }
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
    this.sendToSocket(OutgoingMessagesTypes.LOGIN, new OutgoingLoginMessage({
      playerId: this.id.toString(),
      nickname: this.nickname,
      critterId: this.c,
      inventory: this.inventory.getInventoryItems(),
      nicknameColor: this.nicknameColor,
      gear: this.getGear(),
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
      this.sendToSocket(OutgoingMessagesTypes.PLAYER_JOIN, new OutgoingPlayerJoinMessage(
        event.player.getCrumbs()
      ))
    } else {
      const playerCrumbs: IPlayerCrumbs[] = []

      for (const player of event.room.players) playerCrumbs.push(player.getCrumbs())

      this.sendToSocket(OutgoingMessagesTypes.JOIN_ROOM, new OutgoingJoinMessage({
        roomId: event.room.id,
        playerCrumbs,
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
    this.sendToSocket(OutgoingMessagesTypes.MOVEMENT, new OutgoingMovementMessage({
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
    this.sendToSocket(OutgoingMessagesTypes.CHAT, new OutgoingChatMessage({
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
    this.sendToSocket(OutgoingMessagesTypes.PLAYER_LEFT, new OutgoingPlayerLeaveMessage({
      i: event.player.id,
    }))
  }

  /**
   * Emits the update gear event to the player socket.
   * 
   * @param event 
   * @private
   */
  private onUpdateGear (event: IUpdateGearEvent): void {
    if (event.sender === this) {
      this.sendToSocket(OutgoingMessagesTypes.UPDATE_GEAR, event.sender.getGear())
    }

    this.socket.emit(OutgoingMessagesTypes.GEAR, new OutgoingGearMessage({
      i: event.sender.id.toString(),
      g: event.sender.getGear(),
    }))
  }

  /**
   * Updates the player gear.
   * 
   * @param update 
   * @public
   */
  public async updateGear (update: IncomingUpdateGearMessage): Promise<void> {
    const userGear: IPlayerGear = {}
    const userGearAny = userGear as any
    const thisAny = this as any

    const event: IUpdateGearEvent = {
      sender: this,
      g: [],
    }

    for (const itemId of update) {
      const item = this.inventory.validateGearUpdate(itemId)

      if (!item) continue

      userGearAny[item.slot] = item.uid
      thisAny[item.slot] = item.itemId
      event.g.push(item.itemId)
    }

    if (!userGear.mask) {
      userGear.mask = null
      this.mask = undefined
    }

    if (!userGear.ears) {
      userGear.ears = null
      this.ears = undefined
    }

    if (!userGear.body) {
      userGear.body = null
      this.body = undefined
    }

    if (!userGear.head) {
      userGear.head = null
      this.head = undefined
    }

    await this.userService.updateGear(this.id, userGear)
    this.room.broadcast(UpdateGearEvent, event)
  }
}
