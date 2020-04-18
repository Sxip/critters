import { PlayerBase } from '@/game/entities/player/Base'
import { ChatEvent, IChatEvent } from '@/game/events/ChatEvent'

export class DummyPlayer extends PlayerBase {
  constructor (
    readonly nickname: string,
    readonly id: number
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
    console.log('called')
    this.on(ChatEvent, this.onChat.bind(this))
  }

  /**
   * Handles the chat event.
   * 
   * @param event 
   * @private
   */
  private onChat (event: IChatEvent): void {
    if (event.sender !== this && !(event.sender instanceof DummyPlayer)) {
      this.sendMessage('you said: ' + event.message)
    }
  }
}
