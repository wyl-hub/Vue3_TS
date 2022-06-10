import type { IMenuItem } from '@/service/login/types'
export interface ILoginState {
  userInfo: any
  token: string
  userMenu: IMenuItem[]
}

