import { Player } from '@/game/entities/player'
import { IncomingChatMessage } from '@/game/messages/incoming/chat'
import { IncomingLoginMessage } from '@/game/messages/incoming/login'
import { IncomingMovementMessage } from '@/game/messages/incoming/move'
import { IncomingJoinMessage } from '@/game/messages/incoming/room/IncomingJoinMessage'
import { PlayerSocket } from '@/types/PlayerSocket'
import { UserRepository } from '@repositories/user/UserRepository'
import { RoomService } from '@services/RoomService'
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
    private readonly roomService: RoomService
  ) { }

  /**
   * Handles incoming connections.
   *
   * @param socket
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
   */
  @OnMessage('login')
  public async login (@ConnectedSocket() socket: PlayerSocket, @MessageBody() message: IncomingLoginMessage): Promise<void> {
    this.logger.warn(`${socket.id} login request with ticket ${message.ticket}`)

    try {
      const user = await this.userRepository.findByTicket(message.username, message.ticket)
      this.logger.info(`Successfully authenticated ticket ${message.ticket} for user ${user.nickname}`)

      socket.player.model(user).login()
    } catch (error) {
      this.logger.error(`Failed authenticating ticket ${message.ticket} ${error.message}`)
    }
  }

  /**
  * Handles room joining.
  *
  * @param socket
  */
  @OnMessage('joinRoom')
  public join (@ConnectedSocket() socket: PlayerSocket, @MessageBody() message: IncomingJoinMessage): void {
    this.logger.info(`Room join request from ${socket.player.nickname} room: ${message.roomId}`)

    const room = this.roomService.find(message.roomId)
    if (room) room.add(socket.player, 0, 0, 0)
  }

  /**
   * Handles player messages.
   *
   * @param socket
   * @param movement
   */
  @OnMessage('sendMessage')
  public sendMessage (@ConnectedSocket() socket: PlayerSocket, @MessageBody() message: IncomingChatMessage): void {
    this.logger.info(`Chat request from ${socket.player.nickname} ${JSON.stringify(message)}`)

    socket.player.sendMessage(message.message)
  }

  /**
   * Handles movement.
   *
   * @param socket
   * @param movement
   */
  @OnMessage('click')
  public click (@ConnectedSocket() socket: PlayerSocket, @MessageBody() movement: IncomingMovementMessage): void {
    this.logger.info(`Movement request from ${socket.player.nickname} ${JSON.stringify(movement)}`)

    socket.player.move(movement.x, movement.y, movement.r)
  }

  /**
   * Handles disconnection of the player.
   *
   * @param socket
   */
  @OnDisconnect()
  public disconnect (@ConnectedSocket() socket: PlayerSocket): void {
    this.logger.warn(`Disconnection request from ${socket.player.nickname}`)

    if (socket.player.room) socket.player.room.remove(socket.player)
    socket.disconnect()
  }
}
