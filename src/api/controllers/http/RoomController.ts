import { RoomService } from '@/api/services/RoomService'
import { HTTP_STATUS_CODE } from '@/shared/builders/response/BaseApiResponse'
import { ErrorResponse } from '@/shared/builders/response/ErrorResponse'
import { SuccessResponse } from '@/shared/builders/response/SuccessResponse'
import { Response } from 'express'
import { Get, JsonController, Param, Res } from 'routing-controllers'

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
    try {
      const room = this.roomService.findWithPlayers(id)

      return new SuccessResponse(response)
        .withData(room)
        .build()
    } catch (error) {
      return new ErrorResponse(response)
        .withError(error.message)
        .withStatus(HTTP_STATUS_CODE.NOT_FOUND)
        .build()
    }
  }
}
