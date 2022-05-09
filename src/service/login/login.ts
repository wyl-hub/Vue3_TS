import request from '../index'
import type { ILoginResult, ILoginForm } from './types'


export const verifyToken = () => request.post({ url: '/login/verifyToken' })

export const toLogin = (data: ILoginForm) => request.post<ILoginResult>({ url: '/login', data })