import type { ILoginState } from './login/types'
interface IRootState {
  name: string,
  breadPath: string[]
}

interface IRootWithModule {
  login: ILoginState
}

type IStoreType = IRootState & IRootWithModule
export {
  IRootState,
  IStoreType
}