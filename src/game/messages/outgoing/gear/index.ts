import { IPlayerGear } from '@/game/entities/IEntity'
import { IGearMessage } from './IGearMessage'

export class OutgoingGearMessage implements IGearMessage {
  public readonly i: string
  public readonly g: IPlayerGear

  public constructor (data: IGearMessage) {
    this.i = data.i
    this.g = data.g
  }
}
