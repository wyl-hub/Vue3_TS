import type { ILoginState } from './login/types'
import type { ISystemState } from './main/system/types'
interface IRootState {
  name: string,
  breadPath: string[]
}

interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

type IStoreType = IRootState & IRootWithModule
export {
  IRootState,
  IStoreType
}