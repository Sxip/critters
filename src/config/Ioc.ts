import { useContainer as useRoutingControllerContainer } from 'routing-controllers'
import { useContainer as useSocketContainer } from 'socket-controllers'
import { Container } from 'typedi'
import { useContainer as useTypeormContainer } from 'typeorm'

/**
 * Setup typedi containers.
 */
useRoutingControllerContainer(Container)
useTypeormContainer(Container)
useSocketContainer(Container)
