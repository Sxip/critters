import { IEntityPlayer } from '@game/entities/IEntityPlayer'

export const UpdateGearEvent = 'update-gear-event'

export interface IUpdateGearEvent {
  sender: IEntityPlayer
  g: string[]
}

