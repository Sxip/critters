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
   * Returns the inventory items string[].
   * 
   * @public
   */
  public getInventoryItems (): string[] {
    const items: string[] = []

    for (const item of this.items) {
      items.push(item.itemId)
    }

    return items
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
  public validateGearUpdate (id: string): IItem | undefined {
    for (const item of this.getInventory()) if (item.itemId === id) return item
    return undefined
  }
}
