import { IPlayerGear } from '@/game/entities/IEntity'
import { IPlayerDataMessage } from './IPlayerDataMessage'

export class OutgoingPlayerDataMessage implements IPlayerDataMessage {
  public readonly gear: IPlayerGear

  public constructor (data: IPlayerDataMessage) {
    this.gear = data.gear
  }
}
