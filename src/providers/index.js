import { UserServiceProvider } from './UserServiceProvider'
import { VisitServiceProvider } from './VisitServiceProvider'

export default {
  run () {
    new UserServiceProvider() // eslint-disable-line
    new VisitServiceProvider() // eslint-disable-line
  }
}
