import { PlayerBase } from '@/game/entities/player/Base'
import { ChatEvent, IChatEvent } from '@/game/events/ChatEvent'

export class Bot extends PlayerBase {
  constructor (
    readonly id: number,
    readonly nickname: string,
  ) {
    super()

    this.body = 'monk'
    this.head = 'pot'
    this.nicknameColor = 'orange'
  }

  /**
   * Initializes the player events.
   * 
   * @protected
   */
  protected initialize () {
    this.on(ChatEvent, this.onChat.bind(this))
  }

  /**
   * Handles the chat event.
   * 
   * @param event 
   * @private
   */
  private onChat (event: IChatEvent): void {
    if (event.sender !== this && !(event.sender instanceof Bot)) {
      this.sendMessage('you said: ' + event.message)
    }
  }
}
