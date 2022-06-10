import request from '../index'
import type { ILoginResult, ILoginForm, IMenuItem, IToken } from './types'


export const verifyToken = () => request.post<IToken>({ url: '/login/verifyToken' })

export const toLogin = (data: ILoginForm) => request.post<ILoginResult>({ url: '/login', data })

export const getMenu = (role: string) => request.post<IMenuItem[]>({ url: '/login/getMenu', data: { role } })