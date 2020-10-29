import { Room } from '@/game/rooms'
import { IRoom } from '@/game/rooms/IRoom'
import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { RoomRepository } from '../repositories/room/RoomRepository'
import { IPlayerResponse, IRoomResponse } from '../responses/IRoomResponse'

@Service()
export class RoomService {
  /**
   * Map with all the current rooms.
   * 
   * @public
   */
  public readonly rooms: Map<string, IRoom> = new Map<string, IRoom>()

  /**
   * Constructor.
   * 
   * @param roomRepository
   * @constructor
   */
  public constructor (
    @InjectRepository() public readonly roomRepository: RoomRepository
  ) {}

  /**
   * Loads all of the rooms.
   * 
   * @public
   */
  public async load (): Promise<void> {
    const rooms = await this.roomRepository.findAllRooms()
    for (const room of rooms) {
      this.rooms.set(room.id, new Room(
        room.id,
        room.startX,
        room.startY,
        room.startR,
        room.triggers,
      ))
    }
  }

  /**
   * Finds a room by its id.
   * 
   * @param id 
   * @public
   */
  public find (id: string): IRoom | undefined {
    return this.rooms.get(id)
  }

  /**
   * Finds a room by its id including players.
   * 
   * @param id 
   * @public
   */
  public findWithPlayers (id: string): IRoomResponse {
    const room = this.find(id)
    if (!room) throw new Error('Room could not be found.')

    const players: IPlayerResponse[] = []

    for (const critter of room.players) {
      players.push({
        id: critter.id,
        nickname: critter.nickname,
        x: critter.x,
        y: critter.y,
      })
    }

    return {
      id: room.id,
      players,
    }
  }
}
