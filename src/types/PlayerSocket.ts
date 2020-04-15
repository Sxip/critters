import { Player } from '@/game/entities/player'
import { Socket as OriginSocket } from 'socket.io'

export type PlayerSocket = OriginSocket & {
  player: Player
}
