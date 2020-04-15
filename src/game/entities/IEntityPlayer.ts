import IEntity from './IEntity';

/**
 * Hamster interface.
 *
 * @interface
 */
export interface IEntityPlayer extends IEntity {
  nickname: string
  nicknameColor: string
  cape?: string
  mask?: string
  ears?: string
  body?: string
  head?: string
}
