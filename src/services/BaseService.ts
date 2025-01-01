import { AppDispatch } from '../redux'

class BaseService {
  protected dispatch: AppDispatch

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch
  }
}

export default BaseService
