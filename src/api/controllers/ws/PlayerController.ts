import { UserRepository } from '@/api/repositories/user/UserRepository'
import { RoomService } from '@/api/services/RoomService'
import { ShopService } from '@/api/services/ShopService'
import { PluginManager } from '@/core/PluginManager'
import { Player } from '@/game/entities/player'
import { IncomingMessagesTypes } from '@/game/messages/incoming'
import { IncomingChatMessage } from '@/game/messages/incoming/chat'
import { IncomingCodeMessage } from '@/game/messages/incoming/code'
import { IncomingUpdateGearMessage } from '@/game/messages/incoming/gear'
import { IncomingLoginMessage } from '@/game/messages/incoming/login'
import { IncomingMovementMessage } from '@/game/messages/incoming/move'
import { IncomingJoinMessage } from '@/game/messages/incoming/room/IncomingJoinMessage'
import { IncomingShopMessage } from '@/game/messages/incoming/shop'
import { OutgoingShopMessage } from '@/game/messages/outgoing/shop'
import { PlayerSocket } from '@/types/PlayerSocket'
import { getLogger, Logger } from 'log4js'
import { ConnectedSocket, MessageBody, OnConnect, OnDisconnect, OnMessage, SocketController } from 'socket-controllers'
import { InjectRepository } from 'typeorm-typedi-extensions'

@SocketController()
export class PlayerController {
  /**
   * Reference to the logger.
   *
   * @private
   */
  private readonly logger: Logger = getLogger('PlayerController')

  /**
   * Constructor.
   *
   * @constructor
   */
  public constructor (
    @InjectRepository() private readonly userRepository: UserRepository,
    private readonly roomService: RoomService,
    private readonly shopService: ShopService
  ) { }

  /**
   * Handles incoming connections.
   *
   * @param socket
   * @public
   */
  @OnConnect()
  public connection (@ConnectedSocket() socket: PlayerSocket): void {
    this.logger.info(`Incoming connection from ${socket.conn.remoteAddress}`)

    socket.player = new Player(socket)
  }

  /**
   * Authenticates a user.
   *
   * @param socket
   * @param message
   * @public
   */
  @OnMessage(IncomingMessagesTypes.LOGIN)
  public async login (@ConnectedSocket() socket: PlayerSocket, @MessageBody() message: IncomingLoginMessage): Promise<void> {
    this.logger.warn(`${socket.id} login request with ticket ${message.ticket}`)

    PluginManager.handleIncomingMessage(IncomingMessagesTypes.LOGIN, message, socket.player)

    try {
      const user = await this.userRepository.findByTicket(message.nickname, message.ticket)
      this.logger.info(`Successfully authenticated ticket ${message.ticket} for user ${user.nickname}`)

      socket.player.model(user).login()
    } catch (error) {
      this.logger.error(`Failed authenticating ticket ${message.ticket} ${error.message}`)
    }
  }

  /**
   * Handles room lobby joining.
   * 
   * @param socket 
   * @public
   */
  @OnMessage(IncomingMessagesTypes.JOIN_LOBBY)
  public lobby (@ConnectedSocket() socket: PlayerSocket): void {
    const room = this.roomService.find('port')

    if (room) room.add(socket.player, room.startX, room.startY)
  }

  /**
  * Handles room joining.
  *
  * @param socket
  * @param message
  * @public
  */
  @OnMessage(IncomingMessagesTypes.JOIN_ROOM)
  public join (@ConnectedSocket() socket: PlayerSocket, @MessageBody() message: IncomingJoinMessage): void {
    this.logger.info(`Room join request from ${socket.player.nickname} room: ${message.roomId}`)

    PluginManager.handleIncomingMessage(IncomingMessagesTypes.JOIN_ROOM, message, socket.player)

    const room = this.roomService.find(message.roomId)
    if (room) room.add(socket.player, room.startX, room.startY, 0)
  }

  /**
   * Handles player messages.
   *
   * @param socket
   * @param message
   * @public
   */
  @OnMessage(IncomingMessagesTypes.CHAT)
  public sendMessage (@ConnectedSocket() socket: PlayerSocket, @MessageBody() message: IncomingChatMessage): void {
    this.logger.info(`Chat request from ${socket.player.nickname} ${JSON.stringify(message)}`)

    PluginManager.handleIncomingMessage(IncomingMessagesTypes.CHAT, message, socket.player)

    socket.player.sendMessage(message.message)
  }

  /**
   * Handles movement.
   *
   * @param socket
   * @param movement
   */
  @OnMessage(IncomingMessagesTypes.MOVE_TO)
  public click (@ConnectedSocket() socket: PlayerSocket, @MessageBody() message: IncomingMovementMessage): void {
    this.logger.info(`Movement request from ${socket.player.nickname} ${JSON.stringify(message)}`)

    PluginManager.handleIncomingMessage(IncomingMessagesTypes.MOVE_TO, message, socket.player)

    socket.player.move(message.x, message.y, message.r)
  }

  /**
   * Handles shop load.
   *
   * @param socket
   * @param message
   */
  @OnMessage(IncomingMessagesTypes.SHOP)
  public async shop (@ConnectedSocket() socket: PlayerSocket, @MessageBody() message: IncomingShopMessage): Promise<void> {
    this.logger.info(`Shop load ${message.id} request from ${socket.player.nickname}`)

    PluginManager.handleIncomingMessage(IncomingMessagesTypes.SHOP, message.id, socket.player)

    const shop = await this.shopService.find(message.id)
    if (shop) {
      socket.player.sendToSocket('getShop', new OutgoingShopMessage({
        collection: shop.collections.map(c => c.item.id) || [],
        freeItem: shop.free.id,
        nextItem: shop.next.id,
        lastItem: shop.last.id,
      }))
    }
  }

  /**
   * Handles commands.
   * 
   * @param socket 
   * @param message
   * @public
   */
  @OnMessage(IncomingMessagesTypes.CODE)
  public code (@ConnectedSocket() socket: PlayerSocket, @MessageBody() message: IncomingCodeMessage) {
    this.logger.info(`Command ${message.code} request from ${socket.player.nickname}`)

    PluginManager.handleCommand({
      sender: socket.player,
      code: message.code,
      options: message.options,
    })
  }

  /**
   * Handles room triggers.
   *
   * @param socket
   */
  @OnMessage(IncomingMessagesTypes.TRIGGER)
  public trigger (@ConnectedSocket() socket: PlayerSocket) {
    PluginManager.handleIncomingMessage(IncomingMessagesTypes.TRIGGER, {}, socket.player)

    socket.player.room.trigger(socket.player)
  }

  /**
   * Handles gear update.
   *
   * @param socket
   * @param gear
   */
  @OnMessage(IncomingMessagesTypes.UPDATE_GEAR)
  public update (@ConnectedSocket() socket: PlayerSocket, @MessageBody() gear: IncomingUpdateGearMessage): void {
    PluginManager.handleIncomingMessage(IncomingMessagesTypes.UPDATE_GEAR, gear, socket.player)

    socket.player.updateGear(gear)
  }

  /**
   * Handles custom messages.
   *
   * @param socket
   * @param message
   */
  @OnMessage(IncomingMessagesTypes.CUSTOM)
  public custom (@ConnectedSocket() socket: PlayerSocket, @MessageBody() message: any): void {
    PluginManager.handleIncomingMessage(IncomingMessagesTypes.CUSTOM, message, socket.player)
  }

  /**
   * Handles disconnection of the player.
   *
   * @param socket
   */
  @OnDisconnect()
  public disconnect (@ConnectedSocket() socket: PlayerSocket): void {
    this.logger.warn(`Disconnection request from ${socket.id}`)

    if (socket.player.room) socket.player.room.remove(socket.player)
    socket.disconnect()
  }
}
