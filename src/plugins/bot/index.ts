import { Command } from '@/decorators/Command'
import { IncomingMessage } from '@/decorators/IncomingMessage'
import { Plugin } from '@/decorators/Plugin'
import { IEntityPlayer } from '@/game/entities/IEntityPlayer'
import { ICodeEvent } from '@/game/events/CodeEvent'
import { IMoveEvent, MoveEvent } from '@/game/events/MoveEvent'
import { IncomingJoinMessage } from '@/game/messages/incoming/room/IncomingJoinMessage'
import { Bot } from './Bot'

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
   * Handles join room message.
   * 
   * @public
   */
  @IncomingMessage('joinRoom')
  public onIncomingLoginMessage (message: IncomingJoinMessage, player: IEntityPlayer): void {
    console.info(`Room join request from ${player.nickname}`)
  }

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
    const nickname = event.options[2] || 'bot'

    const id = --this.idCounter

    const bot = new Bot(id, nickname)

    bot.on(MoveEvent, (mvEvent: IMoveEvent) => {
      if (mvEvent.sender === event.sender) {
        bot.move(
          mvEvent.x + x,
          mvEvent.y + y,
          mvEvent.r
        )
      }
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
