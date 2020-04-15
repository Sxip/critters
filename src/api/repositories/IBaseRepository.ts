import { SaveOptions } from 'typeorm';

/**
 * Base repository interface.
 *
 * @interface
 */
export interface IBaseRepository<T> {
  find(): Promise<T[]>
  save(entity: T, options?: SaveOptions): void
  delete(uuid: string): void
}
