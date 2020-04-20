import { IGearMessage } from './IGearMessage'

export class IncomingUpdateGearMessage implements IGearMessage {
  readonly cape?: string
  readonly mask?: string
  readonly ears?: string
  readonly body?: string
  readonly head?: string
}
