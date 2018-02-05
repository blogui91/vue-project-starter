import { UserServiceProvider } from './UserServiceProvider'
import { VisitServiceProvider } from './VisitServiceProvider'
import { AppServiceProvider } from './AppServiceProvider'

export default {
  run () {
    new UserServiceProvider() // eslint-disable-line
    new VisitServiceProvider() // eslint-disable-line
    new AppServiceProvider() // eslint-disable-line
  }
}
