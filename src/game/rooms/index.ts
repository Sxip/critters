import { RoomService } from '@/api/services/RoomService'
import { Trigger, TriggerTypes } from '@/database/models/Trigger'
import { IEntityPlayer } from '@/game/entities/IEntityPlayer'
import { IJoinEvent, JoinEvent } from '@game/events/JoinEvent'
import { ILeaveEvent, LeaveEvent } from '@game/events/LeaveEvent'
import { EventEmitter } from 'events'
import Container from 'typedi'
import { IRoom } from './IRoom'

export class Room extends EventEmitter implements IRoom {
  /**
   * Set of players within the room.
   * 
   * @public
   */
  public readonly players: Set<IEntityPlayer> = new Set<IEntityPlayer>()

  /**
   * Constructor.
   * 
   * @param id 
   * @constructor
   */
  public constructor (
    public readonly id: string,
    public readonly startX: number,
    public readonly startY: number,
    public readonly startR: number,
    private readonly triggers: Trigger[],
    private readonly roomService: RoomService = Container.get(RoomService)
  ) {
    super()
  }

  /**
   * Adds a new player to the room.
   * 
   * @param player 
   * @param x 
   * @param y 
   * @param r 
   * @public
   */
  public add (player: IEntityPlayer, x: number = 0, y: number = 0, r: number = 0): void {
    if (player.room === this) return
    if (player.room) player.room.remove(player)

    this.players.add(player)

    player.room = this
    player.x = x
    player.y = y
    player.r = r

    const event: IJoinEvent = {
      player,
      room: player.room,
    }

    this.broadcast(JoinEvent, event)
  }

  /**
   * Removes a player from the room.
   * 
   * @param player 
   * @public
   */
  public remove (player: IEntityPlayer): void {
    if (player.room !== this) return

    this.players.delete(player)

    const event: ILeaveEvent = {
      player,
      room: player.room,
    }

    this.broadcast(LeaveEvent, event)
  }

  /**
   * Checks for room triggers.
   *
   * @param player
   * @public
   */
  public trigger (player: IEntityPlayer): void {
    for (const trigger of this.triggers) {
      const left = player.x > trigger.triggerX - trigger.radius / 2
      const right = player.x < trigger.triggerX + trigger.radius / 2
      const top = player.y > trigger.triggerY - trigger.radius / 2
      const bottom = player.y < trigger.triggerY + trigger.radius / 2

      const action = left && right && top && bottom

      if (action) {
        this.handleRoomTrigger(player, trigger)
        break
      }
    }
  }

  /**
   * Handles room trigger.
   * 
   * 
   * @param trigger 
   * @private
   */
  public handleRoomTrigger (player: IEntityPlayer, trigger: Trigger): void {
    switch (trigger.type) {
      case TriggerTypes.TELEPORT:
        const room = this.roomService.rooms.get(trigger.action)

        if (room) {
          room.add(
            player,
            room.startX,
            room.startY,
            room.startR
          )
        }
        break
    }
  }

  /**
   * Broadcasts to all players in the room.
   * 
   * @param name 
   * @param event 
   * @public
   */
  public broadcast (name: string, event: object): void {
    for (const player of this.players) player.emit(name, event)
  }
}
