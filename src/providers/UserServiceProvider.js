import EventHandler from 'src/handlers/events/UserEventHandler'
export class UserServiceProvider {
  constructor () {
    new EventHandler() // eslint-disable-line
  }
}
