import { PlayerBase } from '@/game/entities/player/Base'
import { ChatEvent, IChatEvent } from '@/game/events/ChatEvent'

export class Mike extends PlayerBase {
  /**
   * Player id.
   * 
   * @public
   */
  public readonly id = 69

  /**
   * Player nickname.
   * 
   * @public
   */
  public readonly nickname = 'mike'

  /**
   * Player nickname color
   */
  public readonly nicknameColor = 'green'

  /**
   * Player equipment.
   * 
   * @public
   */
  public readonly body = 'monk'
  public readonly head = 'pot'

  /**
   * Initializes the player events.
   * 
   * @property
   */
  protected initialize (): void {
    this.on(ChatEvent, this.onChat.bind(this))
  }

  /**
   * Handles chat event.
   * 
   * @private
   */
  private onChat (event: IChatEvent): void {
    if (event.sender !== this && !(event.sender instanceof Mike)) {
      const quotes: string[] = [
        'Hello! I\'m Mikel from Sugar Daddy Record LTD.',
        `Our big bosses are just desperate to hear from you by now. So please ${event.sender.nickname} come to my office. Cmon ${event.sender.nickname} i picked u over the american guy!`,
        'I have been going around London and outside London in this boiling hot weather in a suit and hard shoes having meetings with all these rich guys, I know down the years and wish you had been in London to speak Geek to them in the meeting for support.',
      ]

      this.sendMessage(quotes[~~(Math.random() * quotes.length)])
    }
  }
}
