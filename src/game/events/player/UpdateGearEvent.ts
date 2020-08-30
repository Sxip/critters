import { IEntityPlayer } from '@game/entities/IEntityPlayer'

export const UpdateGearEvent = 'update-gear'

export interface IUpdateGearEvent {
  sender: IEntityPlayer
  g: string[]
}

