import { JsonController, Get, Param, Res } from 'routing-controllers'
import { RoomService } from '@/api/services/RoomService'
import { Response } from 'express'
import { ApiErrorResponse } from '@/util/ErrorApiResponse'
import { SuccessApiResponse } from '@/util/SuccessApiResponse'
import { IRoomResponse, IPlayerResponse } from '@/api/responses/IRoomResponse'

@JsonController('/api/room')
export class RoomController {
  /**
   * Constructor.
   *
   * @param roomService
   * @constructor
   */
  public constructor (
    private readonly roomService: RoomService
  ) { }

  /**
   * Returns the information about a room.
   * 
   * @param response
   * @param id
   * @public
   */
  @Get('/:id')
  public async room (@Res() response: Response, @Param('id') id: string): Promise<Response> {
    console.log
    const room = this.roomService.find(id)

    if (!room) {
      return new ApiErrorResponse(response)
        .withError('Room not found.')
        .build()
    }

    const players: IPlayerResponse[] = []

    for (const critter of room.players) {
      players.push({
        id: critter.id,
        nickname: critter.nickname,
        x: critter.x,
        y: critter.y,
      })
    }

    return new SuccessApiResponse(response)
      .withData({
        id: room.id,
        players,
      } as IRoomResponse)
      .build()
  }
}
