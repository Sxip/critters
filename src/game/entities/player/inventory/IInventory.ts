import { IItem } from '@/game/items/IItem';

export interface IInventory {
  readonly items: Set<IItem>

  add(item: IItem): void
  remove(item: IItem): void
  getInventory(): IItem[]
  getInventoryItems(): string[]
  validateGearUpdate(id: string): IItem | undefined
}
