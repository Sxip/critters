/* eslint-disable max-len */

import { PlayerBase } from '@/game/entities/player/Base'
import { IMoveEvent, MoveEvent } from '@/game/events/player/MoveEvent'

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
    this.on(MoveEvent, this.onMove.bind(this))
  }

  /**
   * Sends a random mike quote.
   * 
   * @param nickname 
   * @private
   */
  private sendMikeQuote (nickname: string): void {
    const quotes: string[] = [
      'Hello! I\'m Mikel from Sugar Daddy Record LTD.',
      `Hello! are you ${nickname} who lives in London? Meet me in London, to do a Python programming paid job in London. Do not message me if you are not based in London`,
      'You can\'t just leave incompetent programmers that delay the work that\'s why I have a team of lawyers ready to take down those who hold up the progress.',
      'I am indeed very legit, with the very the obvious thing here, do you think big company bosses would meet me if there was anything wrong.',
      'I hope now on reflection, your concerns are addressed, that nothing is suspicious, and I\'m just operating a very standard business here.',
      `Our big bosses are just desperate to hear from you by now. So please ${nickname} come to my office. Cmon ${nickname} i picked u over the american guy!`,
      'I have been going around London and outside London in this boiling hot weather in a suit and hard shoes having meetings with all these rich guys, I know down the years and wish you had been in London to speak Geek to them in the meeting for support.',
    ]

    this.sendMessage(quotes[~~(Math.random() * quotes.length)])
  }

  /**
   * Handles move event.
   * 
   * @private
   */
  private onMove (event: IMoveEvent): void {
    const distance = Math.hypot(this.x - event.x, this.y - event.y)
    if (distance < 50) this.sendMikeQuote(event.sender.nickname)
  }
}
