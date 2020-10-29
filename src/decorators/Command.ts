import { PluginManager } from '@/shared/PluginManager'

/**
 * Command information interface.
 *
 * @interface
 */
export interface ICommandInformation {
  readonly name: string
  readonly target: string
  readonly method: string
}

/**
 * Command decorator.
 *
 * @param name
 * @function
 */
export function Command (name: string): MethodDecorator {
  return (target, method) => PluginManager.loadCommand({
    name,
    target: target.constructor.name,
    method: method.toString(),
  })
}
