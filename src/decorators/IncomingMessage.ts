import { PluginManager } from '@/core/PluginManager'

/**
 * Incoming message information interface.
 *
 * @interface
 */
export interface IIncomingMessageInformation {
  readonly type: string
  readonly target: string
  readonly method: string
}

/**
 * Incoming message decorator.
 *
 * @param name
 * @function
 */
export function IncomingMessage (type: string): MethodDecorator {
  return (target, method) => PluginManager.loadIncomingMessage({
    type,
    target: target.constructor.name,
    method: method.toString(),
  })
}
