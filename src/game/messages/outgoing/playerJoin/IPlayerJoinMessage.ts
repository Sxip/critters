import { IPlayerGear } from '@/game/entities/IEntity';

export interface IPlayerJoinMessage {
  i: string
  n: string
  g: IPlayerGear
  nicknameColor: string
  c: string
  x: number
  y: number
  r: number
  s: number
}
