import { PluginManager } from '@/shared/PluginManager'
import { IType } from '@/types/Type'

/**
 * Plugin information interface.
 * 
 * @interface
 */
export interface IPluginInformation {
  readonly name: string
  readonly description?: string
}

/**
 * The plugin that has been loaded.
 * 
 * @interface
 */
export interface ILoadedPlugin<T> extends IPluginInformation {
  target: IType<T>
}

/**
 * The information about a plugin.
 * 
 * @interface
 */
export interface IPlugin<T> {
  readonly instance: T
  readonly information: ILoadedPlugin<T>
}

/**
 * Plugin decorator.
 * 
 * @param plugin 
 * @function
 */
export function Plugin (plugin: IPluginInformation): ClassDecorator {
  return (target: any) => PluginManager.loadPlugin({
    name: plugin.name,
    description: plugin.description,
    target,
  })
}
