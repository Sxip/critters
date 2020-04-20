import { EventEmitter } from 'events'
import { IRoom } from '../rooms/IRoom'

/**
 * Player gear interface.
 * 
 * @interface
 */
export interface IPlayerGear {
  cape?: string | null
  mask?: string | null
  ears?: string | null
  body?: string | null
  head?: string | null
}

/**
 * Player crumps interface.
 * 
 * @interface
 */
export interface IPlayerCrumbs {
  g: IPlayerGear
  i: string
  n: string
  nicknameColor: string
  c: string
  x: number
  y: number
  r: number
  s: number
}

/**
 * Entity interface.
 *
 * @interface
 */
export default interface IEntity extends EventEmitter {
  id: number
  x: number
  y: number
  r: number
  s: number
  c: string
  room: IRoom

  getGear(): IPlayerGear
  getCrumbs(): IPlayerCrumbs
}
