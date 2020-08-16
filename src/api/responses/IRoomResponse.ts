import { IEntityPlayer } from '@/game/entities/IEntityPlayer'

export interface IRoomResponse {
  readonly id: string
  readonly players: IPlayerResponse[]
}

export interface IPlayerResponse {
  readonly id: number
  readonly nickname: string
  readonly x: number
  readonly y: number
}
