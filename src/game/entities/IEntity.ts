import { EventEmitter } from 'events'
import { IRoom } from '../rooms/IRoom'

/**
 * Player gear interface.
 * 
 * @interface
 */
export interface IPlayerGear {
  cape?: string
  mask?: string
  ears?: string
  body?: string
  head?: string
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
