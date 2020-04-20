import { IItem } from '@/game/items/IItem'
import { IInventory } from './IInventory'

export class Inventory implements IInventory {
  /**
   * Set of the users inventory items.
   * 
   * @public
   */
  public readonly items: Set<IItem> = new Set<IItem>()

  /**
   * Adds a new item to the inventory set.
   * 
   * @param item 
   * @public
   */
  public add (item: IItem): void {
    this.items.add(item)
  }

  /**
   * Returns the inventory items.
   * 
   * @public
   */
  public getInventory (): IItem[] {
    return [...this.items]
  }

  /**
   * Removes a item from the inventory set.
   * 
   * @param item 
   * @public
   */
  public remove (item: IItem): void {
    this.items.add(item)
  }

  /**
   * Validates the gear update.
   * 
   * 
   * @param slot 
   * @param id 
   * @public
   */
  public validateGearUpdate (slot: string, id?: string): IItem | undefined {
    for (const item of this.getInventory()) if (item.slot === slot && item.itemId === id) return item
    return undefined
  }
}
