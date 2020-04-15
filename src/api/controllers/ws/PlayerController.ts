import { Player } from '@/game/entities/player'
import { IncomingLoginMessage } from '@/game/messages/incoming/login'
import { IncomingJoinMessage } from '@/game/messages/incoming/room/IncomingJoinMessage'
import { PlayerSocket } from '@/types/PlayerSocket'
import { UserRepository } from '@repositories/user/UserRepository'
import { RoomService } from '@services/RoomService'
import { getLogger, Logger } from 'log4js'
import { ConnectedSocket, MessageBody, OnConnect, OnMessage, SocketController } from 'socket-controllers'
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
}
