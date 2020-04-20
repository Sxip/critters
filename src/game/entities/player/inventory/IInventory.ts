import { IItem } from '@/game/items/IItem';

export interface IInventory {
  readonly items: Set<IItem>

  add(item: IItem): void
  remove(item: IItem): void
  getInventory(): IItem[]
  validateGearUpdate(slot: string, id?: string): IItem | undefined
}
