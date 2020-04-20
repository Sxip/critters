import { IEntityPlayer } from '@game/entities/IEntityPlayer'

export const UpdateGearEvent = 'update-gear-event'

export interface IUpdateGearEvent {
  sender: IEntityPlayer
  cape?: string
  mask?: string
  ears?: string
  body?: string
  head?: string
}

