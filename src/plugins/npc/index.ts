import { RoomService } from '@/api/services/RoomService'
import { Plugin } from '@/decorators/Plugin'
import Container from 'typedi'
import { Mike } from './Mike'

@Plugin({
  name: 'Mike',
  description: 'Creates a mike npc.',
})
export default class NpcMike {
  /**
   * Constructor.
   * 
   * @constructor
   */
  public constructor (
    private readonly roomsService: RoomService = Container.get(RoomService)
  ) {}

  /**
   * Initialize the plugin.
   * 
   * @public
   */
  public initialize (): void {
    const room = this.roomsService.find('port')
    if (room) room.add(new Mike(), 880, 203, 180)
  }
}
