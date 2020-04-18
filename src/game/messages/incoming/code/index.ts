import { ICodeMessage } from './ICodeMessage'

export class IncomingCodeMessage implements ICodeMessage {
  readonly code!: string
  readonly options!: string[]
}
