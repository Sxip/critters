/**
 * Login message interface.
 * 
 * @interface
 */
export interface ILoginMessage {
  playerId: string
  nickname: string
  critterId: string
  inventory: object[]
  gear: object
  coins: number
  gems: number
}
