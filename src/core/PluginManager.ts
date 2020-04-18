import { ICommandInformation } from '@/decorators/Command'
import { ILoadedPlugin, IPlugin } from '@/decorators/Plugin'
import { ICodeEvent } from '@/game/events/CodeEvent'
import { readdir, stat } from 'fs'
import { getLogger, Logger } from 'log4js'
import * as path from 'path'
import { promisify } from 'util'

export class PluginManager {
  /**
   * Plugins path.
   * 
   * @public
   */
  public static readonly PATH: string = path.join(__dirname, '..', 'plugins')
  /**
   * Reference to the logger.
   * 
   * @public
   */
  private static readonly logger: Logger = getLogger('PluginManager')

  /**
   * Stores a map of the loaded plugins,
   * 
   * @public
   */
  public static readonly plugins: Map<string, IPlugin<any>> = new Map<string, IPlugin<any>>()

  /**
   * Stores a map of the loaded commands,
   * 
   * @public
   */
  public static readonly commands: Map<string, ICommandInformation> = new Map<string, ICommandInformation>()

  /**
   * Loads all of the plugins.
   * 
   * @public
   */
  public static async loadAll (): Promise<void> {
    const paths = await promisify(readdir)(this.PATH)

    for (const path of paths) {
      if (!((await promisify(stat)(this.PATH)).isDirectory())) continue

      // Todo: check the file extensions
      await import(`${this.PATH}/${path}`)
    }
  }

  /**
   * Loads a new plugin.
   * 
   * @param plugin 
   * @public
   */
  public static loadPlugin<T>(plugin: ILoadedPlugin<T>): void {
    if (this.plugins.has(plugin.target.name)) {
      return this.logger.error(`Plugin with the name ${plugin.target.name} already exists!`)
    }

    const instance = new plugin.target()

    this.plugins.set(plugin.target.name, {
      instance,
      information: plugin,
    })
  }

  /**
   * Loads a new command.
   * 
   * @param command 
   * @public
   */
  public static loadCommand (command: ICommandInformation): void {
    if (this.commands.has(command.name)) {
      return this.logger.error(`Command ${command.name} already exists!`)
    }

    this.commands.set(command.name, {
      name: command.name,
      target: command.target,
      method: command.method,
    })
  }

  /**
   * Handles a command that has been executed.
   * 
   * @public
   */
  public static handleCommand (code: ICodeEvent): void {
    const command = this.commands.get(code.code)

    if (command) {
      const target = this.plugins.get(command.target)

      if (target) {
        const event: ICodeEvent = {
          sender: code.sender,
          options: code.options,
          code: code.code,
        }

        target.instance[command.method].call(target.instance, event)
      }
    }
  }
}
