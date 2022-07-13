import uploadRequest from "./upload";


export const customerUpload = data => uploadRequest({ url: '/customer/upload', data })