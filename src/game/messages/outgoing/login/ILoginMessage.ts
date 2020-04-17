import { IItem } from '@/game/items/IItem'

/**
 * Login message interface.
 * 
 * @interface
 */
export interface ILoginMessage {
  readonly playerId: string
  readonly nickname: string
  readonly nicknameColor: string
  readonly critterId: string
  readonly inventory: IItem[]
  readonly gear: object
  readonly coins: number
  readonly gems: number
}
