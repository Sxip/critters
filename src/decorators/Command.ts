import { PluginManager } from '@/core/PluginManager'

export interface ICommandInformation {
  readonly name: string
  readonly target: string
  readonly method: string
}

export function Command (name: string): MethodDecorator {
  return (target, method) => PluginManager.loadCommand({
    name,
    target: target.constructor.name,
    method: method.toString(),
  })
}
