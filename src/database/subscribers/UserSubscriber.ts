import { hash } from 'bcrypt'
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm'
import { User } from '../models/User'

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  /**
   * Subscriber listening to the user.
   * 
   * @public
   */
  public listenTo (): Function {
    return User
  }

  /**
   * Called before post insertion.
   * 
   * @param event 
   * @public
   */
  public async beforeInsert (event: InsertEvent<User>) {
    event.entity.password = await hash(event.entity.password, 8)
  }
}
