import { Command } from '@/decorators/Command'
import { Plugin } from '@/decorators/Plugin'
import { ICodeEvent } from '@/game/events/CodeEvent'

@Plugin({
  name: 'Test',
  description: 'Hello World!',
})
export class TestPlugin {
  /**
   * Testing command.
   * 
   * @public
   */
  @Command('testing')
  public testing (event: ICodeEvent) {
    console.log(`Command from ${event.sender.nickname}`)
  }
}
