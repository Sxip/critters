import { configure, Log4js } from 'log4js'

/**
 * Setup logger.
 * 
 * @constant
 */
export const logger: Log4js = configure({
  appenders: {
    console: {
      type: 'console',
    },
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'info',
    },
  },
})

export default { logger }
