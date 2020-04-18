import { Command } from '@/decorators/Command'
import { Plugin } from '@/decorators/Plugin'
import { ICodeEvent } from '@/game/events/CodeEvent'
import { IMoveEvent, MoveEvent } from '@/game/events/MoveEvent'
import { DummyPlayer } from './Dummy'

@Plugin({
  name: 'Bot',
  description: 'Connects a new bot.',
})
export default class BotPlugin {
  /**
   * Id counter.
   * 
   * @private
   */
  private idCounter: number = -500

  /**
   * Bot command.
   * 
   * @param event 
   * @public
   */
  @Command('bot')
  public testing (event: ICodeEvent) {
    const x = Number(event.options[0]) || 0
    const y = Number(event.options[1]) || 0
    const nickname = event.options[2] || 'Bot'

    const id = --this.idCounter

    const bot = new DummyPlayer(nickname, id)

    bot.on(MoveEvent, (mvEvent: IMoveEvent) => {
      if (mvEvent.sender === event.sender) bot.move(mvEvent.x + x, mvEvent.y + y, mvEvent.r)
    })

    event.sender.room.add(bot, x + event.sender.x, y + event.sender.y, event.sender.r)
    bot.sendMessage(`Hello ${event.sender.nickname}!`)
  }
}
