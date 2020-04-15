import * as path from 'path'
import { SocketControllersOptions } from 'socket-controllers'

export const ws: SocketControllersOptions = {
  controllers: [path.join(__dirname, '..', 'src', 'api', 'controllers', 'ws', '/**/*.{ts,js}')],
}
