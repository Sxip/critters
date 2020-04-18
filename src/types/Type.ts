/**
 * Produces an new instance of the type.
 * 
 * @interface
 */
export interface IType<T> {
  new(...args: unknown[]): T
}
