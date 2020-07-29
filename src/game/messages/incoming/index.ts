/**
 * Incoming message types.
 * 
 * @enum
 */
export enum IncomingMessagesTypes {
  LOGIN = 'login',
  JOIN_LOBBY = 'joinLobby',
  JOIN_ROOM = 'joinRoom',
  SHOP = 'getShop',
  SEND_MESSAGE = 'sendMessage',
  CHAT = 'sendMessage',
  MOVE_TO = 'moveTo',
  UPDATE_GEAR = 'updateGear',
  TRIGGER = 'trigger',
  CODE = 'code'
}
