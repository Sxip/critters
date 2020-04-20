import { IPlayerGear } from '@/game/entities/IEntity';

export interface IGearMessage {
  readonly i: string
  readonly g: IPlayerGear
}
