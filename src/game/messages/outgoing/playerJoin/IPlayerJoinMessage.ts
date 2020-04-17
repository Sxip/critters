import { IPlayerGear } from '@/game/entities/IEntity';

export interface IPlayerJoinMessage {
  readonly i: string
  readonly n: string
  readonly g: IPlayerGear
  readonly nicknameColor: string
  readonly c: string
  readonly x: number
  readonly y: number
  readonly r: number
  readonly s: number
}
