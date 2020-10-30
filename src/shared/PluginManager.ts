import { ICommandInformation } from '@/decorators/Command'
import { IIncomingMessageInformation } from '@/decorators/IncomingMessage'
import { ILoadedPlugin, IPlugin } from '@/decorators/Plugin'
import IEntity from '@/game/entities/IEntity'
import { ICodeEvent } from '@/game/events/player/CodeEvent'
import { IncomingMessagesTypes } from '@/game/messages/incoming'
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
   * Stores a map of the loaded plugins.
   * 
   * @public
   */
  public static readonly plugins: Map<string, IPlugin<any>> = new Map<string, IPlugin<any>>()

  /**
   * Stores incoming messages hooks.
   * 
   * @public
   */
  public static readonly incoming: Map<string, IIncomingMessageInformation[]> = new Map<string,
    IIncomingMessageInformation[]>()

  /**
   * Stores a map of the loaded commands.
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
      const plugin = await import(`${this.PATH}/${path}`)
      const pluginInstance = new plugin.default()

      if (pluginInstance?.initialize && typeof pluginInstance.initialize === 'function') {
        pluginInstance.initialize()
      }
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
      return this.logger.error(`Plugin with the name ${plugin.target.name} already exists.`)
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
      return this.logger.error(`Command ${command.name} already exists.`)
    }

    this.commands.set(command.name, {
      name: command.name,
      target: command.target,
      method: command.method,
    })
  }

  /**
   * Loads a new incoming message hook.
   * 
   * @param message
   * @public
   */
  public static loadIncomingMessage (message: IIncomingMessageInformation): void {
    if (this.incoming.has(message.type)) {
      return this.logger.error(`Command ${message.type} already exists.`)
    }

    if (!this.incoming.has(message.type)) this.incoming.set(message.type, [])
    this.incoming.get(message.type)?.push(message)
  }

  /**
   * Handles a command that has been executed.
   * 
   * @param code 
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

        try {
          target.instance[command.method].call(target.instance, event)
        } catch (error) {
          this.logger.error(`Failed handling command. ${error.message}`)
        }
      }
    }
  }

  /**
   * Handles incoming message events from the socket player.
   * 
   * @param type 
   * @param message 
   * @param player 
   * @public
   */
  public static handleIncomingMessage (type: IncomingMessagesTypes, message: any, player?: IEntity): void {
    const incomingHook = this.incoming.get(type)

    if (incomingHook) {
      for (const hook of incomingHook) {
        const target = this.plugins.get(hook.target)

        if (target) {
          try {
            target.instance[hook.method].call(target.instance, message, player)
          } catch (error) {
            this.logger.error(`Failed handling incoming message hooks. ${error.message}`)
          }
        }
      }
    }
  }
}
