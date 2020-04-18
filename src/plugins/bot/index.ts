import { Command } from '@/decorators/Command'
import { Plugin } from '@/decorators/Plugin'
import { ICodeEvent } from '@/game/events/CodeEvent'
import { Bot } from './Bot'

@Plugin({
  name: 'Bot',
  description: 'Connects a new bot.',
})
export default class BotPlugin {
  /**
   * Bot id.
   * 
   * @private
   */
  private id: number = -500

  /**
   * Bot command.
   * 
   * @param event 
   * @public
   */
  @Command('bot')
  public onBotCommand (event: ICodeEvent) {
    const x = Number(event.options[0]) || 0
    const y = Number(event.options[1]) || 0
    const nickname = event.options[2]

    const id = --this.id

    const bot = new Bot({
      id,
      nickname,
      defaultX: x,
      defaultY: y,
      sender: event.sender,
    })

    event.sender.room.add(
      bot,
      x + event.sender.x,
      y + event.sender.y,
      event.sender.r
    )

    bot.sendMessage(`Hello ${event.sender.nickname}!`)
  }
}
