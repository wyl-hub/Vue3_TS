export interface ILoginResult {
  result: string
  token: string
  userInfo: any
}

export interface ILoginForm {
  name: string
  password: string
}

export interface IMenuItem {
  id: number
  title: string
  icon: string
  type: number
  url?: string
  children?: IMenuItem[]
}

export interface IToken {
  userInfo: any
  menuList: IMenuItem[]
}